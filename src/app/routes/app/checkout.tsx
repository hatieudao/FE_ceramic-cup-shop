import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';

import CheckoutPage from '../../../features/checkout/components/checkout-page';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const CheckoutRoute = () => {
  return (
    <ContentLayout title="Checkout">
      <CheckoutPage />
    </ContentLayout>
  );
};

export default CheckoutRoute;
