import { useNavigate } from 'react-router';

import { useNotifications } from '@/components/ui/notifications';

export const handleUnauthorized = (error: any) => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  if (error?.response?.status === 401) {
    addNotification({
      title: 'Authentication Required',
      message: 'Please login to continue',
      type: 'error',
    });

    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    const redirectTo = encodeURIComponent(`${currentPath}${searchParams}`);

    navigate(`/login?redirectTo=${redirectTo}`);
    return true;
  }
  return false;
};
