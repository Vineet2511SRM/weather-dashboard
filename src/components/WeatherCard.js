import React from "react";
import "./WeatherCard.css";

function WeatherCard({ city, date, temp, desc, icon, humidity, wind, unit, small }) {
  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windUnit = unit === "metric" ? "m/s" : "mph";

  return (
    <div className={`weather-card ${small ? "small" : ""}`}>
      {city && <h2 className="city">{city}</h2>}
      {date && <p className="date">{new Date(date).toDateString()}</p>}

      <div className="icon-temp">
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={desc}
          />
        )}
        <span className="temp">{Math.round(temp)}{tempUnit}</span>
      </div>

      <p className="desc">{desc}</p>

      {!small && humidity && wind && (
        <p className="details">
          Humidity: {humidity}% | Wind: {wind} {windUnit}
        </p>
      )}
    </div>
  );
}

export default WeatherCard;
