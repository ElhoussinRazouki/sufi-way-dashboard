import {
  GeneralSettingsDTO,
  GeneralSettingsDTOSchema,
  GeneralSettingsPatchDTO
} from '@/types/general-settings.types';
import axiosApi from './axios.api';
import { ResponseDto } from '@/types';

async function details() {
  const response =
    await axiosApi.get<ResponseDto<GeneralSettingsDTO>>(`/general-settings`);
  await GeneralSettingsDTOSchema.validate(response.data.data);
  return response.data.data;
}

async function update(update: GeneralSettingsPatchDTO) {
  const response = await axiosApi.patch<ResponseDto<GeneralSettingsPatchDTO>>(
    `/general-settings`,
    update
  );
  await GeneralSettingsDTOSchema.validate(response.data.data);
  return response.data.data;
}

const generalSettings = {
  details,
  update
};

export default generalSettings;
