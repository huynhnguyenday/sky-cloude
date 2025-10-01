"use client";

import { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import "react-loading-skeleton/dist/skeleton.css";
import { searchLocation, getWeather } from "@/services/searchService";

export default function Search({ setWeather, setLocation, units = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [errorAnimData, setErrorAnimData] = useState(null);
  const debounceRef = useRef();

  useEffect(() => {
    let isMounted = true;
    fetch("/wired-outline-1140-error-hover-enlarge.json")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setErrorAnimData(data);
      })
      .catch(() => {
        // ignore loading animation error
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length === 0) {
      setSuggestions([]);
      setIsLoading(false);
      setFetchError(false);
      return;
    }

    // Bật loading ngay khi có input để hiển thị Skeleton trước debounce
    setIsLoading(true);
    setFetchError(false);

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await searchLocation(value, 5);

        const filteredData = data.filter((item) => {
          const city =
            item.address?.city ||
            item.address?.town ||
            item.address?.village ||
            "";
          const country = item.address?.country || "";
          return city && country;
        });

        setSuggestions(filteredData);
        setFetchError(false);
      } catch {
        setSuggestions([]);
        setFetchError(true);
      } finally {
        setIsLoading(false);
      }
    }, 400);
  };

  const handleSelect = async (item) => {
    setSearchValue(item.display_name);
    setIsOpen(false);
    setSuggestions([]);

    const city =
      item.address?.city || item.address?.town || item.address?.village || "";
    const country = item.address?.country || "";
    const lat = item.lat;
    const lon = item.lon;

    setLocation({ city, country, lat, lon });

    try {
      const weatherData = await getWeather(lat, lon, units);
      setWeather(weatherData);
    } catch {
      setWeather(null);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-center">
        <div className="relative flex-1 sm:flex-none sm:max-w-xl">
          <img
            src="/icon-search.svg"
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white"
          />
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-full sm:w-xl pl-10 pr-4 py-3 bg-[#1e1e3f] text-white outline-none rounded-xl"
            value={searchValue}
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            autoComplete="off"
          />

          {isOpen && (
            <div className="px-2 absolute top-full left-0 right-0 mt-2 bg-[#1e1e3f] rounded-xl shadow-lg border border-gray-700 z-10 h-[175px] overflow-y-auto search-scrollbar">
              <div className="p-2">
                {searchValue.trim() !== "" ? (
                  <>
                    {isLoading ? (
                      <div className="space-y-2">
                        <Skeleton
                          count={5}
                          height={20}
                          baseColor="#2f2f49"
                          highlightColor="#3b3b5c"
                          className="rounded"
                        />
                      </div>
                    ) : fetchError ? (
                      <div className="flex flex-col items-center justify-center py-3 gap-2">
                        {errorAnimData ? (
                          <Lottie
                            animationData={errorAnimData}
                            loop
                            autoplay
                            style={{ width: 100, height: 100 }}
                          />
                        ) : (
                          <div className="text-white">
                            Something went wrong. Try again.
                          </div>
                        )}
                        <div className="text-white text-base">
                          Unable to load data.
                        </div>
                      </div>
                    ) : (
                      <>
                        {suggestions.map((item) => (
                          <div
                            key={item.place_id}
                            className="text-white py-2 cursor-pointer hover:bg-[#2f2f49] hover:-mx-2 hover:px-2 hover:rounded-lg"
                            onClick={() => handleSelect(item)}
                          >
                            {item.display_name}
                          </div>
                        ))}
                        {suggestions.length === 0 && (
                          <div className="text-gray-400 py-2">
                            No results found.
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>

        <button className="w-full sm:w-auto px-6 py-3 bg-[#475bd6] text-base cursor-pointer text-white rounded-xl transition-all duration-300 hover:backdrop-blur-lg hover:bg-opacity-80 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105 hover:bg-gradient-to-r hover:from-[#475bd6] hover:to-[#5366e7]">
          Search
        </button>
      </div>
    </div>
  );
}
