"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Units from "@/components/Units";
import Search from "@/components/Search";
import Main from "@/components/Main";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import { getWeather } from "@/services/searchService";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [units, setUnits] = useState({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
    isImperial: false,
  });

  const handleUnitsChange = useCallback((newUnits) => {
    setUnits(newUnits);
  }, []);

  // Gọi lại API khi units thay đổi và đã có location
  useEffect(() => {
    const fetchWeatherWithNewUnits = async () => {
      if (location.lat && location.lon) {
        try {
          const weatherData = await getWeather(
            location.lat,
            location.lon,
            units
          );
          setWeather(weatherData);
        } catch (error) {
          console.error("Error fetching weather with new units:", error);
        }
      }
    };

    fetchWeatherWithNewUnits();
  }, [units, location.lat, location.lon]);

  
  useEffect(() => {
    if (!location.lat && !location.lon && !weather) {
      setLocation({
        city: "Thành phố Hồ Chí Minh",
        country: "Việt Nam",
        lat: 10.8231,
        lon: 106.6297,
      });
    }
  }, [location.lat, location.lon, weather, setLocation]);

  return (
    <div className="font-dmsans bg-[#01012b] text-white custom-scrollbar">
      <div className="px-8 pb-20 sm:px-20 py-10">
        <div className="space-y-8">
          <header className="flex items-center justify-between">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={80}
              style={{ width: "auto", height: "auto" }}
            />
            <Units onUnitsChange={handleUnitsChange} />
          </header>

          <h1 className="text-6xl font-bold text-white text-center sm:py-14 py-6 font-bricolage">
            How&apos;s the sky looking today?
          </h1>

          <div className="flex sm:justify-center sm:pb-8 w-full">
            <Search
              setWeather={setWeather}
              setLocation={setLocation}
              units={units}
            />
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            <div className="col-span-2 grid grid-rows-[2fr_1fr] gap-6">
              <div>
                <Main weather={weather} location={location} units={units} />
              </div>

              <div>
                <WeatherDetails weather={weather} units={units} />
              </div>

              <div>
                <DailyForecast weather={weather} units={units} />
              </div>
            </div>

            <div>
              <HourlyForecast weather={weather} units={units} />
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            <div>
              <Main weather={weather} location={location} units={units} />
            </div>
            <div>
              <WeatherDetails weather={weather} units={units} />
            </div>

            <div>
              <DailyForecast weather={weather} units={units} />
            </div>

            <div>
              <HourlyForecast weather={weather} units={units} />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-8">
        <div className="attribution text-center text-sm text-gray-600">
          Coded by
          <a
            href="https://huynh.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Nguyen Huu Huynh
          </a>
          .
        </div>
      </footer>
    </div>
  );
}
