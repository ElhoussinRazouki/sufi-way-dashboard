'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useFrequentQuestions } from '@/hooks/dashboard/fq.hook';
import { FqCreateDTO } from '@/types/fq.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useState } from 'react';

const CreateFqSchema = yup.object().shape({
  question: yup.string().required('يرجى إدخال سؤال.'),
  response: yup.string().required('يرجى تقديم رد.')
});

export default function CreateFqForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { create } = useFrequentQuestions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      question: '',
      response: ''
    },
    validationSchema: CreateFqSchema,
    onSubmit: async (values: FqCreateDTO) => {
      setIsSubmitting(true);
      try {
        await create(values);
        toast({
          title: 'تمت إضافة السؤال المتكرر بنجاح!',
          variant: 'default'
        });
        router.back();
      } catch (err) {
        const message = APIs.common.handleApiError(err);
        toast({ title: message, variant: 'destructive' });
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Question Input Field */}
        <InputField
          name="question"
          label="السؤال"
          placeholder="أدخل السؤال المتكرر هنا"
        />

        {/* Response TextArea */}
        <TextArea
          name="response"
          label="الرد"
          placeholder="قدم ردًا مفصلاً على السؤال"
        />

        {/* Submit Button */}
        <div className="flex justify-end">
          <SubmitButton
            type="submit"
            variant="default"
            title={isSubmitting ? 'جارٍ الإرسال...' : 'إضافة سؤال'}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </FormikProvider>
  );
}
