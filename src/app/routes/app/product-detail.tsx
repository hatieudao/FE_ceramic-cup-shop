import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';
import ProductDetailPage from '@/features/shopping/components/product-detail-page';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const ProductDetail = () => {
  return (
    <ContentLayout title="Detail">
      <ProductDetailPage />
    </ContentLayout>
  );
};

export default ProductDetail;
