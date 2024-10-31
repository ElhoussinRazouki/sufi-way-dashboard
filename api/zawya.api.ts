import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  ZawyaCreateDTO,
  ZawyaDTO,
  ZawyaDTOSchema,
  ZawyaPatchDTO
} from '@/types/zawya.types';

async function list(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<ZawyaDTO>>(
    `/zawya?${query}`
  );
  return response.data;
}

async function details(id: string) {
  const response = await axiosApi.get<ResponseDto<ZawyaDTO>>(`/zawya/${id}`);
  await ZawyaDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: ZawyaCreateDTO) {
  const response = await axiosApi.post<ResponseDto<ZawyaDTO>>('/zawya', data);
  await ZawyaDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: ZawyaPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<ZawyaDTO>>(
    `/zawya/${id}`,
    update
  );
  await ZawyaDTOSchema.validate(response.data.data);
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/zawya/${id}`);
  return response.data;
}

const ZawyaApi = {
  list,
  details,
  create,
  update,
  remove
};

export default ZawyaApi;
