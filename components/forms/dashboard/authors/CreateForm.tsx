'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useAuthors } from '@/hooks/dashboard/authors.hook';
import { AuthorCreateDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const CreateAuthorSchema = yup.object().shape({
  name: yup.string().required('الاسم مطلوب'),
  avatar: yup.string().required('الصورة مطلوبة'),
  bio: yup.string().optional()
});

export default function CreateAuthorForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useAuthors();

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
      bio: ''
    },
    validationSchema: CreateAuthorSchema,
    onSubmit: async (values: AuthorCreateDTO) => {
      try {
        await create(values);
        toast({ title: 'تمت إضافة المؤلف بنجاح', variant: 'default' });
        router.back();
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <ProfileImageUploaderField name="avatar" label="صورة الملف الشخصي" />
        <InputField name="name" label="الاسم" />
        <TextArea name="bio" label="السيرة الذاتية" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إضافة" />
        </div>
      </form>
    </FormikProvider>
  );
}
