import { Navigate } from 'react-router';

import { useUser } from './auth';

export const AdminRouteProtected = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();

  if (!user?.data || !user.data?.data?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};
