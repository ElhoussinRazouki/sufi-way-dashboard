'use client';

import { InputField } from '@/components/reusables';
import ImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import APIs from '@/api';
import { useNews } from '@/hooks/dashboard/news.hook';
import { NewsCreateDTO } from '@/types/news.types';

const CreateNewsSchema = yup.object().shape({
  title: yup.string().required('العنوان مطلوب'),
  description: yup.string().required('الوصف مطلوب'),
  url: yup.string().required('الرابط مطلوب')
});

export default function CreateNewsForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useNews();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      url: ''
    },
    validationSchema: CreateNewsSchema,
    onSubmit: async (values: NewsCreateDTO) => {
      try {
        await create(values);
        router.back();
        toast({ title: 'تم إنشاء الخبر بنجاح', variant: 'default' });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <InputField name="title" className="w-full" label="العنوان" required />
        <TextArea name="description" label="الوصف" required />
        <div className="my-4 flex gap-4">
          <ImageUploaderField name="url" label="الصورة" required />
        </div>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إنشاء" />
        </div>
      </form>
    </FormikProvider>
  );
}
