"use client"

import SubmitButton from "@/components/reusables/SubmitButton"
import { useAuth } from "@/hooks/auth.hook"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Formik } from "formik"
import { useCallback } from "react"
import { toast } from "react-toastify"
import * as yup from "yup"
import { InputField } from "../reusables"
import SensitiveField from "../reusables/fields/SensitiveField"

const loginSchema = yup.object().shape({
  email: yup.string().required("الرجاء إدخال بريدك الإلكتروني"),
  password: yup.string().required("الرجاء إدخال كلمة المرور الخاصة بك"),
})

const initialValues = {
  email: "",
  password: "",
}

export default function LoginForm({ className }: { className?: string }) {
  const { auth, redirect } = useAuth()

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      try {
        const authToken = await auth(values.email, values.password)
        if (authToken) {
          await redirect() // redirect to the dashboard or the the "to" page
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          toast.error("اسم المستخدم أو كلمة المرور غير صالحة!")
        }
      }
    },
    [auth, redirect],
  )

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={loginSchema}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className={cn("grid gap-4", className)}>
            <InputField name="email" label="بريد إلكتروني" placeholder="بريد إلكتروني" />
            <SensitiveField name="password" label="كلمة المرور" placeholder="******" />
            <SubmitButton title="تسجيل الدخول" />
          </div>
        </form>
      )}
    </Formik>
  )
}
