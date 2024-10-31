import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';
import {
  SheikhCreateDTO,
  SheikhDTO,
  SheikhPatchDTO
} from '@/types/sheikhs.types';

export type SheikhHookFilters = {
  name?: string;
  sort?: 'asc' | 'desc';
};

export type SheikhHookProps = {
  preventFetch?: boolean;
  initialFilters?: SheikhHookFilters;
};

export function useSheikhs({
  initialFilters,
  preventFetch
}: SheikhHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<SheikhHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['sheikhs_list', pagination.query + filters.query],
    () => APIs.sheikhs.list(combineFilters(pagination.query, filters.query)),
    {
      suspense: true,
      retry: false
    }
  );

  const paginateList = data || { data: [], total: 0, page: 0, limit: 0 };
  const list: SheikhDTO[] = paginateList.data || [];

  const create = useCallback(
    async (data: SheikhCreateDTO) => {
      return APIs.sheikhs.create(data).then((created) => {
        queryClient.invalidateQueries('sheikhs_list');
        return created;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: SheikhPatchDTO) => {
      return APIs.sheikhs.update(id, data).then((updated) => {
        queryClient.invalidateQueries('sheikhs_list');
        queryClient.invalidateQueries(['sheikh', id]);
        return updated;
      });
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.sheikhs.remove(id).then(() => {
        queryClient.invalidateQueries('sheikhs_list');
        queryClient.invalidateQueries(['sheikh', id]);
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

export function useSheikhDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['sheikh', id],
    () => APIs.sheikhs.details(id),
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
