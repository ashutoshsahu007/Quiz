import React from "react";
import { Link } from "react-router-dom";

const Card2 = ({ index }) => {
  return (
    <div>
      <Link to="/start">
        <div
          key={index}
          className="min-w-[270px]   flex-col  overflow-hidden flex items-start justify-center rounded-lg shrink-0 shadow-sm"
        >
          <img
            src={`section2/img${index + 1}.png`}
            alt="image not found"
            className="w-full h-full object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-400 ease-in-out"
          />
          <p className=" font-[700] text-lg text-gray-700 mb-4 mt-4 pl-4">
            General Knowledge {index + 1}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card2;
