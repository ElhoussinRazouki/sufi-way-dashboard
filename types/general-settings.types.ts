import * as Yup from 'yup';

// frequent questions

export type GeneralSettingsDTO = {
  sheikhEmail?: string;
  supportEmail?: string;
};

export type GeneralSettingsPatchDTO = GeneralSettingsDTO;

export const GeneralSettingsDTOSchema = Yup.object().shape({
  sheikhEmail: Yup.string().optional().nullable(),
  supportEmail: Yup.string().optional().nullable()  
});
