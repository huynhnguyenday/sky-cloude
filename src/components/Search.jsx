"use client";

import { useState } from "react";

export default function Search() {
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const cities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Ha Noi",
    "Ho Chi Minh City",
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <img
            src="/icon-search.svg"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
          />
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-xl pl-10 pr-4 py-3 bg-[#1e1e3f] text-white outline-none rounded-xl"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />

          {isOpen && (
            <div className="px-2 absolute top-full left-0 right-0 mt-2 bg-[#25253e] rounded-lg shadow-lg border border-gray-700 z-10 h-[175px] overflow-y-auto custom-scrollbar">
              <div className="p-2">
                {cities.map((city, index) => (
                  <div
                    key={index}
                    className="text-white py-2 cursor-pointer hover:bg-[#2f2f49] hover:-mx-2 hover:px-2 hover:rounded-lg"
                    onClick={() => {
                      setSearchValue(city);
                      setIsOpen(false);
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button className="px-6 py-3 bg-[#475bd6] text-sm cursor-pointer text-white rounded-lg transition-all duration-300 hover:backdrop-blur-lg hover:bg-opacity-80 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:bg-gradient-to-r hover:from-bg-[#475bd6] hover:to-bg-[#5366e7]">
          Search
        </button>
      </div>
    </div>
  );
}
