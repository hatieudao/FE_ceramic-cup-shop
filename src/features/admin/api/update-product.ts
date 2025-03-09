import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

import { ProductType } from '../types/product';

export type ProductPayload = {
  name: string;
  description: string;
  productTypes: ProductType[];
};

const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: ProductPayload;
}) => {
  return api.put(`/products/${id}`, data);
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct,
  });
};
