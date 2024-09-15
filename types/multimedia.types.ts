import { MULTIMEDIA_TYPES } from '@/constants/data';
import * as Yup from 'yup';

// extract type from the array with typescript utility types
export type MultimediaType = (typeof MULTIMEDIA_TYPES)[number];

export type MultimediaDTO = {
  _id: string;
  title: string;
  author_id: AuthorDTO;
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
  '_id' | 'created_at' | 'updated_at' | 'author_id'
> & { author_id: string };

export type MultimediaPatchDTO = Partial<MultimediaCreateDTO>;

export const multimediaDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  title: Yup.string().required(),
  author_id: Yup.object().optional(),
  thumbnail: Yup.string().optional(),
  description: Yup.string().required(),
  url: Yup.string().required(),
  type: Yup.string().oneOf(MULTIMEDIA_TYPES).required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});

// authors

export type AuthorDTO = {
  _id: string;
  name: string;
  bio?: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
};

export type AuthorCreateDTO = Omit<
  AuthorDTO,
  '_id' | 'created_at' | 'updated_at'
>;

export type AuthorPatchDTO = Partial<AuthorCreateDTO>;

export const AuthorDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  name: Yup.string().required(),
  bio: Yup.string().optional(),
  avatar: Yup.string().optional(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
