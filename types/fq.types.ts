import * as Yup from 'yup';

// frequent questions

export type FqDTO = {
  _id: string;
  question: string;
  response: string;
};

export type FqCreateDTO = Omit<FqDTO, '_id'>;

export type FqPatchDTO = Partial<FqCreateDTO>;

export const FqDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  question: Yup.string().required(),
  response: Yup.string().required()
});
