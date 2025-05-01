import React from "react";
import { ScoreProvider } from "../../App.jsx";
import { useContext } from "react";

const Header = () => {
  const { score, setScore } = useContext(ScoreProvider);
  return (
    <div className="bg-[#461f7f] sticky top-0 z-[1000]">
      <header class="">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div class="flex justify-between h-16 items-center">
            <div class="flex-shrink-0 text-xl font-bold text-blue-600">
              <img
                src="logo_light.png"
                alt="h"
                class="w-38 inline-block mr-2"
              />
            </div>
            <span class="text-white hover:text-blue-600 border-1 border-white py-0.5 px-3 rounded-2xl flex items-center gap-2">
              <img src="coin.png" alt="image not found" className="w-5" />
              <span className="font-bold text-xl text-amber-300">{score}</span>
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
