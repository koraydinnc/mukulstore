"use client";

import React from 'react';

const ProductSkeleton = ({ 
  count = 4, 
  className = "",
  showGrid = true,
  gridCols = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
}) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[4/5] bg-gray-200 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="bg-gray-200 h-3 rounded w-full"></div>
          <div className="bg-gray-200 h-3 rounded w-2/3"></div>
        </div>
        
        {/* Price */}
        <div className="bg-gray-200 h-5 rounded w-1/2"></div>
        
        {/* Sizes */}
        <div className="flex gap-2">
          <div className="bg-gray-200 h-6 w-6 rounded"></div>
          <div className="bg-gray-200 h-6 w-6 rounded"></div>
          <div className="bg-gray-200 h-6 w-6 rounded"></div>
        </div>
        
        {/* Button */}
        <div className="bg-gray-200 h-9 rounded-lg"></div>
      </div>
    </div>
  );

  if (!showGrid) {
    return <SkeletonCard />;
  }

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ProductSkeleton; 