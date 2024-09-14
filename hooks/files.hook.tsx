import { useState } from 'react';
import { AxiosProgressEvent } from 'axios';
import axiosApi from '@/api/axios.api';

type FileType = 'image' | 'video' | 'audio' | 'pdf';

interface UseFileUploadOptions {
  fileType: FileType;
  maxSize?: number;
}

const useFileUpload = ({
  fileType,
  maxSize = 2 * 1024 * 1024
}: UseFileUploadOptions) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0); // Track progress as a percentage
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    if (file.size > maxSize) {
      setError('File size exceeds the limit');
      return;
    }

    if (!file.type.startsWith(fileType)) {
      setError(`Invalid file type. Only ${fileType} files are allowed.`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setError(null);
      setProgress(0); // Reset progress before starting upload

      const response = await axiosApi.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const total = progressEvent.total || 0;
          const current = progressEvent.loaded || 0;
          setProgress(Math.round((current / total) * 100));
        }
      });

      setFilePath(response.data.filePath);
    } catch (err: any) {
      setError(`Upload failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setUploading(false);
    }
  };

  return { uploadFile, uploading, progress, error, filePath };
};

export default useFileUpload;
