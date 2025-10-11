import React, { useState, useEffect } from "react";
import { API_KEY } from "./config";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    localStorage.removeItem("lastCity"); // Clear last city
    setWeather(null);                     // Clear current weather
    setForecast([]);                      // Clear forecast
  }, []);

  useEffect(() => {
    if (weather) fetchWeather(weather.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const fetchWeather = async (cityName = city) => {
    const trimmedCity = cityName.trim();
    if (!trimmedCity) {
      setError("Please enter a city name");
      setWeather(null);
      setForecast([]);
      return;
    }

    try {
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid=${API_KEY}&units=${unit}`
      );
      if (!res.ok) throw new Error("City not found. Try including country code, e.g., London,UK");
      const data = await res.json();
      setWeather(data);
      setError("");
      localStorage.setItem("lastCity", trimmedCity);

      // 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedCity}&appid=${API_KEY}&units=${unit}`
      );
      const forecastData = await forecastRes.json();
      const filtered = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(filtered);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    }
  };

  const toggleUnit = () =>
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));

  return (
    <div className="app">
      <h1>🌤️ Weather Dashboard</h1>

      {/* Search Section */}
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button onClick={() => fetchWeather()}>Search</button>
        <button onClick={toggleUnit}>
          {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Current Weather */}
      {weather && (
        <div className="current-weather">
          <WeatherCard
            city={weather.name}
            temp={weather.main.temp}
            desc={weather.weather[0].description}
            icon={weather.weather[0].icon}
            humidity={weather.main.humidity}
            wind={weather.wind.speed}
            unit={unit}
          />
        </div>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <>
          <h2 className="forecast-title">5-Day Forecast</h2>
          <div className="forecast">
            {forecast.map((item, index) => (
              <WeatherCard
                key={index}
                date={item.dt_txt}
                temp={item.main.temp}
                desc={item.weather[0].description}
                icon={item.weather[0].icon}
                unit={unit}
                small
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
