import React from "react";
import Card from "../Card/Card";

const HorizontalScroll = () => {
  return (
    <div className="w-[90%] m-auto overflow-x-hidden ">
      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-4">
        Computer Quiz 1
      </h1>
      <div className="flex space-x-3 md:space-x-10 overflow-x-auto scrollbar-hide px-4 py-2">
        {[...Array(5)].map((_, index) => (
          <Card index={index} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
