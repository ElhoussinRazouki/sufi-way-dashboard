"use client";

import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { useUser } from '@/hooks/auth.hook';


export default function AuthenticationPage() {
  const { isAuthenticated } = useUser();

  if (isAuthenticated) {
    window.location.replace('/dashboard');
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">

      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              تسجيل الدخول إلى الحساب
            </h1>
            <p className="text-sm text-muted-foreground">
            أدخل بياناتك أدناه لتسجيل الدخول
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
          عند تسجيل الدخول، فإنك تقر بموافقتك على {' '}              <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              شروط الخدمة
            </Link>{' '}
            و{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              سياسة الخصوصية
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
