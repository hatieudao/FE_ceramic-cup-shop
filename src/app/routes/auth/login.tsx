import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { useNotifications } from '@/components/ui/notifications';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const queryClient = useQueryClient();
  const { addNotification } = useNotifications();
  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['authenticated-user'] });
          navigate(
            `${redirectTo ? `${redirectTo}` : paths.app.shop.getHref()}`,
            {
              replace: true,
            },
          );
        }}
        onError={(error) => {
          console.log('Error:', error);
          addNotification({
            type: 'error',
            title: 'Error',
            message:
              error?.response?.data || error?.message || 'An error occurred',
          });
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
