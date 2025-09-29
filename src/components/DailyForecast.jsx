"use client";

export default function DailyForecast() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <a className="text-xl">Daily Forecast</a>
      <div className="grid grid-cols-3 md:grid-cols-7 gap-4 text-white mt-4">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e3f] rounded-xl p-4 md:p-2 lg:p-4 flex flex-col items-center border-[1px] border-gray-700"
          >
            <p className="text-lg font-medium text-center">{day}</p>

            <img
              src="/icon-sunny.webp"
              alt="weather"
              className="w-12 h-12 my-4"
            />

            <div className="flex justify-between w-full text-sm">
              <span className="text-start">25°</span>
              <span className="text-end">22°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
