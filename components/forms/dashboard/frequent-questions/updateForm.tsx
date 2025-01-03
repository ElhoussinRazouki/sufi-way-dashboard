'use client';

import APIs from '@/api';
import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useAuthorDetails, useAuthors } from '@/hooks/dashboard/authors.hook';
import { useFqDetails, useFrequentQuestions } from '@/hooks/dashboard/fq.hook';
import { FqPatchDTO } from '@/types/fq.types';
import { AuthorPatchDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateFqSchema = yup.object().shape({
  question: yup.string().optional().label('السؤال'),
  response: yup.string().optional().label('الإجابة')
});

type UpdateFqFormProps = {
  id: string;
  className?: string;
};

export default function UpdateFqForm({ className, id }: UpdateFqFormProps) {
  const { data: details } = useFqDetails(id);
  const { update } = useFrequentQuestions();
  const { toast } = useToast();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      question: details?.question,
      response: details?.response
    },
    validationSchema: UpdateFqSchema,
    onSubmit: async (values: FqPatchDTO) => {
      try {
        update(id, values).then(() => {
          router.back();
          toast({
            title: 'تم تحديث السؤال المتكرر بنجاح',
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
      <form onSubmit={formik.handleSubmit}>
        {/* Question Input Field */}
        <InputField
          name="question"
          label="السؤال"
          placeholder="أدخل السؤال المتكرر هنا"
        />

        {/* Response TextArea */}
        <TextArea
          name="response"
          label="الإجابة"
          placeholder="قدم إجابة مفصلة للسؤال"
        />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="حفظ التغييرات" />
        </div>
      </form>
    </FormikProvider>
  );
}
