import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import {
  MultimediaCreateDTO,
  MultimediaDTO,
  MultimediaPatchDTO
} from '@/types/multimedia.types';

export function useMultiMedia() {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const { data, ...rest } = useQuery(
    ['multimedia_list', pagination.query],
    () => APIs.multimedia.getMultimediaList(pagination.query),
    {
      suspense: true,
      retry: false
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
      return APIs.multimedia.updateMultimedia(id, data).then((multimedia) => {
        queryClient.invalidateQueries('multimedia_list');
        queryClient.invalidateQueries(['multimedia', id]);
        return multimedia;
      });
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
