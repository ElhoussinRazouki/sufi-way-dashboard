'use client';

import { InputField, SelectField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { ADKAR_ADIA_TYPES } from '@/constants/data';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import APIs from '@/api';
import {
  useAdkarAdia,
  useAdkarAdiaDetails
} from '@/hooks/dashboard/adkar-adia.hook';
import { AdkarAdiaPatchDTO } from '@/types/adkar-adia.types';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const UpdateAdkarAdiaSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup
    .array()
    .of(yup.string())
    .min(1, 'يجب تقديم واحد على الأقل')
    .required(),
  type: yup
    .string()
    .oneOf(ADKAR_ADIA_TYPES, 'نوع الأذكار والأدعية غير صالح')
    .required('النوع مطلوب')
});

type UpdateAdkarAdiaFormProps = {
  adkarAdiaId: string;
  className?: string;
};

export default function UpdateAdkarAdiaForm({
  className,
  adkarAdiaId
}: UpdateAdkarAdiaFormProps) {
  const { update } = useAdkarAdia();
  const { data: details } = useAdkarAdiaDetails(adkarAdiaId);
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: details?.title,
      content: details?.content,
      type: details?.type
    },
    validationSchema: UpdateAdkarAdiaSchema,
    onSubmit: async (values: AdkarAdiaPatchDTO) => {
      try {
        await update(adkarAdiaId, values).then(() => {
          router.back();
          toast({
            title: 'تم تطبيق التحديث بنجاح',
            variant: 'default'
          });
        });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  const [contentFields, setContentFields] = useState<string[]>(
    details?.content || ['']
  );

  useEffect(() => {
    if (details?.content) {
      setContentFields(details.content);
    }
  }, [details]);

  const handleAddContentField = () => {
    setContentFields([...contentFields, '']);
  };

  const handleRemoveContentField = (index: number) => {
    const newContentFields = contentFields.filter((_, i) => i !== index);
    setContentFields(newContentFields);
    formik.setFieldValue('content', newContentFields);
  };

  const handleContentChange = (index: number, value: string) => {
    const newContentFields = contentFields.map((field, i) =>
      i === index ? value : field
    );
    setContentFields(newContentFields);
    formik.setFieldValue('content', newContentFields);
  };

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className={className || ''}>
        <InputField name="title" className="w-full" label="العنوان" required />
        <SelectField
          name="type"
          label="النوع"
          options={ADKAR_ADIA_TYPES.map((type) => ({
            value: type,
            label: type
          }))}
          required
        />
        {contentFields.map((content, index) => (
          <div key={index} className="flex items-center space-x-2">
            <TextArea
              name={`content[${index}]`}
              label={`المحتوى ${index + 1}`}
              value={content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="min-w-96"
              required
            />
            <Button
              onClick={() => handleRemoveContentField(index)}
              className="!m-2"
              variant={'destructive'}
              type="button"
            >
              حذف
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddContentField}
          className="text-blue-500"
          variant={'outline'}
        >
          إضافة محتوى
        </Button>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
