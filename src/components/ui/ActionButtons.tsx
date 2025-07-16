import React from 'react';
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import './ActionButtons.scss';

export interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  viewTitle?: string;
  editTitle?: string;
  deleteTitle?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ActionButtons = ({
  onView,
  onEdit,
  onDelete,
  showView = true,
  showEdit = true,
  showDelete = true,
  viewTitle = '상세보기',
  editTitle = '편집',
  deleteTitle = '삭제',
  className = '',
  size = 'md',
}: ActionButtonsProps) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 14;
      case 'lg':
        return 20;
      default:
        return 16;
    }
  };

  const iconSize = getIconSize();

  return (
    <div className={`action-buttons ${size} ${className}`}>
      {showView && onView && (
        <button
          className="action-btn view"
          onClick={onView}
          title={viewTitle}
          aria-label={viewTitle}
        >
          <EyeOpenIcon width={iconSize} height={iconSize} />
        </button>
      )}

      {showEdit && onEdit && (
        <button
          className="action-btn edit"
          onClick={onEdit}
          title={editTitle}
          aria-label={editTitle}
        >
          <Pencil1Icon width={iconSize} height={iconSize} />
        </button>
      )}

      {showDelete && onDelete && (
        <button
          className="action-btn delete"
          onClick={onDelete}
          title={deleteTitle}
          aria-label={deleteTitle}
        >
          <TrashIcon width={iconSize} height={iconSize} />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
