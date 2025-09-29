export default function WeatherDetails() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start text-white">
      {/* Feels Like */}
      <div className="bg-[#1e1e3f] rounded-xl px-4 py-5">
        <p className="text-lg opacity-80">Feels Like</p>
        <p className="text-3xl mt-4">22°</p>
      </div>

      {/* Wind */}
      <div className="bg-[#1e1e3f] rounded-xl px-4 py-5">
        <p className="text-lg opacity-80">Wind</p>
        <p className="text-3xl mt-4">15 km/h</p>
      </div>

      {/* Humidity */}
      <div className="bg-[#1e1e3f] rounded-xl px-4 py-5">
        <p className="text-lg opacity-80">Humidity</p>
        <p className="text-3xl mt-4">65%</p>
      </div>

      {/* Precipitation */}
      <div className="bg-[#1e1e3f] rounded-xl px-4 py-5">
        <p className="text-lg opacity-80">Precipitation</p>
        <p className="text-3xl mt-4">0 in</p>
      </div>
    </div>
  );
}
