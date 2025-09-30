"use client";

import { useState } from "react";
import Image from "next/image";
import Units from "@/components/Units";
import Search from "@/components/Search";
import Main from "@/components/Main";
import WeatherDetails from "@/components/WeatherDetails";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";

export default function Home() {
  const [weather, setWeather] = useState(null); 
  const [location, setLocation] = useState({ city: "", country: "" });

  return (
    <div className="font-dmsans bg-[#01012b] text-white custom-scrollbar">
      <div className="px-8 pb-20 sm:px-20 py-10">
        <div className="space-y-8">
          <header className="flex items-center justify-between">
            <Image src="/logo.svg" alt="Logo" width={200} height={80} />
            <Units />
          </header>

          <h1 className="text-6xl font-bold text-white text-center sm:py-14 py-6 font-bricolage">
            How&apos;s the sky looking today?
          </h1>

          <div className="flex sm:justify-center sm:pb-8 w-full">
            <Search setWeather={setWeather} setLocation={setLocation} />
          </div>

          {/* Desktop/Tablet Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            <div className="col-span-2 grid grid-rows-[2fr_1fr] gap-6">
              <div>
                <Main weather={weather} location={location} />
              </div>

              <div>
                <WeatherDetails weather={weather} />
              </div>

              <div>
                <DailyForecast weather={weather} />
              </div>
            </div>

            <div>
              <HourlyForecast weather={weather} />
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            <div>
              <Main weather={weather} location={location} />
            </div>
            <div>
              <WeatherDetails weather={weather} />
            </div>

            <div>
              <DailyForecast weather={weather} />
            </div>

            <div>
              <HourlyForecast weather={weather} />
            </div>
          </div>
        </div>
      </div>
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-8">
        <div className="attribution text-center text-sm text-gray-600">
          Challenge by
          <a
            href="https://www.frontendmentor.io"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Frontend Mentor
          </a>
          . Coded by
          <a
            href="https://github.com/huynhnguyenday"
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
