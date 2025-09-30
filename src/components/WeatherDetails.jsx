"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WeatherDetails({ weather }) {
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
      value:
        apparent_temperature !== undefined
          ? `${Math.round(apparent_temperature)}°`
          : null,
      skeletonWidth: 80,
    },
    {
      label: "Wind",
      value:
        wind_speed_10m !== undefined
          ? `${Math.round(wind_speed_10m)} km/h`
          : null,
      skeletonWidth: 100,
    },
    {
      label: "Humidity",
      value:
        relative_humidity_2m !== undefined
          ? `${Math.round(relative_humidity_2m)}%`
          : null,
      skeletonWidth: 70,
    },
    {
      label: "Precipitation",
      value: precipitation !== undefined ? `${precipitation} mm` : null,
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
              <p className="md:text-2xl text-3xl">{item.value ?? "--"}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
