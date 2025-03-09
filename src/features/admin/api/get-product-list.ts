import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

import { Meta } from '../../../types/api';
import { Product } from '../../../types/product';

type ProductListResponse = {
  data: Product[];
  meta: Meta;
};

const getProductList = async (
  page = 1,
  perPage = 10,
): Promise<ProductListResponse> => {
  return api.get(`/products/admin/list`, {
    params: { page, perPage },
  });
};

export const useProductList = ({ page = 1, perPage = 10 }) => {
  return useQuery({
    queryKey: ['admin_products', { page, perPage }],
    queryFn: () => getProductList(page, perPage),
  });
};
