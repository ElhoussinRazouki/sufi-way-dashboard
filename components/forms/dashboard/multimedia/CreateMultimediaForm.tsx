'use client';

import { InputField, SelectField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import UploadField from '@/components/reusables/fields/UploadField';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { MULTIMEDIA_TYPES } from '@/constants/data';
import { useMultiMedia } from '@/hooks/dashboard/multimedia.hook';
import { MultimediaCreateDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const CreateMultimediaSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  thumbnail: yup.string().optional(),
  description: yup.string().required(),
  url: yup.string().required(),
  type: yup.string().oneOf(MULTIMEDIA_TYPES).required()
});

export default function CreateMultimediaForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { createMultimedia } = useMultiMedia();

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      thumbnail: '',
      description: '',
      url: '',
      type: 'audio'
    },
    validationSchema: CreateMultimediaSchema,
    onSubmit: async (values: MultimediaCreateDTO) => {
      try {
        await createMultimedia(values);
        toast({ title: 'Multimedia Created successfully', variant: 'default' });
        router.back();
      } catch (err) {
        // APIs.errors.handleApiError(err)
        console.error(err);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2">
          <InputField name="title" className="w-full" label="Title" />
          <InputField name="author" className="w-full" label="Author" />
        </div>
        <TextArea name="description" label="Description" />
        <SelectField
          name="type"
          label="Type"
          options={MULTIMEDIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
        />
        <UploadField
          maxSize={100 * 1024 * 1024}
          name="thumbnail"
          label="Thumbnail"
          accept="image"
        />
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="Save Changes" />
        </div>
      </form>
    </FormikProvider>
  );
}
