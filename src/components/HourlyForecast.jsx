"use client";

import { useState } from "react";

export default function HourlyForecast() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hours = [
    { time: "1 AM", temp: "22°", icon: "/icon-sunny.webp" },
    { time: "2 AM", temp: "21°", icon: "/icon-snow.webp" },
    { time: "3 AM", temp: "20°", icon: "/icon-storm.webp" },
    { time: "4 AM", temp: "20°", icon: "/icon-rain.webp" },
    { time: "5 AM", temp: "19°", icon: "/icon-overcast.webp" },
    { time: "6 AM", temp: "19°", icon: "/icon-partly-cloudy.webp" },
    { time: "7 AM", temp: "20°", icon: "/icon-storm.webp" },
  ];

  return (
    <div className="bg-[#1e1e3f] rounded-2xl p-6 text-white h-[680px] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative">
        <h2 className="text-lg font-semibold">Hourly forecast</h2>

        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#2a2a4f] px-3 py-1 rounded-lg hover:bg-[#38386b]"
          >
            <span className="p-1">{selectedDay}</span>
            <img
              src="/icon-dropdown.svg"
              alt="dropdown"
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 p-2 bg-[#1e1e3f] rounded-xl shadow-lg overflow-hidden z-20 border-[1px] border-gray-700">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-xl cursor-pointer ${
                    selectedDay === day ? "bg-[#38386b]" : "hover:bg-[#2f2f49]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
        {hours.map((h, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-[#2a2a4f] rounded-xl border border-gray-700 px-4 py-3"
          >
            {/* Left side: icon + time */}
            <div className="flex items-center">
              <img src={h.icon} alt="weather" className="w-14 h-14" />
              <span className="text-2xl p-2">{h.time}</span>
            </div>

            {/* Right side: temperature */}
            <span className="text-xl">{h.temp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
