import React from "react";
import Card from "../Card/Card";

const HorizontalScroll = () => {
  return (
    <div className="w-[90%] m-auto overflow-x-hidden ">
      <div className="flex space-x-10 overflow-x-auto scrollbar-hide px-4 py-2">
        {[...Array(5)].map((_, index) => (
          <Card index={index} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
