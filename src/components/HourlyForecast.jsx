"use client";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function HourlyForecast({ weather }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Today");

  if (!weather?.hourly) {
    // Hiển thị skeleton khi chưa có data
    return (
      <div className="bg-[#1e1e3f] rounded-2xl p-6 text-white h-[685px] flex flex-col relative">
        <div className="flex items-center justify-between mb-4 relative">
          <h2 className="text-xl">Hourly forecast</h2>
          <Skeleton
            width={100}
            height={30}
            baseColor="#2a2a4f"
            highlightColor="#38386b"
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
          {[...Array(7)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#2a2a4f] rounded-xl border border-gray-700 px-4 py-3"
            >
              {/* Left side: icon + time */}
              <div className="flex items-center gap-3">
                <Skeleton
                  circle
                  width={56}
                  height={56}
                  baseColor="#38386b"
                  highlightColor="#4a4a7f"
                />
                <Skeleton
                  width={60}
                  height={25}
                  baseColor="#38386b"
                  highlightColor="#4a4a7f"
                />
              </div>
              {/* Right side: temp */}
              <Skeleton
                width={40}
                height={25}
                baseColor="#38386b"
                highlightColor="#4a4a7f"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { time, temperature_2m, weather_code } = weather.hourly;

  const groupedByDay = time.reduce((acc, t, idx) => {
    const date = new Date(t);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    if (!acc[dayName]) acc[dayName] = [];
    acc[dayName].push({
      time: date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      }),
      temp: `${Math.round(temperature_2m[idx])}°`,
      icon: getWeatherIcon(weather_code[idx]),
    });
    return acc;
  }, {});

  const days = Object.keys(groupedByDay);
  const currentDay = selectedDay === "Today" ? days[0] : selectedDay;
  const hours = groupedByDay[currentDay] || [];

  function getWeatherIcon(code) {
    if ([0].includes(code)) return "/icon-sunny.webp";
    if ([1].includes(code)) return "/icon-partly-cloudy.webp";
    if ([2, 3].includes(code)) return "/icon-overcast.webp";
    if ([45, 48].includes(code)) return "/icon-fog.webp";
    if ([51, 53, 55].includes(code)) return "/icon-drizzle.webp";
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "/icon-rain.webp";
    if ([66, 67].includes(code)) return "/icon-rain.webp";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "/icon-snow.webp";
    if ([95, 96, 99].includes(code)) return "/icon-storm.webp";
    return "/icon-sunny.webp";
  }

  return (
    <div className="bg-[#1e1e3f] rounded-2xl p-6 text-white h-[685px] flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 relative">
        <h2 className="text-lg md:text-xl lg:text-xl">
          Hourly forecast
        </h2>

        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#2a2a4f] px-3 py-1 rounded-lg hover:bg-[#38386b]"
          >
            <span className="p-1">{currentDay}</span>
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
                    currentDay === day ? "bg-[#38386b]" : "hover:bg-[#2f2f49]"
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
