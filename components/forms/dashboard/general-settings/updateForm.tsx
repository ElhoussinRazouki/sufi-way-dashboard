'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useGeneralSettings } from '@/hooks/dashboard/general-settings.hook';
import { GeneralSettingsPatchDTO } from '@/types/general-settings.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateGeneralSettingsSchema = yup.object().shape({
  sheikhEmail: yup.string().optional().label('البريد الإلكتروني للشيخ'),
  supportEmail: yup.string().optional().label('البريد الإلكتروني للدعم')
});

type UpdateGeneralSettingsFormProps = {
  className?: string;
};

export default function UpdateGeneralSettingsForm({
  className
}: UpdateGeneralSettingsFormProps) {
  const { details, update } = useGeneralSettings();
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      sheikhEmail: details?.sheikhEmail,
      supportEmail: details?.supportEmail
    },
    validationSchema: UpdateGeneralSettingsSchema,
    onSubmit: async (values: GeneralSettingsPatchDTO) => {
      try {
        update(values).then(() => {
          toast({
            title: 'تم تحديث الإعدادات العامة بنجاح',
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
        {/* Question Input Field */}
        <InputField
          name="sheikhEmail"
          label="البريد الإلكتروني للشيخ"
          type="email"
          placeholder="أدخل البريد الإلكتروني للشيخ"
        />

        <InputField
          name="supportEmail"
          label="البريد الإلكتروني للدعم"
          type="email"
          placeholder="أدخل البريد الإلكتروني للدعم"
        />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
