import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  AuthorCreateDTO,
  AuthorDTO,
  AuthorDTOSchema,
  AuthorPatchDTO
} from '@/types/multimedia.types';

async function list(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<AuthorDTO>>(
    `/authors?${query}`
  );
  return response.data;
}

async function details(id: string) {
  const response = await axiosApi.get<ResponseDto<AuthorDTO>>(`/authors/${id}`);
  await AuthorDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: AuthorCreateDTO) {
  const response = await axiosApi.post<ResponseDto<AuthorDTO>>(
    '/authors',
    data
  );
  await AuthorDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: AuthorPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<AuthorDTO>>(
    `/authors/${id}`,
    update
  );
  await AuthorDTOSchema.validate(response.data.data);
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/authors/${id}`);
  return response.data;
}

const authorApi = {
  list,
  details,
  create,
  update,
  remove
};

export default authorApi;
