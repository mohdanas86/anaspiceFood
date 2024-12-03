import React from "react";

const Loader = () => {
  return (
    <div className="flex-col gap-4 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center">
      <div className="w-20 h-20 border-4 border-transparent text-[--primary-color] text-4xl animate-spin flex items-center justify-center border-t-[--primary-color] rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-[--secondary-color] text-2xl animate-spin flex items-center justify-center border-t-[--secondary-color] rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
