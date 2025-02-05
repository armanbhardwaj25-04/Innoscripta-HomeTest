import React from "react";
import "./SkeletonLoader.css";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      {/* Header Skeleton */}
      <div className="skeleton-header"></div>

      {/* Filters Skeleton */}
      <div className="skeleton-filters">
        <div className="skeleton-filter"></div>
        <div className="skeleton-filter"></div>
        <div className="skeleton-filter"></div>
      </div>
      {ArticleSkeletons()}
    </div>
  );
};

export const ArticleSkeletons = () => {
  return (
    <>
      {/* Articles Skeleton */}
      <div className="skeleton-articles">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="skeleton-article">
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonLoader;
