"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DailyForecast({ weather }) {
  const loading = !weather?.daily;

  const { time, temperature_2m_max, temperature_2m_min, weather_code } =
    weather?.daily || {};

  function getWeatherIcon(code) {
    if ([0].includes(code)) return "icon-sunny.webp"; // Clear sky
    if ([1].includes(code)) return "icon-partly-cloudy.webp"; // Mainly clear
    if ([2, 3].includes(code)) return "icon-overcast.webp"; // Cloudy/Overcast
    if ([45, 48].includes(code)) return "icon-fog.webp"; // Fog
    if ([51, 53, 55].includes(code)) return "icon-drizzle.webp"; // Drizzle
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "icon-rain.webp"; // Rain
    if ([66, 67].includes(code)) return "icon-rain.webp"; // Freezing rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "icon-snow.webp"; // Snow
    if ([95, 96, 99].includes(code)) return "icon-storm.webp"; // Thunderstorm
    return "icon-sunny.webp"; // fallback
  }

  const daysToShow = loading ? Array(7).fill(null) : time;

  return (
    <div>
      <a className="text-xl">Daily Forecast</a>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 text-white mt-4">
        {daysToShow.map((day, idx) => {
          const date = !loading ? new Date(day) : null;
          const dayName = !loading
            ? date.toLocaleDateString("en-US", { weekday: "short" })
            : null;

          return (
            <div
              key={idx}
              className="bg-[#1e1e3f] rounded-xl p-4 md:p-2 lg:p-4 flex flex-col items-center border-[1px] border-gray-700"
            >
              {/* Day name */}
              <p className="text-lg font-medium text-center">
                {loading ? (
                  <Skeleton
                    width={40}
                    height={20}
                    baseColor="#2a2a4a"
                    highlightColor="#3b3b5c"
                  />
                ) : (
                  dayName
                )}
              </p>

              {/* Weather icon */}
              {loading ? (
                <Skeleton
                  circle
                  width={48}
                  height={48}
                  baseColor="#2a2a4a"
                  highlightColor="#3b3b5c"
                  className="my-4"
                />
              ) : (
                <img
                  src={`/${getWeatherIcon(weather_code[idx])}`}
                  alt="weather"
                  className="w-12 h-12 my-4"
                />
              )}

              {/* Temperature */}
              <div className="flex justify-between w-full text-sm">
                {loading ? (
                  <>
                    <Skeleton
                      width={30}
                      height={15}
                      baseColor="#2a2a4a"
                      highlightColor="#3b3b5c"
                    />
                    <Skeleton
                      width={30}
                      height={15}
                      baseColor="#2a2a4a"
                      highlightColor="#3b3b5c"
                    />
                  </>
                ) : (
                  <>
                    <span className="text-start">
                      {Math.round(temperature_2m_max[idx])}°
                    </span>
                    <span className="text-end">
                      {Math.round(temperature_2m_min[idx])}°
                    </span>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
