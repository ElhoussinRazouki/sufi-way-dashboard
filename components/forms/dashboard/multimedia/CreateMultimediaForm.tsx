'use client';

import { InputField, SelectField } from '@/components/reusables';
import AudioUploaderField from '@/components/reusables/fields/AudioUploaderField';
import ImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import PdfUploaderField from '@/components/reusables/fields/PdfUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import UploadField from '@/components/reusables/fields/UploadField';
import VideoUploaderField from '@/components/reusables/fields/VideoUploaderField';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { MULTIMEDIA_TYPES } from '@/constants/data';
import { useMultiMedia } from '@/hooks/dashboard/multimedia.hook';
import { MultimediaCreateDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import AuthorsComboBoxField from '../../../dashboard/reusables/AuthorsComboBoxField';

const CreateMultimediaSchema = yup.object().shape({
  title: yup.string().required(),
  author_id: yup.string().required(),
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
      author_id: '',
      thumbnail: '',
      description: '',
      url: '',
      type: 'audio'
    },
    validationSchema: CreateMultimediaSchema,
    onSubmit: async (values: MultimediaCreateDTO) => {
      try {
        await createMultimedia(values);
        router.back();
        toast({ title: 'Multimedia Created successfully', variant: 'default' });
      } catch (err) {
        console.error(err);
        toast({ title: 'Error creating multimedia', variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2">
          <InputField name="title" className="w-full" label="Title" />
          <AuthorsComboBoxField label="Author" className="w-full" />
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
          <SubmitButton type="submit" variant="default" title="Create" />
        </div>
      </form>
    </FormikProvider>
  );
}
