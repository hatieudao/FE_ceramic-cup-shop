import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { paths } from '@/config/paths';
import { AuthResponse, User } from '@/types/api';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/constants';

import { api } from './api-client';

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await api.get('/auth/me');

  return response.data;
};

const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post('/auth/local/signin', data);
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post('/auth/local/signup', data);
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();
  if (!user?.data) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
