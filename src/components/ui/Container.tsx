import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
}

export const Container = ({
  children,
  className = '',
  size = 'xl',
  padding = true,
}: ContainerProps) => {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  const paddingStyles = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={`w-full mx-auto ${sizeStyles[size]} ${paddingStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Container;

