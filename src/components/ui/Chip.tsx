import React from 'react';

import '@/components/ui/Chip.scss';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'green' | 'blue' | 'gray' | 'orange' | 'red';
  removable?: boolean;
  onRemove?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Chip = React.forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      color,
      removable = false,
      onRemove,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    // color prop이 있으면 그것을 사용하고, 없으면 variant에 따라 color 결정
    const chipColor = color || getColorFromVariant(variant);

    const classes = [
      'chip',
      `chip--${variant}`,
      `chip--${size}`,
      `chip--${chipColor}`,
      removable && 'chip--removable',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.();
    };

    return (
      <span className={classes} ref={ref} {...props}>
        {leftIcon && (
          <span className="chip__icon chip__icon--left">{leftIcon}</span>
        )}
        <span className="chip__content">{children}</span>
        {rightIcon && !removable && (
          <span className="chip__icon chip__icon--right">{rightIcon}</span>
        )}
        {removable && (
          <button
            className="chip__remove"
            onClick={handleRemove}
            type="button"
            aria-label="Remove"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

function getColorFromVariant(variant: string): string {
  switch (variant) {
    case 'primary':
      return 'blue';
    case 'secondary':
      return 'gray';
    case 'success':
      return 'green';
    case 'warning':
      return 'orange';
    case 'danger':
      return 'red';
    case 'info':
      return 'blue';
    default:
      return 'blue';
  }
}

Chip.displayName = 'Chip';

export default Chip;
