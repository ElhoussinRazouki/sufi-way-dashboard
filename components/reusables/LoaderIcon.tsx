import React from 'react';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoaderIcon({
  size,
  className
}: {
  size?: number;
  className?: string;
}) {
  return <Loader size={size || 32} className={cn('animate-spin', className)} />;
}
