"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  formatTemperature,
  formatWindSpeed,
  formatPrecipitation,
} from "@/utils/units";

export default function WeatherDetails({ weather, units = {} }) {
  const loading = !weather?.current;

  const {
    apparent_temperature,
    wind_speed_10m,
    relative_humidity_2m,
    precipitation,
  } = weather?.current || {};

  const details = [
    {
      label: "Feels Like",
      value: formatTemperature(apparent_temperature, units.temperature),
      skeletonWidth: 80,
    },
    {
      label: "Wind",
      value: formatWindSpeed(wind_speed_10m, units.windSpeed),
      skeletonWidth: 100,
    },
    {
      label: "Humidity",
      value:
        relative_humidity_2m !== undefined
          ? `${Math.round(relative_humidity_2m)}%`
          : "--",
      skeletonWidth: 70,
    },
    {
      label: "Precipitation",
      value: formatPrecipitation(precipitation, units.precipitation),
      skeletonWidth: 90,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-start text-white">
      {details.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#1e1e3f] rounded-xl px-4 py-5 border border-gray-700"
        >
          {/* Label */}
          {loading ? (
            <Skeleton
              width={90}
              height={20}
              baseColor="#2a2a4a"
              highlightColor="#3b3b5c"
              borderRadius={6}
            />
          ) : (
            <p className="text-lg opacity-80">{item.label}</p>
          )}

          {/* Value */}
          <div className="mt-4">
            {loading ? (
              <Skeleton
                width={item.skeletonWidth}
                height={32}
                baseColor="#2a2a4a"
                highlightColor="#3b3b5c"
                borderRadius={6}
              />
            ) : (
              <p className="md:text-2xl text-3xl">{item.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
