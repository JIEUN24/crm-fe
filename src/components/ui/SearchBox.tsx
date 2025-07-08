import React from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import '@/components/ui/SearchBox.scss';

export interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const SearchBox = ({
  value,
  onChange,
  placeholder = '검색...',
  disabled = false,
  className = '',
}: SearchBoxProps) => {
  return (
    <div className={`search-box ${className} ${disabled ? 'disabled' : ''}`}>
      <MagnifyingGlassIcon width={18} height={18} className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="search-input"
      />
    </div>
  );
};

export default SearchBox;
