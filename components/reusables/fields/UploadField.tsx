import APIs from '@/api';
import { cn } from '@/lib/utils';
import { AttachmentDto, AttachmentTypes, Prettify } from '@/types';
import { Label } from '@radix-ui/react-label';
import { ErrorMessage, useField } from 'formik';
import { useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import DropZone, { DropZoneProps, onUploadProps } from './DropZone';
import { useToast } from '@/components/ui/use-toast';
import FormError from '../FormError';
import { MultimediaType } from '@/types/multimedia.types';
import LoaderIcon from '../LoaderIcon';

const DEFAULT_MAX_SIZE = 1024 * 1024; // 1MB

export type UploadFieldProps = {
  name: string;
  accept: AttachmentTypes;
  label?: string;
  className?: string;
  required?: boolean;
  onUploadComplete?: (attachment: AttachmentDto) => void;
  maxSize?: number;
  dropzoneClassName?: string;
  formatProgress?: (progress: number) => number;
};

export default function UploadField({
  name,
  label = '',
  className = '',
  onUploadComplete,
  required = false,
  maxSize = DEFAULT_MAX_SIZE, // in bytes
  accept,
  dropzoneClassName = '',
  formatProgress = (progress: number) => Math.round(progress),
  ...props
}: UploadFieldProps) {
  const [field, meta, helpers] = useField<string>({
    name,
    validate: () => {
      if (required && !field.value) {
        return `Minimum one file should be uploaded!`;
      }
    }
  });
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    size: number;
    name: string;
    type: string;
  }>();

  console.log(progress);
  const { toast } = useToast();

  const handleUploadProgress = useCallback(async (progress: number) => {
    setProgress(progress);
  }, []);

  const handleUpload = useCallback(
    async ({ files }: onUploadProps) => {
      if (progress) return;
      // Upload a single file
      APIs.common
        .uploadAttachment(files[0], name, accept, handleUploadProgress)
        .catch((error) => {
          toast({ description: error.message, variant: 'destructive' });
          setProgress(0);
        })
        .then((data) => {
          if (data) {
            setUploadedFile(data);
            helpers.setValue(data.url);
          }
          setProgress(0);
        });
    },
    [accept, handleUploadProgress, helpers, name, progress, toast]
  );

  const handleError = useCallback(
    (rejectedFiles: FileRejection[]) => {
      const parsedError = rejectedFiles.map((file: FileRejection) => {
        return (
          file.file.name +
          '\n - ' +
          file.errors.map((error) => error.message).join(', ')
        );
      });
      toast({ description: 'Upload failed: ' + parsedError.join(', ') });
    },
    [toast]
  );

  return (
    <div className={cn('relative mb-5', className)}>
      {label && <label className="mb-2 block">{label}</label>}

      <DropZone
        onUpload={handleUpload}
        onError={handleError}
        accept={getAcceptedFormats(accept)}
        maxSize={maxSize}
        {...props}
        className={dropzoneClassName}
      />
      {progress > 0 && (
        <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center gap-2 bg-opacity-80 backdrop-blur-md">
          <LoaderIcon />{' '}
          {progress < 100 ? `${progress}%` : 'syncing with the cloud..'}{' '}
        </div>
      )}
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
}

export const getAcceptedFormats = (type: MultimediaType | 'image') => {
  const acceptMap: {
    [key in MultimediaType | 'image']: { [mime: string]: string[] };
  } = {
    video: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    audio: {
      'audio/*': ['.mp3', '.wav', '.aac']
    },
    pdf: {
      'application/pdf': ['.pdf']
    },
    image: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg']
    }
  };

  return acceptMap[type];
};
