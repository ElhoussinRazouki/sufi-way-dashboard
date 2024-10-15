import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  NewsCreateDTO,
  NewsDTO,
  NewsDTOSchema,
  NewsPatchDTO
} from '@/types/news.types';

async function List(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<NewsDTO>>(
    `/news?${query}`
  );
  return response.data;
}

async function Details(id: string) {
  const response = await axiosApi.get<ResponseDto<NewsDTO>>(`/news/${id}`);
  await NewsDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: NewsCreateDTO) {
  const response = await axiosApi.post<ResponseDto<NewsDTO>>('/news', data);
  await NewsDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: NewsPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<NewsDTO>>(
    `/news/${id}`,
    update
  );
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/news/${id}`);
  return response.data;
}

const news = {
  List,
  Details,
  create,
  update,
  remove
};

export default news;
