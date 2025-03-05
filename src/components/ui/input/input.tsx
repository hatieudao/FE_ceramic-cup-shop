import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`h-10 w-full rounded-md border px-3 py-2 ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
