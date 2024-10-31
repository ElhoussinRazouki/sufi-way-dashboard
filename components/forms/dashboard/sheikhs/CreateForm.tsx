'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useSheikhs } from '@/hooks/dashboard/sheikhs.hook';
import { SheikhCreateDTO } from '@/types/sheikhs.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const CreateSheikhSchema = yup.object().shape({
  name: yup.string().required('الاسم مطلوب'),
  avatar: yup.string().required('الصورة مطلوبة'),
  bio: yup.string().optional()
});

export default function CreateSheikhForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useSheikhs();

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
      bio: ''
    },
    validationSchema: CreateSheikhSchema,
    onSubmit: async (values: SheikhCreateDTO) => {
      try {
        await create(values);
        toast({ title: 'تمت إضافة معلومات الشيخ بنجاح', variant: 'default' });
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
        <ProfileImageUploaderField name="avatar" label="صورة الشيخ" />
        <InputField name="name" label="الاسم" />
        <TextArea name="bio" label="السيرة الذاتية" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إضافة" />
        </div>
      </form>
    </FormikProvider>
  );
}
