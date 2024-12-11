/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { ErrorMessage, useField } from 'formik';
import { ImageUp, Loader, Trash } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import DropZone, { onUploadProps } from './DropZone';
import APIs from '@/api';
import { Label } from '@/components/ui/label';
import Help from '../Help';
import FormError from '../FormError';
import { getAcceptedFormats } from './UploadField';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

type ImageUploaderFieldProps = {
  name: string;
  className?: string;
  dropZoneClassName?: string;
  label?: string;
  required?: boolean;
  help?: string;
};

export default function ImageUploaderField({
  name,
  className,
  dropZoneClassName,
  label,
  required,
  help
}: ImageUploaderFieldProps) {
  const [showUploader, setShowUploader] = React.useState(false);
  const [field, meta, helpers] = useField<string>(name);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleMouseEnter = () => {
    setShowUploader(true);
  };

  const handleMouseLeave = () => {
    setShowUploader(false);
  };

  const handleDeleteFile = (e: any) => {
    helpers.setValue('');
    e.stopPropagation();
  };

  const handleUploadProgress = useCallback((progress: number) => {
    setProgress(progress);
  }, []);

  const handleOnUploadFinish = ({ files }: onUploadProps) => {
    // Enable Loading
    APIs.common
      .uploadAttachment(files[0], name, 'image', handleUploadProgress)
      .then((attachment) => {
        if (attachment) {
          helpers.setValue(attachment.url);
        }
        setProgress(0);
      })
      .catch((error) => {
        console.error(error);
        setProgress(0);
      });
  };

  return (
    <div
      key={`input-${name}`}
      className={cn(`mb-2 flex flex-col gap-1 text-primary ${className}`)}
    >
      {label && (
        <Label htmlFor={name} className="mb-2">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <div
        className={cn(
          'relative h-36 w-36 overflow-hidden rounded-xl',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragEnter={handleMouseEnter}
      >
        {field.value ? (
          <img
            src={field.value}
            alt="preview of the profile image "
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-slate-500/10 text-slate-50 backdrop-blur-sm ">
            <ImageUp size={22} />
          </div>
        )}
        {showUploader && !progress && (
          <DropZone
            className={cn(
              'absolute left-0 top-0 h-full w-full bg-slate-500/10 backdrop-blur-sm',
              dropZoneClassName
            )}
            onUpload={handleOnUploadFinish}
            accept={getAcceptedFormats('image')}
            maxSize={1024 * 1024 * 5}
            onError={(error) =>
              toast({
                description:
                  error[0]?.errors[0]?.message || 'unable to upload this file',
                variant: 'destructive'
              })
            }
          >
            <div className="flex h-full flex-col items-center justify-center text-slate-50">
              <ImageUp size={24} className="" />
              <span>upload new one</span>
            </div>
            <Button
              className="absolute right-0 top-0 h-10 w-10 rounded-full bg-red-500/45 p-1 text-white hover:bg-red-600/45"
              onClick={handleDeleteFile}
              type='button'
            >
              <Trash size={22} />
            </Button>
          </DropZone>
        )}
        {progress && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-slate-500/10 text-slate-50 backdrop-blur-sm">
            <Loader size={24} className="animate-spin" />
            <span className="transition-all">{progress}%</span>
          </div>
        )}
      </div>
      {help && <Help>{help}</Help>}
      <ErrorMessage name={name} component={FormError} />
    </div>
  );
}
