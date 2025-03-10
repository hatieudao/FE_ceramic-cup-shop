import { QueryClient } from '@tanstack/react-query';

import { ContentLayout } from '@/components/layouts';

import { Header } from '../../../components/layouts/header';
import AdminDashboard from '../../../features/admin/components/admin-dashboard';
import Footer from '../landing/footer';

export const clientLoader = (queryClient: QueryClient) => async () => {};

const AdminRoute = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Header />
      <AdminDashboard />
    </div>
  );
};

export default AdminRoute;
