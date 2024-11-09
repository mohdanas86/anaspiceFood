import React from "react";

const SquareSkeleton = () => {
  return (
    <div className="flex w-auto flex-col gap-4 m-2">
      <div className="skeleton h-32 lg:h-44 w-full"></div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-[85%]"></div>
          <div className="skeleton h-4 w-[55%]"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = () => {
  return (
    <>
      {/* desktop */}
      <div className="w-full lg:grid hidden gap-4 grid-cols-2 lg:grid-cols-4">
        <SquareSkeleton />
        <SquareSkeleton />
        <SquareSkeleton />
        <SquareSkeleton />
      </div>
      {/* phone */}
      <div className="w-full grid lg:hidden gap-4 grid-cols-2 lg:grid-cols-4">
        <SquareSkeleton />
        <SquareSkeleton />
      </div>
    </>
  );
};

export default SkeletonGrid;
