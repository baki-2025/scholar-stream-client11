import React from "react";

const SkeletonCard = React.memo(() => {
  return (
    <div className="card bg-base-100 shadow-lg p-4 space-y-4 animate-pulse">
      {/* Image */}
      <div className="h-40 w-full bg-gray-300 rounded-lg"></div>

      {/* Title */}
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>

      {/* Sub text */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>

      {/* Button */}
      <div className="h-8 bg-gray-300 rounded w-1/3 mt-4"></div>
    </div>
  );
});

export default SkeletonCard;