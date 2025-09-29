"use client";

export default function Main() {
  return (
    <div className="relative w-full h-[286px] rounded-2xl overflow-hidden">
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

      {/* Mobile Layout */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-center md:hidden text-white text-center">
        {/* City Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">
            <h1 className="text-2xl font-bold">New York, United States</h1>
          </div>
          <div className="text-base opacity-80">
            <p>Monday, December 23, 2024</p>
          </div>
        </div>

        {/* Weather Info */}
        <div className="flex items-center justify-center gap-4">
          <img src="/icon-rain.webp" alt="weather icon" className="w-20 h-20" />
          <div className="text-center">
            <div className="text-7xl font-bold transform -skew-x-12">20°</div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="absolute inset-0 p-6 hidden md:flex items-center justify-between text-white">
        {/* Left Section - City Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <h1 className="text-3xl font-bold">New York, United States</h1>
          </div>
          <div className="text-base opacity-80">
            <p>Monday, December 23, 2024</p>
          </div>
        </div>

        {/* Right Section - Weather Info */}
        <div className="flex items-center gap-4">
          <img src="/icon-rain.webp" alt="weather icon" className="w-28 h-28" />
          <div className="text-right">
            <div className="text-9xl font-bold transform -skew-x-12">
              22°
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
