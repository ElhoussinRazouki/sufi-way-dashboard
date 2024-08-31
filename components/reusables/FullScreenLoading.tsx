import { Loader } from "lucide-react";

// TODO: change the loading spinner based on the dark/light mode
export default function FullScreenLoading() {
  return (
    <div className="w-full h-full bg-slate-200 absolute flex justify-center items-center">
      <Loader size={32} className="animate-spin" />
    </div>
  )
}
