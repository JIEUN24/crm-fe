import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import '@/components/ui/Pagination.scss';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={`pagination ${className}`}>
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={handlePrevious}
        aria-label="이전 페이지"
      >
        <ChevronLeftIcon width={16} height={16} />
        이전
      </button>

      <div className="pagination-info">
        {startIndex}-{endIndex} / {totalItems}
      </div>

      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={handleNext}
        aria-label="다음 페이지"
      >
        다음
        <ChevronRightIcon width={16} height={16} />
      </button>
    </div>
  );
};

export default Pagination;
