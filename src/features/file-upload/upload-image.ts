import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

type UploadResponse = {
  message: string;
  filename: string;
  path: string;
};

const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: uploadImage,
  });
};
