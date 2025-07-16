import React from 'react';
import { Slot } from '@radix-ui/react-slot';

import '@/components/ui/Button.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  design?: 'modern' | 'classic'; // 디자인 스타일 선택
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      design = 'modern',
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    const classes = [
      'btn',
      `btn--${variant}`,
      `btn--${size}`,
      `btn--${design}`,
      loading && 'btn--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isDisabled = disabled || loading;

    return (
      <Comp className={classes} ref={ref} disabled={isDisabled} {...props}>
        {loading && (
          <span className="btn__spinner">
            <svg
              className="btn__spinner-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
        {leftIcon && !loading && (
          <span className="btn__icon btn__icon--left">{leftIcon}</span>
        )}
        <span className="btn__content">{children}</span>
        {rightIcon && !loading && (
          <span className="btn__icon btn__icon--right">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;
