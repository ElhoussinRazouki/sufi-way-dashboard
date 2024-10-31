import * as Yup from 'yup';

export type SheikhDTO = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};

export type SheikhCreateDTO = Omit<
  SheikhDTO,
  '_id' | 'created_at' | 'updated_at'
>;

export type SheikhPatchDTO = Partial<SheikhCreateDTO>;

export const SheikhDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  name: Yup.string().required(),
  bio: Yup.string().optional(),
  avatar: Yup.string().optional(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
