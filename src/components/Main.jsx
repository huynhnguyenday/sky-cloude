"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatTemperature } from "@/utils/units";

export default function Main({ weather, location, units = {} }) {
  const loading = !weather?.current;

  const { city, country } = location || {};

  const temperature = weather?.current?.temperature_2m;
  const formattedTemp = formatTemperature(temperature, units.temperature);

  const time = weather?.current?.time;

  const formattedDate = time
    ? new Date(time).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  function getWeatherIcon(code) {
    if (!code && code !== 0) return "icon-sunny.webp";

    if ([0].includes(code)) return "icon-sunny.webp"; // Clear sky
    if ([1].includes(code)) return "icon-partly-cloudy.webp"; // Mainly clear
    if ([2, 3].includes(code)) return "icon-overcast.webp"; // Cloudy/Overcast
    if ([45, 48].includes(code)) return "icon-fog.webp"; // Fog
    if ([51, 53, 55].includes(code)) return "icon-drizzle.webp"; // Drizzle
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "icon-rain.webp"; // Rain/Showers
    if ([66, 67].includes(code)) return "icon-rain.webp"; // Freezing rain
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "icon-snow.webp"; // Snow
    if ([95, 96, 99].includes(code)) return "icon-storm.webp"; // Thunderstorm

    return "icon-sunny.webp"; // fallback
  }

  const weatherIcon = getWeatherIcon(weather?.current?.weather_code);

  return (
    <div
      className={`relative w-full h-[286px] rounded-2xl overflow-hidden ${
        loading ? "bg-[#1e1e3f]" : ""
      }`}
    >
      {!loading && (
        <>
          <img
            src="/bg-today-large.svg"
            alt="background"
            className="hidden md:block w-full h-full object-cover"
          />
          <img
            src="/bg-today-small.svg"
            alt="background"
            className="block md:hidden w-full h-full object-cover"
          />
        </>
      )}

      {/* Mobile Layout */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center md:hidden text-white text-center">
        {/* City Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">
            <h1 className="text-2xl font-bold">
              {city && country ? `${city}, ${country}` : "Search a location"}
            </h1>
          </div>
          <div className="text-base opacity-80">
            {loading ? (
              <Skeleton
                width={180}
                height={20}
                baseColor="#2a2a4a"
                highlightColor="#3b3b5c"
                borderRadius={6}
              />
            ) : (
              <p>{formattedDate || "No date available"}</p>
            )}
          </div>
        </div>

        {/* Weather Info */}
        <div className="flex items-center justify-center gap-4">
          {loading ? (
            <Skeleton
              circle
              width={80}
              height={80}
              baseColor="#2a2a4a"
              highlightColor="#3b3b5c"
            />
          ) : (
            <img
              src={`/${weatherIcon}`}
              alt="weather icon"
              className="w-20 h-20"
            />
          )}

          <div className="text-center">
            {loading ? (
              <Skeleton
                width={100}
                height={70}
                baseColor="#2a2a4a"
                highlightColor="#3b3b5c"
              />
            ) : (
              <div className="text-7xl font-bold transform -skew-x-12">
                {formattedTemp}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="absolute inset-0 p-6 hidden md:flex items-center justify-between text-white">
        {/* Left Section - City Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">
              {city && country ? `${city}, ${country}` : "Search a location first."}
            </h1>
          </div>
          <div className="text-base opacity-80">
            {loading ? (
              <Skeleton
                width={220}
                height={20}
                baseColor="#2a2a4a"
                highlightColor="#3b3b5c"
                borderRadius={6}
              />
            ) : (
              <p>{formattedDate || "No date available"}</p>
            )}
          </div>
        </div>

        {/* Right Section - Weather Info */}
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton
              circle
              width={110}
              height={110}
              baseColor="#2a2a4a"
              highlightColor="#3b3b5c"
            />
          ) : (
            <img
              src={`/${weatherIcon}`}
              alt="weather icon"
              className="w-32 h-32 md:w-36 md:h-36"
            />
          )}

          <div className="text-right">
            {loading ? (
              <Skeleton
                width={150}
                height={90}
                baseColor="#2a2a4a"
                highlightColor="#3b3b5c"
              />
            ) : (
              <div className="text-7xl xl:text-9xl font-bold transform -skew-x-12">
                {formattedTemp}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
