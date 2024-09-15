'use client';

import { InputField } from '@/components/reusables';
import ProfileImageUploaderField from '@/components/reusables/fields/ImageUploaderField';
import TextArea from '@/components/reusables/fields/TextArea';
import UploadField from '@/components/reusables/fields/UploadField';
import SubmitButton from '@/components/reusables/SubmitButton';
import { useToast } from '@/components/ui/use-toast';
import { useAuthorDetails, useAuthors } from '@/hooks/dashboard/authors.hook';
import { AuthorPatchDTO } from '@/types/multimedia.types';
import { FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';

const UpdateAuthorSchema = yup.object().shape({
  name: yup.string().optional(),
  avatar: yup.string().optional(),
  bio: yup.string().optional()
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
      name: details?.name,
      avatar: details?.avatar,
      bio: details?.bio
    },
    validationSchema: UpdateAuthorSchema,
    onSubmit: async (values: AuthorPatchDTO) => {
      try {
        update(id, values).then(() => {
          router.back();
          toast({ title: 'Author updated successfully', variant: 'default' });
        });
      } catch (err) {
        console.error(err);
        toast({ title: 'Error updating author', variant: 'destructive' });
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
          <SubmitButton type="submit" variant="default" title="Save Changes" />
        </div>
      </form>
    </FormikProvider>
  );
}
