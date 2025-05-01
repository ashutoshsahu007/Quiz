import React from "react";
import { Link } from "react-router-dom";

const Card = ({ index }) => {
  return (
    <div>
      <Link to="/quiz">
        <div
          key={index}
          className="min-w-[270px]   flex-col  flex items-center justify-center rounded-lg shrink-0 shadow-sm"
        >
          <img
            src={`section1/img${index + 1}.png`}
            alt="image not found"
            className="w-full h-full object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-400 ease-in-out"
          />
          <p className=" font-[700] text-lg text-gray-700 mb-4 mt-4">
            Computer Application Quiz {index + 1}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
