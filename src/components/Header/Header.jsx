import React from "react";

const Header = () => {
  return (
    <div className="bg-[#461f7f]">
      <header class="shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16 items-center">
            {/* <!-- Logo --> */}
            <div class="flex-shrink-0 text-xl font-bold text-blue-600">
              <img
                src="logo_light.png"
                alt="h"
                class="w-34 inline-block mr-2"
              />
            </div>

            {/* <!-- Hamburger Button (mobile) --> */}
            <div class="md:hidden">
              <button id="menu-toggle" class="text-gray-700 focus:outline-none">
                <svg
                  class="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Navigation Links --> */}
            <nav class="hidden md:flex space-x-4">
              <a
                href="#"
                class="text-white hover:text-blue-600 font-black text-2xl"
              >
                Ashutosh Kumar
              </a>
              <a
                href="#"
                class="text-white hover:text-blue-600 border-1 border-white p-2"
              >
                <span>
                  <img src="coin.png" alt="image not found" className="w-4" />
                </span>
              </a>
            </nav>
          </div>
        </div>

        {/* <!-- Mobile Menu --> */}
        <div id="mobile-menu" class="md:hidden hidden px-4 pb-4">
          <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" class="block py-2 text-gray-700 hover:text-blue-600">
            About
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
