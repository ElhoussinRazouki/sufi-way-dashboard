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
import AuthorsComboBoxField from '../../../dashboard/reusables/AuthorsComboBoxField';
import ImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import AudioUploaderField from '@/components/reusables/fields/AudioUploaderField';
import VideoUploaderField from '@/components/reusables/fields/VideoUploaderField';
import PdfUploaderField from '@/components/reusables/fields/PdfUploaderField';
import APIs from '@/api';

const UpdateMultimediaSchema = yup.object().shape({
  title: yup.string().required(),
  author_id: yup.string().required(),
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
      author_id: multimediaDetails?.author_id?._id,
      thumbnail: multimediaDetails?.thumbnail,
      description: multimediaDetails?.description,
      url: multimediaDetails?.url,
      type: multimediaDetails?.type
    },
    validationSchema: UpdateMultimediaSchema,
    onSubmit: async (values: MultimediaPatchDTO) => {
      try {
        await updateMultiMedia(multimediaId, values).then(() => {
          router.back();
          toast({
            title: 'Multimedia updated successfully',
            variant: 'default'
          });
        });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <InputField name="title" label="Title" />
        <AuthorsComboBoxField
          label="Author"
          className="w-full"
          defaultAuthor={multimediaDetails?.author_id}
        />
        <TextArea name="description" label="Description" />
        <SelectField
          name="type"
          label="Type"
          options={MULTIMEDIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
        />
        <div className="my-4 flex gap-4">
          <ImageUploaderField name="thumbnail" label="Thumbnail" />
          {formik.values.type === 'audio' && (
            <AudioUploaderField name="url" label="Audio" />
          )}
          {formik.values.type === 'video' && (
            <VideoUploaderField name="url" label="Video" />
          )}
          {formik.values.type === 'pdf' && (
            <PdfUploaderField name="url" label="Pdf Document" />
          )}
        </div>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="Save Changes" />
        </div>
      </form>
    </FormikProvider>
  );
}
