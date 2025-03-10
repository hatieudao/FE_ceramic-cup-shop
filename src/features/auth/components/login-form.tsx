import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { loginInputSchema, useLogin } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
  onError: (error: any) => void;
};

export const LoginForm = ({ onSuccess, onError }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin({
    onSuccess,
    onError,
  });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="mx-auto w-full max-w-md space-y-8 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your email to sign in to your account
        </p>
      </div>

      <Form
        onSubmit={(values) => {
          login.mutate(values);
        }}
        schema={loginInputSchema}
      >
        {({ register, formState }) => (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10"
                  error={formState.errors['email']}
                  registration={register('email')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="px-10"
                  error={formState.errors['password']}
                  registration={register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              isLoading={login.isPending}
              type="submit"
              className="w-full"
            >
              {login.isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        )}
      </Form>

      <div className="space-y-4 text-center">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            to={paths.auth.register.getHref(redirectTo)}
            className="text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
