import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';
import { NewsCreateDTO, NewsDTO, NewsPatchDTO } from '@/types/news.types';
import {
  ADKAR_ADIA_TYPE,
  AdkarAdiaCreateDTO,
  AdkarAdiaDTO,
  AdkarAdiaPatchDTO
} from '@/types/adkar-adia.types';

type AdkarAdiaHookFilters = {
  title?: string;
  type?: ADKAR_ADIA_TYPE;
  sort?: 'asc' | 'desc';
};

type AdkarAdiaHookProps = {
  preventFetch?: boolean;
  initialFilters?: AdkarAdiaHookFilters;
};

export function useAdkarAdia({
  preventFetch,
  initialFilters
}: AdkarAdiaHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<AdkarAdiaHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['adkar_adia_list', pagination.query + filters.query],
    () => APIs.adkar_adia.List(combineFilters(pagination.query, filters.query)),
    {
      suspense: true,
      retry: false,
      enabled: !preventFetch
    }
  );

  const paginatedAdkarAdia = data || { data: [], total: 0, page: 0, limit: 0 };
  const adkarAdiaList: AdkarAdiaDTO[] = paginatedAdkarAdia.data || [];

  const create = useCallback(
    async (data: AdkarAdiaCreateDTO) => {
      return APIs.adkar_adia.create(data).then((adkar_adia) => {
        queryClient.invalidateQueries('adkar_adia_list');
        return adkar_adia;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: AdkarAdiaPatchDTO) => {
      await APIs.adkar_adia.update(id, data);
      queryClient.invalidateQueries('adkar_adia_list');
      queryClient.invalidateQueries(['adkar_adia', id]);
      return;
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.adkar_adia.remove(id).then(() => {
        queryClient.invalidateQueries('adkar_adia_list');
        queryClient.invalidateQueries(['adkar_adia', id]);
      });
    },
    [queryClient]
  );

  return {
    ...rest,
    paginatedAdkarAdia,
    adkarAdiaList,
    create,
    update,
    remove,
    pagination,
    filters
  };
}

export function useAdkarAdiaDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['adkar_adia', id],
    () => APIs.adkar_adia.Details(id),
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
