import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  SheikhCreateDTO,
  SheikhDTO,
  SheikhDTOSchema,
  SheikhPatchDTO
} from '@/types/sheikhs.types';

async function list(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<SheikhDTO>>(
    `/sheikhs?${query}`
  );
  return response.data;
}

async function details(id: string) {
  const response = await axiosApi.get<ResponseDto<SheikhDTO>>(`/sheikhs/${id}`);
  await SheikhDTOSchema.validate(response.data.data);
  return response.data;
}

async function create(data: SheikhCreateDTO) {
  const response = await axiosApi.post<ResponseDto<SheikhDTO>>(
    '/sheikhs',
    data
  );
  await SheikhDTOSchema.validate(response.data.data);
  return response.data;
}

async function update(id: string, update: SheikhPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<SheikhDTO>>(
    `/sheikhs/${id}`,
    update
  );
  await SheikhDTOSchema.validate(response.data.data);
  return response.data;
}

async function remove(id: string) {
  const response = await axiosApi.delete(`/sheikhs/${id}`);
  return response.data;
}

const SheikhApi = {
  list,
  details,
  create,
  update,
  remove
};

export default SheikhApi;
