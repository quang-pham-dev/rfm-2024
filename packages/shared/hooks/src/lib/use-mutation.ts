import {
  MutationFunction,
  QueryKey,
  useMutation as useMutationDefault,
  UseMutationResult,
  useQueryClient,
} from 'react-query';

import { ExtendedMutationOptions } from '@rfm-2024/models';

export function useMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  TUpdateData = TData
>(
  mutationFn: MutationFunction<TData, TVariables>,
  {
    queryKey,
    onUpdateData,
    ...options
  }: ExtendedMutationOptions<TData, TError, TVariables, TData, TUpdateData> = {}
): UseMutationResult<TData, TError, TVariables, TContext> {
  const queryClient = useQueryClient();

  const getQueryKey = (variables: TVariables) => {
    let key: QueryKey = '';

    if (typeof queryKey === 'string') {
      key = queryKey;
    } else if (typeof queryKey === 'function') {
      key = queryKey(variables);
    }

    return key;
  };

  return useMutationDefault<TData, TError, TVariables, any>(mutationFn, {
    onError: (err, variables, context) => {
      if (context && queryKey) {
        queryClient.setQueryData(getQueryKey(variables), context);
      }
    },
    onMutate: (data) => {
      let previousData: TUpdateData | undefined = undefined;

      if (queryKey) {
        previousData = queryClient.getQueryData<TUpdateData | undefined>(
          getQueryKey(data)
        );

        queryClient.setQueryData<TUpdateData | undefined>(
          getQueryKey(data),
          (old) => {
            if (old) {
              return onUpdateData
                ? onUpdateData(old as any as TUpdateData, data)
                : old;
            }

            queryClient.removeQueries(getQueryKey(data));
          }
        );
      }

      return previousData;
    },
    ...options,
  });
}
