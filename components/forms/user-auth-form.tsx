'use client';

import SubmitButton from '@/components/reusables/SubmitButton';
import { useAuth } from '@/hooks/auth.hook';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Formik } from 'formik';
import { useCallback } from 'react';
import * as yup from 'yup';
import { InputField } from '../reusables';
import SensitiveField from '../reusables/fields/SensitiveField';
import { useToast } from '../ui/use-toast';

const loginSchema = yup.object().shape({
  email: yup.string().required('Please enter your email'),
  password: yup.string().required('Please enter your password')
});

const initialValues = {
  email: '',
  password: ''
};

export default function LoginForm({ className }: { className?: string }) {
  const { auth, redirect } = useAuth();
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        const authToken = await auth(values.email, values.password);
        if (authToken) {
          await redirect(); // redirect to the dashboard or the the "to" page
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast({ title: err.response.data?.message, variant: 'destructive' });
        }
      }
    },
    [auth, redirect]
  );

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={loginSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={cn('grid gap-4', className)}>
            <InputField name="email" label="" placeholder="e.g. ahmed@ux.ai" />
            <SensitiveField
              name="password"
              label="Password"
              placeholder="******"
            />
            <SubmitButton title="Login" />
          </div>
        </form>
      )}
    </Formik>
  );
}
