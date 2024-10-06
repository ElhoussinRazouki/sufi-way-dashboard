'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useAuthorDetails, useAuthors } from '@/hooks/dashboard/authors.hook';
import { AuthorPatchDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateAuthorSchema = yup.object().shape({
  name: yup.string().optional().label('الاسم').nullable().default(''),
  avatar: yup
    .string()
    .optional()
    .label('صورة الملف الشخصي')
    .nullable()
    .default(''),
  bio: yup.string().optional().label('السيرة الذاتية').nullable().default('')
});

type UpdateAuthorFormProps = {
  id: string;
  className?: string;
};

export default function UpdateAuthorForm({
  className,
  id
}: UpdateAuthorFormProps) {
  const { data: details } = useAuthorDetails(id);
  const { update } = useAuthors();
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: details?.name || '',
      avatar: details?.avatar || '',
      bio: details?.bio || ''
    },
    validationSchema: UpdateAuthorSchema,
    onSubmit: async (values: AuthorPatchDTO) => {
      try {
        update(id, values).then(() => {
          router.back();
          toast({ title: 'تم تحديث المؤلف بنجاح', variant: 'default' });
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
        <ProfileImageUploaderField name="avatar" label="صورة الملف الشخصي" />
        <InputField name="name" label="الاسم" />
        <TextArea name="bio" label="السيرة الذاتية" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
