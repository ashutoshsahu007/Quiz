import React from "react";

const HorizontalScroll = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 py-2">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="min-w-[200px] h-40 bg-blue-500 text-white flex items-center justify-center rounded-lg shrink-0"
          >
            Item {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
