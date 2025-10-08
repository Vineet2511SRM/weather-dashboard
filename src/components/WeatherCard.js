import React from "react";
import "./WeatherCard.css"; // We'll create separate CSS for cleaner styling

function WeatherCard({ city, date, temp, desc, icon, humidity, wind, unit, small }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  // Optional: change background based on weather
  const weatherBg = desc.includes("cloud")
    ? "#dfe6e9"
    : desc.includes("rain")
    ? "#74b9ff"
    : desc.includes("sun")
    ? "#ffeaa7"
    : "#a29bfe";

  return (
    <div
      className={`weather-card ${small ? "small" : ""}`}
      style={{ backgroundColor: small ? "rgba(255,255,255,0.2)" : weatherBg }}
    >
      {city && <h2 className="city">{city}</h2>}
      {date && <p className="date">{new Date(date).toDateString()}</p>}

      <div className="icon-temp">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} />
        <h3 className="temp">{Math.round(temp)}{tempUnit}</h3>
      </div>

      <p className="desc">{desc}</p>

      {!small && (
        <p className="details">
          💧 Humidity: {humidity}% | 🌬️ Wind: {wind} {windUnit}
        </p>
      )}
    </div>
  );
}

export default WeatherCard;
