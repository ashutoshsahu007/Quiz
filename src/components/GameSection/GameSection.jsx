import React from "react";

const GameSection = () => {
  return (
    <div>
      {/* Join Game Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-purple-900 rounded-2xl p-10">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Enter Game Code"
                className="flex-grow bg-white text-black rounded-md px-4 py-2"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium whitespace-nowrap">
                Join Game
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GameSection;
