"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { notFound } from "next/navigation"
import { ErrorBoundary as BaseErrorBoundary } from "react-error-boundary"

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <BaseErrorBoundary
      fallbackRender={FallbackError}
      onReset={() => {
        window.location.reload()
      }}
    >
      {children}
    </BaseErrorBoundary>
  )
}

type FallbackErrorProps = {
  error: Error & { digest?: string }
  resetErrorBoundary: () => void
}

// This one is for any error handling in the app
export function FallbackError({ error, resetErrorBoundary }: FallbackErrorProps) {
  if (axios.isAxiosError(error) && error.response?.status === 404) return notFound()

  return (
    <div className="flex w-full h-full justify-center items-center text-center text-red-400">
      <div>
        <h2 className="mb-2">Something went wrong!</h2>
        <Button onClick={() => resetErrorBoundary()}>Try again!</Button>
      </div>
    </div>
  )
}

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

// This one is for Next js error.tsx file
export function Error({ error, reset }: ErrorProps) {
  if (axios.isAxiosError(error) && error.response?.status === 404) return notFound()

  return (
    <div className="flex w-full h-full justify-center items-center text-center text-red-400">
      <div>
        <h2 className="mb-2">Something went wrong!</h2>
        <Button onClick={() => reset()}>Try again!</Button>
      </div>
    </div>
  )
}
