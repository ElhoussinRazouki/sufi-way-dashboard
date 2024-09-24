import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  AuthorCreateDTO,
  AuthorDTO,
  AuthorDTOSchema,
  AuthorPatchDTO
} from '@/types/multimedia.types';
import { FqCreateDTO, FqDTO, FqDTOSchema, FqPatchDTO } from '@/types/fq.types';

async function list(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<FqDTO>>(
    `/frequent-questions?${query}`
  );
  return response.data;
}

async function details(id: string) {
  const response = await axiosApi.get<ResponseDto<FqDTO>>(
    `/frequent-questions/${id}`
  );
  await FqDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: FqCreateDTO) {
  const response = await axiosApi.post<ResponseDto<FqDTO>>(
    '/frequent-questions',
    data
  );
  await FqDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: FqPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<FqDTO>>(
    `/frequent-questions/${id}`,
    update
  );
  await FqDTOSchema.validate(response.data.data);
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/frequent-questions/${id}`);
  return response.data;
}

const FqApi = {
  list,
  details,
  create,
  update,
  remove
};

export default FqApi;
