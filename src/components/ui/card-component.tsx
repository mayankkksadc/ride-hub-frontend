
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface CardComponentProps {
  title: string;
  description?: string;
  footerContent?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const CardComponent: React.FC<CardComponentProps> = ({ 
  title, 
  description, 
  footerContent, 
  className = '',
  children 
}) => {
  return (
    <Card className={`shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};
