import { Loader } from "lucide-react";

// TODO: the loading section should be improved with a spinner or something
export default function LoadingSection() {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader size={32} className="animate-spin" />
    </div>
  )
}
