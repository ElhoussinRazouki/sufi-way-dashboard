'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useZawya } from '@/hooks/dashboard/zawya.hook';
import { ZawyaCreateDTO } from '@/types/zawya.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const CreateZawyaSchema = yup.object().shape({
  name: yup.string().required('الاسم مطلوب'),
  avatar: yup.string().required('الصورة مطلوبة'),
  bio: yup.string().optional()
});

export default function CreateZawyaForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useZawya();

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
      bio: ''
    },
    validationSchema: CreateZawyaSchema,
    onSubmit: async (values: ZawyaCreateDTO) => {
      try {
        await create(values);
        toast({ title: 'تمت إضافة معلومات الزاوية بنجاح', variant: 'default' });
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
        <ProfileImageUploaderField
          name="avatar"
          label="الصورة الرمزية"
          className="h-48 w-72"
        />
        <InputField name="name" label="الاسم" />
        <TextArea name="bio" label="نبذة" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إضافة" />
        </div>
      </form>
    </FormikProvider>
  );
}
