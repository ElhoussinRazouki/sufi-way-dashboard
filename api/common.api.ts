// Create a common API function here

import { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';
import axiosApi from './axios.api';
import {
  AttachmentDto,
  AttachmentDtoSchema,
  AttachmentTypes,
  ResponseDto
} from '@/types';

// Upload a single file
async function uploadFile(
  uri: string,
  file: File,
  name: string = 'file',
  axiosConfig?: AxiosRequestConfig
) {
  // Create a FormData object
  const formData = new FormData();
  formData.append('file', file);

  return axiosApi.post<ResponseDto<AttachmentDto>>(uri, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...axiosConfig
  });
}

async function uploadAttachment(
  file: File,
  name: string,
  type: AttachmentTypes,
  onUploadProgress?: (percent: number) => void
) {
  let uri = '/attachment/upload';
  switch (type) {
    case 'image':
      uri += '-image';
      break;
    case 'video':
      uri += '-video';
      break;
    case 'audio':
      uri += '-audio';
      break;
    case 'pdf':
      uri += '-pdf';
      break;
    default:
      throw new Error('Invalid attachment type');
  }

  const response = await uploadFile(uri, file, name, {
    onUploadProgress(progressEvent) {
      if (onUploadProgress && progressEvent.total && progressEvent.loaded) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress?.(percentCompleted);
      }
    }
  });

  // validate the response
  AttachmentDtoSchema.validate(response.data.data);

  return response.data.data;
}

function handleApiError(error: AxiosError | any) {
  if (isAxiosError(error)) {
    return error.response?.data?.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'something went wrong';
}

const CommonApi = {
  //... extend with other APIs here
  uploadFile,
  uploadAttachment,
  handleApiError
};

export default CommonApi;
