"use client";

import { useState } from "react";

export default function Units({ onUnitsChange }) {
  const [open, setOpen] = useState(false);

  // State cho các lựa chọn
  const [temperature, setTemperature] = useState("celsius");
  const [windSpeed, setWindSpeed] = useState("kmh");
  const [precipitation, setPrecipitation] = useState("mm");
  const [isImperial, setIsImperial] = useState(false);

  // Gửi units lên parent component khi có thay đổi
  const notifyUnitsChange = (newUnits) => {
    if (onUnitsChange) {
      onUnitsChange(newUnits);
    }
  };

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
          <div className="absolute right-0 top-full w-full h-3 bg-transparent "></div>
          <div className="absolute right-0 mt-3 w-60 rounded-xl shadow-lg bg-[#25253e] p-3 text-sm z-10 border-[1px] border-gray-700 ">
            <div className="px-1">
              <div>
                <p
                  className="text-white py-2 cursor-pointer hover:bg-[#2f2f49] hover:-mx-2 hover:px-2 hover:rounded-lg "
                  onClick={() => {
                    const newIsImperial = !isImperial;
                    setIsImperial(newIsImperial);

                    // Tự động chuyển đổi tất cả units khi chuyển Metric/Imperial
                    let newTemperature, newWindSpeed, newPrecipitation;
                    if (newIsImperial) {
                      newTemperature = "fahrenheit";
                      newWindSpeed = "mph";
                      newPrecipitation = "in";
                    } else {
                      newTemperature = "celsius";
                      newWindSpeed = "kmh";
                      newPrecipitation = "mm";
                    }

                    setTemperature(newTemperature);
                    setWindSpeed(newWindSpeed);
                    setPrecipitation(newPrecipitation);

                    // Gửi units mới lên parent
                    notifyUnitsChange({
                      temperature: newTemperature,
                      windSpeed: newWindSpeed,
                      precipitation: newPrecipitation,
                      isImperial: newIsImperial,
                    });
                  }}
                >
                  {isImperial ? "Switch to Metric" : "Switch to Imperial"}
                </p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-300 text-xs py-2 ">Temperature</p>
                  <div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        temperature === "celsius"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setTemperature("celsius");
                        notifyUnitsChange({
                          temperature: "celsius",
                          windSpeed,
                          precipitation,
                          isImperial,
                        });
                      }}
                    >
                      <span>Celsius (°C)</span>
                      {temperature === "celsius" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3 animate-[scale_0.3s_ease-out]"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        temperature === "fahrenheit"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setTemperature("fahrenheit");
                        notifyUnitsChange({
                          temperature: "fahrenheit",
                          windSpeed,
                          precipitation,
                          isImperial,
                        });
                      }}
                    >
                      <span>Fahrenheit (°F)</span>
                      {temperature === "fahrenheit" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t-[1px] border-gray-600 px-2">
                  <p className="text-gray-300 text-xs py-2 ">Wind Speed</p>
                  <div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        windSpeed === "kmh"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setWindSpeed("kmh");
                        notifyUnitsChange({
                          temperature,
                          windSpeed: "kmh",
                          precipitation,
                          isImperial,
                        });
                      }}
                    >
                      <span>km/h</span>
                      {windSpeed === "kmh" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        windSpeed === "mph"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setWindSpeed("mph");
                        notifyUnitsChange({
                          temperature,
                          windSpeed: "mph",
                          precipitation,
                          isImperial,
                        });
                      }}
                    >
                      <span>mph</span>
                      {windSpeed === "mph" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t-[1px] border-gray-600 px-2">
                  <p className="text-gray-300 text-xs py-2 ">Precipitation</p>
                  <div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        precipitation === "mm"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setPrecipitation("mm");
                        notifyUnitsChange({
                          temperature,
                          windSpeed,
                          precipitation: "mm",
                          isImperial,
                        });
                      }}
                    >
                      <span>Millimeters (mm)</span>
                      {precipitation === "mm" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                    <div
                      className={`text-white text-sm py-2 cursor-pointer flex items-center justify-between ${
                        precipitation === "in"
                          ? "bg-[#2f2f49] -mx-2 px-2 rounded-lg"
                          : ""
                      }`}
                      onClick={() => {
                        setPrecipitation("in");
                        notifyUnitsChange({
                          temperature,
                          windSpeed,
                          precipitation: "in",
                          isImperial,
                        });
                      }}
                    >
                      <span>Inches (in)</span>
                      {precipitation === "in" && (
                        <img
                          src="/icon-checkmark.svg"
                          alt="checkmark"
                          className="w-3.5 h-3"
                          style={{
                            animation: "scaleIn 0.3s ease-out",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
