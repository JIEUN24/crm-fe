import { ReactNode } from 'react';

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

export interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  className?: string;
}

export interface InputProps {
  label?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password' | 'tel' | 'search' | 'url';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  id?: string;
  className?: string;
}
