import React from "react";
import Card2 from "../Card2/Card2";

const HorizontalScroll2 = () => {
  return (
    <div className="w-[90%] m-auto overflow-x-hidden ">
      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-4">
        General Knowledge
      </h1>
      <div className="flex space-x-5 md:space-x-10 overflow-x-auto scrollbar-hide px-4 py-2">
        {[...Array(5)].map((_, index) => (
          <Card2 index={index} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll2;
