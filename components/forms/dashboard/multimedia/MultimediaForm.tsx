'use client';

import { InputField, SelectField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MULTIMEDIA_TYPES } from '@/constants/data';
import {
  useMultiMedia,
  useMultiMediaDetails
} from '@/hooks/dashboard/multimedia.hook';
import { MultimediaPatchDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateMultimediaSchema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  thumbnail: yup.string().optional(),
  description: yup.string().required(),
  url: yup.string().required(),
  type: yup.string().oneOf(MULTIMEDIA_TYPES).required()
});

type UpdateMultimediaFormProps = {
  multimediaId: string;
  className?: string;
};

export default function UpdateMultimediaForm({
  className,
  multimediaId
}: UpdateMultimediaFormProps) {
  const { updateMultiMedia } = useMultiMedia();
  const { data: multimediaDetails } = useMultiMediaDetails(multimediaId);
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: multimediaDetails?.title,
      author: multimediaDetails?.author,
      thumbnail: multimediaDetails?.thumbnail,
      description: multimediaDetails?.description,
      url: multimediaDetails?.url,
      type: multimediaDetails?.type
    },
    validationSchema: UpdateMultimediaSchema,
    onSubmit: async (values: MultimediaPatchDTO) => {
      try {
        await updateMultiMedia(multimediaId, values);
        toast({ title: 'Multimedia updated successfully', variant: 'default' });
        router.back();
      } catch (err) {
        // APIs.errors.handleApiError(err)
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <InputField name="title" label="Title" />
        <InputField name="author" label="Author" />
        <TextArea name="description" label="Description" />
        <SelectField
          name="type"
          label="Type"
          options={MULTIMEDIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
        />
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="Save Changes" />
        </div>
      </form>
    </FormikProvider>
  );
}
