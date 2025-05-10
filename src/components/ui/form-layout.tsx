
import React from 'react';
import { cn } from '@/lib/utils';

interface FormLayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent) => void;
}

export const FormLayout: React.FC<FormLayoutProps> = ({
  title,
  description,
  children,
  className,
  onSubmit,
}) => {
  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
      {description && <p className="text-gray-500 mb-6">{description}</p>}
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </div>
  );
};
