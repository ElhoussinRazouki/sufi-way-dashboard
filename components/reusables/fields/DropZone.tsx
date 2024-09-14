import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import { DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';

const DEFAULT_MAX_SIZE = 1024 * 1024; // 1MB

export type onUploadProps = {
  files: File[];
};

// TODO: file types, file size, multiple files, progress value/bar
export type DropZoneProps = {
  children?: React.ReactNode;
  className?: string;
  multiple?: boolean;
  onUpload?: (props: onUploadProps) => void;
  onError?: (rejectedFiles: FileRejection[]) => void;
  dropzoneProps?: DropzoneOptions;
  accept?: Record<string, string[]>;
  maxSize?: number;
  maxFiles?: number;
  isDisabled?: boolean;
};

export const ALLOWED_ATTACHMENTS = {
  IMAGES: {
    'image/*': ['.png', '.jpg', '.jpeg']
  },
  VIDEOS: {
    'video/*': ['.mp4', '.webm']
  },
  DOCUMENTS: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      '.docx'
    ],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
      '.xlsx'
    ],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      ['.pptx']
  },
  AUDIO: {
    'audio/*': ['.mp3', '.wav']
  }
};

export default function DropZone({
  children,
  className = '',
  multiple = false,
  dropzoneProps,
  onUpload = () => {},
  onError = () => {},
  accept = ALLOWED_ATTACHMENTS.IMAGES,
  maxSize = DEFAULT_MAX_SIZE,
  maxFiles = 1,
  isDisabled = false
}: DropZoneProps) {
  // handle file upload
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle Upload
      if (acceptedFiles.length) {
        onUpload({ files: acceptedFiles });
      }
      // Handle errors
      if (rejectedFiles.length) {
        onError(rejectedFiles);
      }
    },
    [onError, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept, // Default is accepting images
    multiple,
    onDrop: onDrop,
    maxSize,
    maxFiles,
    disabled: isDisabled,
    ...dropzoneProps
  });

  return (
    <div className="flex flex-col gap-1">
      <div
        {...getRootProps()}
        className={cn(
          'group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
          'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isDragActive && 'border-muted-foreground/50',
          isDisabled && 'pointer-events-none opacity-60',
          className
        )}
      >
        <input {...getInputProps()} />
        {children || <span>Drag and drop files, or click to select</span>}
      </div>
    </div>
  );
}
