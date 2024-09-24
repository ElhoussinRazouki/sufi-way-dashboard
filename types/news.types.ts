import * as Yup from 'yup';

export type NewsDTO = {
  _id: string;
  title: string;
  description: string;
  url: string;
  created_at: string;
  updated_at: string;
};

// exclude _id, created_at, updated_at using typescript utility types
export type NewsCreateDTO = Omit<NewsDTO, '_id' | 'created_at' | 'updated_at'>;

export type NewsPatchDTO = Partial<NewsCreateDTO>;

export const NewsDTOSchema = Yup.object().shape({
  _id: Yup.string().required(),
  title: Yup.string().required(),
  description: Yup.string().required(),
  url: Yup.string().required(),
  created_at: Yup.string().required(),
  updated_at: Yup.string().required()
});
