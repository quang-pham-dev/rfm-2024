import {
  QueryFunction,
  QueryKey,
  useQuery as useReactQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';

export function useQuery<
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseQueryResult<TData, TError> {
  return useReactQuery(queryKey, queryFn, options);
}
