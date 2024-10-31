import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';
import { ZawyaCreateDTO, ZawyaDTO, ZawyaPatchDTO } from '@/types/zawya.types';

export type ZawyaHookFilters = {
  name?: string;
  sort?: 'asc' | 'desc';
};

export type ZawyaHookProps = {
  preventFetch?: boolean;
  initialFilters?: ZawyaHookFilters;
};

export function useZawya({
  initialFilters,
  preventFetch
}: ZawyaHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<ZawyaHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['zawya_list', pagination.query + filters.query],
    () => APIs.zawya.list(combineFilters(pagination.query, filters.query)),
    {
      suspense: true,
      retry: false
    }
  );

  const paginateList = data || { data: [], total: 0, page: 0, limit: 0 };
  const list: ZawyaDTO[] = paginateList.data || [];

  const create = useCallback(
    async (data: ZawyaCreateDTO) => {
      return APIs.zawya.create(data).then((created) => {
        queryClient.invalidateQueries('zawya_list');
        return created;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: ZawyaPatchDTO) => {
      return APIs.zawya.update(id, data).then((updated) => {
        queryClient.invalidateQueries('zawya_list');
        queryClient.invalidateQueries(['zawya', id]);
        return updated;
      });
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.zawya.remove(id).then(() => {
        queryClient.invalidateQueries('zawya_list');
        queryClient.invalidateQueries(['zawya', id]);
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

export function useZawyaDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['zawya', id],
    () => APIs.zawya.details(id),
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
