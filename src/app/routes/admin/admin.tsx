import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';

import { Header } from '../../../components/layouts/header';
import Footer from '../landing/footer';

import AdminDashboard from './admin-dashboard';

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
