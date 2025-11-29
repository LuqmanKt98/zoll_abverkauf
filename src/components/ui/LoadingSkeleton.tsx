'use client';

import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'rectangle' | 'product';
  count?: number;
  className?: string;
}

export const LoadingSkeleton = ({ variant = 'rectangle', count = 1, className = '' }: LoadingSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const getSkeletonClass = () => {
    const baseClass = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%]';
    
    switch (variant) {
      case 'card':
        return `${baseClass} rounded-lg h-64 w-full`;
      case 'text':
        return `${baseClass} rounded h-4 w-full`;
      case 'circle':
        return `${baseClass} rounded-full h-12 w-12`;
      case 'product':
        return `${baseClass} rounded-lg h-80 w-full`;
      default:
        return `${baseClass} rounded h-32 w-full`;
    }
  };

  if (variant === 'product') {
    return (
      <div className={`space-y-4 ${className}`}>
        {skeletons.map((i) => (
          <div key={i} className="bg-white border border-border rounded-lg p-4 space-y-3">
            <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded-lg h-48 w-full" />
            <div className="space-y-2">
              <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-6 w-3/4" />
              <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-4 w-1/2" />
              <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-8 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {skeletons.map((i) => (
        <div key={i} className={getSkeletonClass()} />
      ))}
    </div>
  );
};

export const ProductCardSkeleton = () => (
  <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
    <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] h-48 w-full" />
    <div className="p-4 space-y-3">
      <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-6 w-3/4" />
      <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-4 w-1/2" />
      <div className="flex justify-between items-center">
        <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-8 w-24" />
        <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-10 w-32" />
      </div>
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
    <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] h-64 w-full" />
    <div className="p-6 space-y-3">
      <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-8 w-2/3" />
      <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-4 w-full" />
      <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-4 w-5/6" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="flex space-x-4">
        <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-12 flex-1" />
        <div className="animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] rounded h-12 w-32" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;

