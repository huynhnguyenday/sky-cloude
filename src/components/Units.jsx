"use client";

import { useState } from "react";

export default function Units() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-2 px-3 py-2 bg-[#25253e] rounded-md cursor-pointer hover:bg-[#1e1e3f]">
        <img src="/icon-units.svg" alt="units" className="w-5 h-5" />
        <span className="font-medium">Units</span>
        <img
          src="/icon-dropdown.svg"
          alt="dropdown"
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <>
          {/* Cầu nối ẩn để giữ dropdown mở khi di chuột */}
          <div className="absolute right-0 top-full w-full h-3 bg-transparent "></div>
          <div className="absolute right-0 mt-3 w-60 rounded-md shadow-lg bg-[#25253e] p-3 text-sm z-10 border-[1px] border-gray-700 ">
            <p className="font-semibold mb-2">Switch to Imperial/Metric</p>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-xs py-2 ">Temperature</p>
                <div className="space-y-3">
                  <p className="text-white text-sm">Celsius (°C)</p>
                  <p className="text-white text-sm">Fahrenheit (°F)</p>
                </div>
              </div>
              <div className="border-t-[1px] border-gray-600">
                <p className="text-gray-300 text-xs py-2 ">Wind Speed</p>
                <div className="space-y-3">
                  <p className="text-white text-sm">km/h</p>
                  <p className="text-white text-sm">mph</p>
                </div>
              </div>
              <div className="border-t-[1px] border-gray-600">
                <p className="text-gray-300 text-xs py-2 ">Precipitation</p>
                <div className="space-y-3">
                  <p className="text-white text-sm">Millimeters (mm)</p>
                  <p className="text-white text-sm">Inches (in)</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
