import { cn } from "@/lib/utils"
import { useCallback } from "react"
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone"

const DEFAULT_MAX_SIZE = 1024 * 1024 // 1MB

export type onUploadProps = {
  files: File[]
}

// TODO: file types, file size, multiple files, progress value/bar
export type DropZoneProps = {
  children?: React.ReactNode
  className?: string
  multiple?: boolean
  onUpload?: (props: onUploadProps) => void
  onError?: (rejectedFiles: FileRejection[]) => void
  dropzoneProps?: DropzoneOptions
  accept?: Record<string, string[]>
  maxSize?: number
  maxFiles?: number
}

export const ALLOWED_ATTACHMENTS = {
  IMAGES: {
    "image/*": [".png", ".jpg", ".jpeg"],
  },
  VIDEOS: {
    "video/*": [".mp4", ".webm"],
  },
  DOCUMENTS: {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
  },
  AUDIO: {
    "audio/*": [".mp3", ".wav"],
  },
}

export default function DropZone({
  children,
  className = "",
  multiple = false,
  dropzoneProps,
  onUpload = () => {},
  onError = () => {},
  accept = ALLOWED_ATTACHMENTS.IMAGES,
  maxSize = DEFAULT_MAX_SIZE,
  maxFiles = 1,
}: DropZoneProps) {
  // handle file upload
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Handle Upload
      if (acceptedFiles.length) {
        onUpload({ files: acceptedFiles })
      }
      // Handle errors
      if (rejectedFiles.length) {
        onError(rejectedFiles)
      }
    },
    [onError, onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept, // Default is accepting images
    multiple,
    onDrop: onDrop,
    maxSize,
    maxFiles,
    ...dropzoneProps,
  })

  return (
    <div className="flex flex-col gap-1">
      <div
        {...getRootProps()}
        className={cn(
          "flex justify-center items-center h-[100px] rounded-md bg-slate-100 border-2 border-dashed border-slate-300 text-slate-500 cursor-pointer mb-2",
          className,
          isDragActive && "border-slate-400 text-slate-600",
        )}
      >
        <input {...getInputProps()} />
        {children || <span>Drag and drop files, or click to select</span>}
      </div>
    </div>
  )
}
