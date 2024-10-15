'use client';

import { InputField, SelectField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
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
            title: 'تم تحديث الوسائط بنجاح',
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
      <form onSubmit={formik.handleSubmit} className={className || ''}>
        <InputField name="title" label="العنوان" />
        <AuthorsComboBoxField
          label="المؤلف"
          className="w-full"
          defaultAuthor={multimediaDetails?.author_id}
        />
        <TextArea name="description" label="الوصف" />
        <SelectField
          name="type"
          label="النوع"
          options={MULTIMEDIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
        />
        <div className="my-4 flex gap-4">
          <ImageUploaderField name="thumbnail" label="الصورة المصغرة" />
          {formik.values.type === 'audio' && (
            <AudioUploaderField name="url" label="الصوت" />
          )}
          {formik.values.type === 'video' && (
            <VideoUploaderField name="url" label="الفيديو" />
          )}
          {formik.values.type === 'pdf' && (
            <PdfUploaderField name="url" label="مستند PDF" />
          )}
        </div>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
