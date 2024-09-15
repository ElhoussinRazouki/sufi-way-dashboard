'use client';

import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useAuthors } from '@/hooks/dashboard/authors.hook';
import { AuthorCreateDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const CreateAuthorSchema = yup.object().shape({
  name: yup.string().required(),
  avatar: yup.string().required(),
  bio: yup.string().optional()
});

export default function CreateAuthorForm() {
  const { toast } = useToast();
  const router = useRouter();

  const { create } = useAuthors();

  const formik = useFormik({
    initialValues: {
      name: '',
      avatar: '',
      bio: ''
    },
    validationSchema: CreateAuthorSchema,
    onSubmit: async (values: AuthorCreateDTO) => {
      try {
        await create(values);
        toast({ title: 'Author Added successfully', variant: 'default' });
        router.back();
      } catch (err) {
        // APIs.errors.handleApiError(err)
        console.error(err);
        toast({ title: 'Error adding author', variant: 'destructive' });
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        <ProfileImageUploaderField name="avatar" label="Profile Image" />
        <InputField name="name" label="Name" />
        <TextArea name="bio" label="Bio" />

        <div className="my-4 flex justify-end">
          <SubmitButton type="submit" variant="default" title="Add" />
        </div>
      </form>
    </FormikProvider>
  );
}
