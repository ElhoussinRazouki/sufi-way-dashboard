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
import { AdkarAdiaCreateDTO } from '@/types/adkar-adia.types';
import { useAdkarAdia } from '@/hooks/dashboard/adkar-adia.hook';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CreateAdkarAdiaSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup
    .array()
    .of(yup.string())
    .min(1, 'يجب توفير واحد على الأقل')
    .required(),
  type: yup
    .string()
    .oneOf(ADKAR_ADIA_TYPES, 'نوع الأذكار والأدعية غير صالح')
    .required('النوع مطلوب')
});

export default function CreateAdkarAdiaForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useAdkarAdia();

  const formik = useFormik({
    initialValues: {
      title: '',
      content: [],
      type: 'adkar'
    },
    validationSchema: CreateAdkarAdiaSchema,
    onSubmit: async (values: AdkarAdiaCreateDTO) => {
      try {
        await create(values);
        router.back();
        toast({
          title: 'تمت إضافة سجل جديد بنجاح',
          variant: 'default'
        });
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      }
    }
  });

  const [contentFields, setContentFields] = useState<string[]>(['']);

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
      <form onSubmit={formik.handleSubmit}>
        <InputField name="title" className="w-full" label="العنوان" required />
        <SelectField
          name="type"
          label="النوع"
          options={[
            { value: 'adkar', label: 'أذكار' },
            { value: 'doaa', label: 'دعاء' }
          ]}
          required
          className="w-20"
        />
        {contentFields.map((content, index) => (
          <div key={index} className="flex items-center space-x-2">
            <TextArea
              name={`content[${index}]`}
              label={`المحتوى ${index + 1}`}
              value={content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              required
            />
            <Button
              onClick={() => handleRemoveContentField(index)}
              className="!m-2"
              variant={'destructive'}
            >
              حذف
            </Button>
          </div>
        ))}
        <Button
          onClick={handleAddContentField}
          className="text-blue-500"
          variant={'outline'}
          type="button"
        >
          إضافة محتوى
        </Button>
        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="إنشاء" />
        </div>
      </form>
    </FormikProvider>
  );
}
