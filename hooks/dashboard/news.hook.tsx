import APIs from '@/api';
import { useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { usePagination } from '../pagination.hook';
import { useFilters } from '../filters.hook';
import { combineFilters } from '@/utils';
import { NewsCreateDTO, NewsDTO, NewsPatchDTO } from '@/types/news.types';

type NewsHookFilters = {
  title?: string;
  sort?: 'asc' | 'desc';
};

type NewsHookProps = {
  preventFetch?: boolean;
  initialFilters?: NewsHookFilters;
};

export function useNews({ preventFetch, initialFilters }: NewsHookProps = {}) {
  const queryClient = useQueryClient();
  const pagination = usePagination();

  const filters = useFilters<NewsHookFilters>({
    filters: {
      ...(initialFilters || {})
    },
    parseOptions: {
      override: true
    }
  });

  const { data, ...rest } = useQuery(
    ['news_list', pagination.query + filters.query],
    () => APIs.newsApi.List(combineFilters(pagination.query, filters.query)),
    {
      suspense: true,
      retry: false,
      enabled: !preventFetch
    }
  );

  const paginatedNews = data || { data: [], total: 0, page: 0, limit: 0 };
  const newsList: NewsDTO[] = paginatedNews.data || [];

  const create = useCallback(
    async (data: NewsCreateDTO) => {
      return APIs.newsApi.create(data).then((news) => {
        queryClient.invalidateQueries('news_list');
        return news;
      });
    },
    [queryClient]
  );

  const update = useCallback(
    async (id: string, data: NewsPatchDTO) => {
      await APIs.newsApi.update(id, data);
      queryClient.invalidateQueries('news_list');
      queryClient.invalidateQueries(['news', id]);
      return;
    },
    [queryClient]
  );

  const remove = useCallback(
    async (id: string) => {
      return APIs.newsApi.remove(id).then(() => {
        queryClient.invalidateQueries('news_list');
        queryClient.invalidateQueries(['news', id]);
      });
    },
    [queryClient]
  );

  return {
    ...rest,
    paginatedNews,
    newsList,
    create,
    update,
    remove,
    pagination,
    filters
  };
}

export function useNewsDetails(id: string) {
  const { data, ...rest } = useQuery(
    ['news', id],
    () => APIs.newsApi.Details(id),
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
