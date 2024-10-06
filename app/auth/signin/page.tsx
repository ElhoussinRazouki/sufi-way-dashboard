'use client';

import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { useUser } from '@/hooks/auth.hook';
import { useEffect, useState } from 'react';

const background = '/images/background.jpg';

export default function AuthenticationPage() {
  const { isAuthenticated } = useUser();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent SSR

  if (isAuthenticated) {
    window.location.replace('/dashboard');
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              تسجيل الدخول إلى حسابك
            </h1>
            <p className="text-sm text-muted-foreground">
              أدخل بيانات الاعتماد الخاصة بك أدناه لتسجيل الدخول
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
      <div className="imagContainer relative hidden h-full overflow-hidden bg-muted text-white dark:border-r lg:block">
        <img
          src={background}
          alt=""
          className="absolute left-0 top-0 h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
