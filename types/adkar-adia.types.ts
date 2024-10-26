import { ADKAR_ADIA_TYPES } from '@/constants/data';
import * as Yup from 'yup';

export type ADKAR_ADIA_TYPE = (typeof ADKAR_ADIA_TYPES)[number];

export type AdkarAdiaDTO = {
  _id: string;
  title: string;
  type: ADKAR_ADIA_TYPE;
  content: string[];
  created_at: string;
  updated_at: string;
};

// exclude _id, created_at, updated_at using typescript utility types
export type AdkarAdiaCreateDTO = Omit<
  AdkarAdiaDTO,
  '_id' | 'created_at' | 'updated_at'
>;

export type AdkarAdiaPatchDTO = Partial<AdkarAdiaCreateDTO>;

export const AdkarAdiaDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  title: Yup.string().required(),
  type: Yup.string().oneOf(ADKAR_ADIA_TYPES).required(),
  content: Yup.array().of(Yup.string()).min(1, 'المحتوى مطلوب').required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
