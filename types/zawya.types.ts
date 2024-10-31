import * as Yup from 'yup';

export type ZawyaDTO = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};

export type ZawyaCreateDTO = Omit<
  ZawyaDTO,
  '_id' | 'created_at' | 'updated_at'
>;

export type ZawyaPatchDTO = Partial<ZawyaCreateDTO>;

export const ZawyaDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  name: Yup.string().required(),
  bio: Yup.string().optional(),
  avatar: Yup.string().optional(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
