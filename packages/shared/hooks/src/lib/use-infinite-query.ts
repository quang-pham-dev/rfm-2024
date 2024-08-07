import { useRef } from 'react';
import {
  QueryKey,
  useInfiniteQuery as useReactInfiniteQuery,
} from 'react-query';

import {
  PaginatedResult,
  QueryFnOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@rfm-2024/models';

export function useInfiniteQuery<
  TData = unknown,
  TError = Error,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: (params: QueryFnOptions) => Promise<TData[]>,
  options?: Omit<
    UseInfiniteQueryOptions<TData, TError, TData, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): UseInfiniteQueryResult<TData, TError> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchNextPagePromiseRef = useRef<Promise<any> | null>(null);
  const { limit = 20 } = options || {};
  const { data, fetchNextPage, ...otherOptions } = useReactInfiniteQuery<
    PaginatedResult<TData>,
    TError,
    TData,
    TQueryKey
  >(
    queryKey,
    async ({ pageParam = 1 }) => {
      const res = await queryFn({ limit, page: pageParam });

      return {
        records: res,
        limit,
        page: pageParam,
      };
    },
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      select({ pages = [] }) {
        return pages.reduce<TData[]>(
          (arr, page) => [
            ...arr,
            ...(page as unknown as PaginatedResult<TData>).records,
          ],
          []
        );
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getNextPageParam(lastPage) {
        const { page = 1, records } = lastPage || {};

        if (records.length >= limit) {
          return page + 1;
        }
      },
      ...options,
    }
  );

  const onEndReached = async () => {
    if (!fetchNextPagePromiseRef.current) {
      fetchNextPagePromiseRef.current = (async () => {
        try {
          await fetchNextPage();
        } finally {
          fetchNextPagePromiseRef.current = null;
        }
      })();
    }
  };

  return {
    ...otherOptions,
    data: data as unknown as TData[],
    fetchNextPage,
    onEndReached,
  };
}
