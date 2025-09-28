export default function Search() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <img
            src="/icon-search.svg"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
          />
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-xl pl-10 pr-4 py-3 bg-[#1e1e3f] text-white outline-none rounded-xl"
          />
        </div>
        <button className="px-6 py-3 bg-[#475bd6] text-sm cursor-pointer text-white rounded-lg transition-all duration-300 hover:backdrop-blur-lg hover:bg-opacity-80 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:bg-gradient-to-r hover:from-bg-[#475bd6] hover:to-bg-[#5366e7]">
          Search
        </button>
      </div>
    </div>
  );
}
