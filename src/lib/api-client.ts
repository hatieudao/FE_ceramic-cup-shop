import Axios, { InternalAxiosRequestConfig } from 'axios';

import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';
import { paths } from '@/config/paths';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/constants';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    const accessToken =
      response.headers['access-token'] || response.headers['Access-Token'];
    const refreshToken =
      response.headers['refresh-token'] || response.headers['Refresh-Token'];

    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    }
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      if (!redirectTo) {
        return Promise.resolve({ message: 'None-user' });
      }
      window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
