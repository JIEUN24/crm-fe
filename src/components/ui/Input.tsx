import React, { useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

import '@/components/ui/Input.scss';

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

function Input({
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  icon,
  showPasswordToggle = false,
  id,
  className = '',
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const shouldShowToggle = type === 'password' && showPasswordToggle;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <div
        className={`input-wrapper ${!icon ? 'no-icon' : ''} ${shouldShowToggle ? 'has-toggle' : ''}`}
      >
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={inputType}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`input ${error ? 'error' : ''} ${!icon ? 'no-icon' : ''}`}
          placeholder={placeholder}
          disabled={disabled}
        />
        {shouldShowToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={handlePasswordToggle}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeClosedIcon width={18} height={18} />
            ) : (
              <EyeOpenIcon width={18} height={18} />
            )}
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Input;
