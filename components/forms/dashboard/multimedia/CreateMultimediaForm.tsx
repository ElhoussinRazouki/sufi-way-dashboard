'use client';

import { InputField, SelectField } from '@/components/reusables';
import AudioUploaderField from '@/components/reusables/fields/AudioUploaderField';
import ImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import PdfUploaderField from '@/components/reusables/fields/PdfUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
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
import APIs from '@/api';

const CreateMultimediaSchema = yup.object().shape({
  title: yup.string().required('العنوان مطلوب'),
  author_id: yup.string().required('المؤلف مطلوب'),
  thumbnail: yup.string().optional(),
  description: yup.string().required('الوصف مطلوب'),
  url: yup.string().required('الرابط مطلوب'),
  type: yup
    .string()
    .oneOf(MULTIMEDIA_TYPES, 'نوع الوسائط غير صالح')
    .required('النوع مطلوب')
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
        toast({ title: 'تم إنشاء الوسائط بنجاح', variant: 'default' });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2">
          <InputField
            name="title"
            className="w-full"
            label="العنوان"
            required
          />
          <AuthorsComboBoxField label="المؤلف" className="w-full" required />
        </div>
        <TextArea name="description" label="الوصف" required />
        <SelectField
          name="type"
          label="النوع"
          options={MULTIMEDIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
          required
        />
        <div className="my-4 flex gap-4">
          <ImageUploaderField name="thumbnail" label="الصورة المصغرة" />
          {formik.values.type === 'audio' && (
            <AudioUploaderField name="url" label="الصوت" required />
          )}
          {formik.values.type === 'video' && (
            <VideoUploaderField name="url" label="الفيديو" required />
          )}
          {formik.values.type === 'pdf' && (
            <PdfUploaderField name="url" label="مستند PDF" required />
          )}
        </div>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إنشاء" />
        </div>
      </form>
    </FormikProvider>
  );
}
