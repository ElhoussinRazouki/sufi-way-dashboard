'use client';

import { InputField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import ImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import APIs from '@/api';
import { useNews, useNewsDetails } from '@/hooks/dashboard/news.hook';
import { NewsPatchDTO } from '@/types/news.types';

const UpdateNewsSchema = yup.object().shape({
  title: yup.string().required('العنوان مطلوب'),
  description: yup.string().required('الوصف مطلوب'),
  url: yup.string().required('الرابط مطلوب')
});

type UpdateNewsFormProps = {
  id: string;
  className?: string;
};

export default function UpdateNewsForm({ className, id }: UpdateNewsFormProps) {
  const { update } = useNews();
  const { data: details } = useNewsDetails(id);
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: details?.title,
      description: details?.description,
      url: details?.url
    },
    validationSchema: UpdateNewsSchema,
    onSubmit: async (values: NewsPatchDTO) => {
      try {
        await update(id, values).then(() => {
          router.back();
          toast({
            title: 'تم تحديث الأخبار بنجاح',
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
        <InputField name="title" label="العنوان" />
        <TextArea name="description" label="الوصف" />
        <div className="my-4 flex gap-4">
          <ImageUploaderField name="url" label="الصورة" />
        </div>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}