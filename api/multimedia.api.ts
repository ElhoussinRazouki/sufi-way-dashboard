import { PaginatedResponseDto, ResponseDto } from '@/types';
import axiosApi from './axios.api';
import {
  MultimediaCreateDTO,
  MultimediaDTO,
  multimediaDTOSchema,
  MultimediaPatchDTO
} from '@/types/multimedia.types';

async function getMultimediaList(query: string) {
  const response = await axiosApi.get<PaginatedResponseDto<MultimediaDTO>>(
    `/multimedia?${query}`
  );
  return response.data;
}

async function getMultimediaDetails(id: string) {
  const response = await axiosApi.get<ResponseDto<MultimediaDTO>>(
    `/multimedia/${id}`
  );
  // await multimediaDTOSchema.validate(response.data.data);
  return response.data;
}

async function createMultimedia(data: MultimediaCreateDTO) {
  const response = await axiosApi.post<ResponseDto<MultimediaDTO>>(
    '/multimedia',
    data
  );
  await multimediaDTOSchema.validate(response.data.data);
  return response.data;
}

async function updateMultimedia(id: string, update: MultimediaPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<MultimediaDTO>>(
    `/multimedia/${id}`,
    update
  );
  return response.data;
}

async function deleteMultimedia(id: string) {
  const response = await axiosApi.delete(`/multimedia/${id}`);
  return response.data;
}

const multimediaApi = {
  getMultimediaList,
  getMultimediaDetails,
  createMultimedia,
  updateMultimedia,
  deleteMultimedia
};

export default multimediaApi;
