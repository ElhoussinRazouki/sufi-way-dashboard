import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import { FqCreateDTO, FqDTO, FqPatchDTO } from '@/types/fq.types';

export function useFrequentQuestions() {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const { data, ...rest } = useQuery(
    ['fq_list', pagination.query],
    () => APIs.FqApi.list(pagination.query),
    {
      suspense: true,
      retry: false
    }
  );

  const paginateList = data || { data: [], total: 0, page: 0, limit: 0 };
  const list: FqDTO[] = paginateList.data || [];

  const create = useCallback(
    async (data: FqCreateDTO) => {
      return APIs.FqApi.create(data).then((created) => {
        queryClient.invalidateQueries('fq_list');
        return created;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: FqPatchDTO) => {
      return APIs.FqApi.update(id, data).then((updated) => {
        queryClient.invalidateQueries('fq_list');
        queryClient.invalidateQueries(['fq', id]);
        return updated;
      });
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.FqApi.remove(id).then(() => {
        queryClient.invalidateQueries('fq_list');
        queryClient.invalidateQueries(['fq', id]);
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
    pagination
  };
}

export function useFqDetails(id: string) {
  const { data, ...rest } = useQuery(['fq', id], () => APIs.FqApi.details(id), {
    suspense: true,
    retry: false
  });

  return {
    data: data?.data,
    rest
  };
}
