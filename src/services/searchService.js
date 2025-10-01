import { NOMINATIM_BASE_URL, WEATHER_BASE_URL } from "@/config/api";

export async function searchLocation(query, limit = 5) {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    addressdetails: 1,
    limit,
  });
  const url = `${NOMINATIM_BASE_URL}/search?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  console.log("searchLocation data:", data); // Log kết quả trả về
  return data;
}

export async function getWeather(lat, lon, units = {}) {
  const {
    temperature = "celsius",
    windSpeed = "kmh",
    precipitation = "mm",
  } = units;

  // Chuyển đổi units cho API
  const tempUnit = temperature === "fahrenheit" ? "fahrenheit" : "celsius";
  const windUnit = windSpeed === "mph" ? "mph" : "kmh";
  const precipUnit = precipitation === "in" ? "inch" : "mm";

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code",
    current:
      "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature,weather_code",
    temperature_unit: tempUnit,
    windspeed_unit: windUnit,
    precipitation_unit: precipUnit,
  });
  const url = `${WEATHER_BASE_URL}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather API error");
  const data = await res.json();
  return data;
}
