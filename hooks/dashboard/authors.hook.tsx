import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import {
  AuthorCreateDTO,
  AuthorDTO,
  AuthorPatchDTO
} from '@/types/multimedia.types';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';

export type AuthorHookFilters = {
  search?: string;
  sort?: 'asc' | 'desc';
};

export type AuthorHookProps = {
  preventFetch?: boolean;
  initialFilters?: AuthorHookFilters;
};

export function useAuthors({
  initialFilters,
  preventFetch
}: AuthorHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<AuthorHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['authors_list', pagination.query + filters.query],
    () => APIs.authors.list(combineFilters(pagination.query, filters.query)),
    {
      suspense: true,
      retry: false
    }
  );

  const paginateList = data || { data: [], total: 0, page: 0, limit: 0 };
  const list: AuthorDTO[] = paginateList.data || [];

  const create = useCallback(
    async (data: AuthorCreateDTO) => {
      return APIs.authors.create(data).then((created) => {
        queryClient.invalidateQueries('authors_list');
        return created;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: AuthorPatchDTO) => {
      return APIs.authors.update(id, data).then((updated) => {
        queryClient.invalidateQueries('authors_list');
        queryClient.invalidateQueries(['author', id]);
        return updated;
      });
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.authors.remove(id).then(() => {
        queryClient.invalidateQueries('authors_list');
        queryClient.invalidateQueries(['author', id]);
      });
    },
    [queryClient]
  );

  return {
    ...rest,
    paginateList,
    list,
    create,
    update,
    remove,
    pagination,
    filters
  };
}

export function useAuthorDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['author', id],
    () => APIs.authors.details(id),
    {
      suspense: true,
      retry: false
    }
  );

  return {
    data: data?.data,
    rest
  };
}
