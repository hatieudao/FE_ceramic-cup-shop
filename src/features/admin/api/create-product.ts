import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

import { ProductType } from '../types/product';

export type ProductPayload = {
  name: string;
  description: string;
  productTypes: Partial<ProductType>[];
};

const createProduct = async (data: ProductPayload) => {
  return api.post('/products', data);
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProduct,
  });
};
