'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useSheikhDetails, useSheikhs } from '@/hooks/dashboard/sheikhs.hook';
import { cn } from '@/lib/utils';
import { SheikhPatchDTO } from '@/types/sheikhs.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateSheikhSchema = yup.object().shape({
  name: yup.string().optional().label('الاسم').nullable().default(''),
  avatar: yup.string().optional().label('صورة الشيخ').nullable().default(''),
  bio: yup.string().optional().label('السيرة الذاتية').nullable().default('')
});

type UpdateSheikhFormProps = {
  id: string;
  className?: string;
};

export default function UpdateSheikhForm({
  className,
  id
}: UpdateSheikhFormProps) {
  const { data: details } = useSheikhDetails(id);
  const { update } = useSheikhs();
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: details?.name || '',
      avatar: details?.avatar || '',
      bio: details?.bio || ''
    },
    validationSchema: UpdateSheikhSchema,
    onSubmit: async (values: SheikhPatchDTO) => {
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
        <TextArea name="bio" label="السيرة الذاتية" className="min-h-32" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
