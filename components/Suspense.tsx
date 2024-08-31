import { Suspense as BaseSuspense } from "react"
import LoadingSection from "./reusables/LoadingSection"

export default function Suspense({ children }: { children: React.ReactNode }) {
  return <BaseSuspense fallback={<LoadingSection />}>{children}</BaseSuspense>
}
