import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';

import { Header } from '../../../components/layouts/header';
import AdminDashboard from '../../../features/admin/components/admin-dashboard';
import Footer from '../landing/footer';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const AdminRoute = () => {
  return (
    <>
      <Header />
      <AdminDashboard />;
      <Footer />
    </>
  );
};

export default AdminRoute;
