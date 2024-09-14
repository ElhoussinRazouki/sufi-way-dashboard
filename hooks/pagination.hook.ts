import { useMemo } from 'react';
import { useUrlQuery } from '.';

type PaginationProps = {
  page?: number;
  limit?: number;
};

const defaultProps = {
  page: 1,
  limit: 20
} as const;

export function usePagination(props?: PaginationProps) {
  const initialProps = { ...defaultProps, ...props };

  const [page, setPage] = useUrlQuery('page', initialProps.page);
  const [limit, setLimit] = useUrlQuery('limit', initialProps.limit);

  const query = useMemo(() => `page=${page}&limit=${limit}`, [page, limit]);

  return {
    page,
    limit,
    setPage,
    setLimit,
    query
  };
}
