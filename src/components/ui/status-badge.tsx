
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 
  | 'pending' 
  | 'active' 
  | 'completed' 
  | 'cancelled' 
  | 'available' 
  | 'busy' 
  | 'offline' 
  | 'paid'
  | 'requested'
  | 'in_progress'
  | 'assigned';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'pending':
        return 'bg-warning/20 text-warning-foreground';
      case 'active':
      case 'available':
      case 'paid':
        return 'bg-success/20 text-success-foreground';
      case 'completed':
        return 'bg-primary/20 text-primary';
      case 'cancelled':
        return 'bg-destructive/20 text-destructive';
      case 'busy':
      case 'in_progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'offline':
        return 'bg-gray-100 text-gray-800';
      case 'requested':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={cn(
        'px-2 py-1 rounded text-xs font-medium capitalize',
        getStatusClass(),
        className
      )}
    >
      {status.replace('_', ' ')}
    </span>
  );
};
