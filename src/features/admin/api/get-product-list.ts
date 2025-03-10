import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { handleUnauthorized } from '@/utils/handle-unauthorized';

import { Meta } from '../../../types/api';
import { Product } from '../../../types/product';

type ProductListResponse = {
  data: Product[];
  meta: Meta;
};

interface GetProductListParams {
  page?: number;
  perPage?: number;
}

export const getProductList = async ({
  page = 1,
  perPage = 10,
}: GetProductListParams): Promise<ProductListResponse> => {
  try {
    const response = await api.get('/products/admin/list', {
      params: {
        page,
        perPage,
      },
    });
    return response;
  } catch (error) {
    if (handleUnauthorized(error)) {
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

export const useProductList = (params: GetProductListParams) => {
  return useQuery({
    queryKey: ['admin', 'products', params],
    queryFn: () => getProductList(params),
  });
};
