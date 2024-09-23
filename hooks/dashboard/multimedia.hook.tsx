import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import {
  MultimediaCreateDTO,
  MultimediaDTO,
  MultimediaPatchDTO
} from '@/types/multimedia.types';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';

type MultimediaHookFilters = {
  search?: string;
  type?: string;
  sort?: 'asc' | 'desc';
};

type MultimediaHookProps = {
  preventFetch?: boolean;
  initialFilters?: MultimediaHookFilters;
};

export function useMultiMedia({
  preventFetch,
  initialFilters
}: MultimediaHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<MultimediaHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['multimedia_list', pagination.query + filters.query],
    () =>
      APIs.multimedia.getMultimediaList(
        combineFilters(pagination.query, filters.query)
      ),
    {
      suspense: true,
      retry: false,
      enabled: !preventFetch
    }
  );

  const paginatedMultiMedia = data || { data: [], total: 0, page: 0, limit: 0 };
  const multimediaList: MultimediaDTO[] = paginatedMultiMedia.data || [];

  const createMultimedia = useCallback(
    async (data: MultimediaCreateDTO) => {
      return APIs.multimedia.createMultimedia(data).then((multimedia) => {
        queryClient.invalidateQueries('multimedia_list');
        return multimedia;
      });
    },
    [queryClient]
  );

  const updateMultiMedia = useCallback(
    async (id: string, data: MultimediaPatchDTO) => {
      await APIs.multimedia.updateMultimedia(id, data);
      queryClient.invalidateQueries('multimedia_list');
      queryClient.invalidateQueries(['multimedia', id]);
      return;
    },
    [queryClient]
  );

  const deleteMultimedia = useCallback(
    async (id: string) => {
      return APIs.multimedia.deleteMultimedia(id).then(() => {
        queryClient.invalidateQueries('multimedia_list');
        queryClient.invalidateQueries(['multimedia', id]);
      });
    },
    [queryClient]
  );

  return {
    paginatedMultiMedia,
    multimediaList,
    createMultimedia,
    updateMultiMedia,
    deleteMultimedia,
    pagination,
    filters,
    ...rest
  };
}

export function useMultiMediaDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['multimedia', id],
    () => APIs.multimedia.getMultimediaDetails(id),
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
