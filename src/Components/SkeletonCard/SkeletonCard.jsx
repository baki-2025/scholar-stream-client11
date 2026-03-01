import React from "react";

const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-md rounded-xl overflow-hidden animate-pulse">
      <div className="skeleton h-48 w-full"></div>

      <div className="p-4 space-y-3">
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;