export function formatTemperatureValue(value) {
  if (value === undefined || value === null) return "--";
  return Math.round(value);
}

export function formatWindSpeedValue(value) {
  if (value === undefined || value === null) return "--";
  return Math.round(value);
}

export function formatPrecipitationValue(value) {
  if (value === undefined || value === null) return "--";
  return value.toFixed(1);
}

export function getTemperatureUnit(unit) {
  return unit === "fahrenheit" ? "°F" : "°C";
}

export function getWindSpeedUnit(unit) {
  return unit === "mph" ? "mph" : "km/h";
}

export function getPrecipitationUnit(unit) {
  return unit === "in" ? "in" : "mm";
}

export function formatTemperature(value, unit) {
  if (value === undefined || value === null) return "--";
  const formatted = formatTemperatureValue(value);
  return `${formatted}°`;
}

export function formatWindSpeed(value, unit) {
  if (value === undefined || value === null) return "--";
  const formatted = formatWindSpeedValue(value);
  return `${formatted} ${getWindSpeedUnit(unit)}`;
}

export function formatPrecipitation(value, unit) {
  if (value === undefined || value === null) return "--";
  const formatted = formatPrecipitationValue(value);
  return `${formatted} ${getPrecipitationUnit(unit)}`;
}
