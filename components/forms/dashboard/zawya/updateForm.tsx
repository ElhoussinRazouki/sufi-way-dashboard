'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useZawya, useZawyaDetails } from '@/hooks/dashboard/zawya.hook';
import { cn } from '@/lib/utils';
import { ZawyaPatchDTO } from '@/types/zawya.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateZawyaSchema = yup.object().shape({
  name: yup.string().optional().label('الاسم').nullable().default(''),
  avatar: yup
    .string()
    .optional()
    .label('الصورة الرمزية')
    .nullable()
    .default(''),
  bio: yup.string().optional().label('نبذة').nullable().default('')
});

type UpdateZawyaFormProps = {
  id: string;
  className?: string;
};

export default function UpdateZawyaForm({
  className,
  id
}: UpdateZawyaFormProps) {
  const { data: details } = useZawyaDetails(id);
  const { update } = useZawya();
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: details?.name || '',
      avatar: details?.avatar || '',
      bio: details?.bio || ''
    },
    validationSchema: UpdateZawyaSchema,
    onSubmit: async (values: ZawyaPatchDTO) => {
      try {
        update(id, values).then(() => {
          router.back();
          toast({ title: 'تم تحديث معلومات الشيخ بنجاح', variant: 'default' });
        });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={cn(className)}>
        <ProfileImageUploaderField name="avatar" label="صورة الشيخ" />
        <InputField name="name" label="الاسم" />
        <TextArea name="bio" label="نبذة" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
