import { MULTIMEDIA_TYPES } from '@/constants/data';
import * as Yup from 'yup';

// extract type from the array with typescript utility types
export type MultimediaType = (typeof MULTIMEDIA_TYPES)[number];

export type MultimediaDTO = {
  _id: string;
  title: string;
  author: string;
  thumbnail: string;
  description: string;
  url: string;
  type: MultimediaType;
  created_at: string;
  updated_at: string;
};

// exclude _id, created_at, updated_at using typescript utility types
export type MultimediaCreateDTO = Omit<
  MultimediaDTO,
  '_id' | 'created_at' | 'updated_at'
>;

export type MultimediaPatchDTO = Partial<MultimediaCreateDTO>;

export const multimediaDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  title: Yup.string().required(),
  author: Yup.string().optional(),
  thumbnail: Yup.string().optional(),
  description: Yup.string().required(),
  url: Yup.string().required(),
  type: Yup.string().oneOf(MULTIMEDIA_TYPES).required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
