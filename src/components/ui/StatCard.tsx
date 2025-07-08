import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

import { StatCardProps } from '@/types/components/ui.types';

import '@/components/ui/StatCard.scss';

function StatCard({
  title,
  value,
  change,
  trend,
  icon,
  color,
  className = '',
}: StatCardProps) {
  return (
    <div className={`stat-card ${color} ${className}`}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        <div className={`stat-trend ${trend}`}>
          {trend === 'up' ? (
            <ArrowUpIcon width={16} height={16} />
          ) : (
            <ArrowDownIcon width={16} height={16} />
          )}
          <span>{change}</span>
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
}

export default StatCard;
