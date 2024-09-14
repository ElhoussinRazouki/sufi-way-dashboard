import { Loader } from 'lucide-react';

export default function LoadingSection() {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader size={32} className="animate-spin" />
    </div>
  );
}
