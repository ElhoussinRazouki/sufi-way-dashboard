import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  AdkarAdiaCreateDTO,
  AdkarAdiaDTO,
  AdkarAdiaDTOSchema,
  AdkarAdiaPatchDTO
} from '@/types/adkar-adia.types';

async function List(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<AdkarAdiaDTO>>(
    `/adkar-adia?${query}`
  );
  return response.data;
}

async function Details(id: string) {
  const response = await axiosApi.get<ResponseDto<AdkarAdiaDTO>>(
    `/adkar-adia/${id}`
  );
  await AdkarAdiaDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: AdkarAdiaCreateDTO) {
  const response = await axiosApi.post<ResponseDto<AdkarAdiaDTO>>(
    '/adkar-adia',
    data
  );
  await AdkarAdiaDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: AdkarAdiaPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<AdkarAdiaDTO>>(
    `/adkar-adia/${id}`,
    update
  );
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/adkar-adia/${id}`);
  return response.data;
}

const adkar_adia = {
  List,
  Details,
  create,
  update,
  remove
};

export default adkar_adia;
