import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="pt-[30px] pb-[60px] flex flex-col items-center h-full justify-center bg-purple-700 text-white gap-3">
      <div>
        <img
          className="w-[300px] md:w-[350px] rounded-lg"
          src="quiz.avif"
          alt="image not found"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">Let's Start the Quiz</h1>
      </div>
      <div>
        <p className="text-xl font-semibold text-center p-2">
          Answer these simple questions correctly and earn coins
        </p>
      </div>
      <div className="flex items-center  font-bold text-xl">
        Difficult Level:&nbsp;&nbsp;
        <p className="px-2 py-0.5 rounded-lg bg-[#d0f2e4] text-green-500  text-xl ">
          Easy
        </p>
      </div>
      <div className="text-xl font-bold">10 Questions</div>
      <Link to="/count" className="text-white no-underline">
        <div className="px-[10px] py-[10px] w-[250px] text-center rounded-full border-1 cursor-pointer text-xl bg-[#461f7f] text-white font-medium  ">
          Play again
        </div>
      </Link>
      <Link to="/count" className="text-white no-underline">
        <div className="cursor-pointer w-[250px] ">
          <button className="px-[10px] py-[10px] w-full cursor-pointer rounded-full border-1  bg-[#d15173] text-white font-medium text-xl">
            Play With Friends
          </button>
        </div>
      </Link>
      <Link to="/leaderboard" className="text-white no-underline">
        <div className="px-[10px] py-[10px] w-[250px] text-center rounded-full border-1 bg-pink-600 text-white font-medium text-lg cursor-pointer">
          See Leaderboard
        </div>
      </Link>
    </div>
  );
};

export default Start;
