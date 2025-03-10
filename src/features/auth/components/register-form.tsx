import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import * as React from 'react';
import { Link, useSearchParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Form, Input, Label } from '@/components/ui/form';
import { paths } from '@/config/paths';
import { RegisterInput, registerInputSchema, useRegister } from '@/lib/auth';

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleSubmit = (values: RegisterInput) => {
    console.log('Form submitted with values > :', values);
    registering.mutate(values);
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-8 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your information to create an account
        </p>
      </div>

      <Form onSubmit={handleSubmit} schema={registerInputSchema}>
        {({ register, formState }) => (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  className="pl-10"
                  placeholder="John"
                  error={formState.errors['name']}
                  registration={register('name')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="m@example.com"
                  error={formState.errors['email']}
                  registration={register('email')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 size-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
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
              isLoading={registering.isPending}
              type="submit"
              className="w-full disabled:opacity-50"
              disabled={registering.isPending}
            >
              {registering.isPending ? 'Creating account...' : 'Create account'}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link
                  to={paths.auth.login.getHref(redirectTo)}
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};
