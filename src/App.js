import React, { useState, useEffect, useCallback } from "react";
import WeatherChart from "./WeatherChart";

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [input, setInput] = useState("");
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Wrap fetchWeather in useCallback so it doesn't get recreated on every render
  const fetchWeather = useCallback(async (cityName) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error("City not found");
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.list);
    } catch (error) {
      setWeather(null);
      setForecast([]);
      console.error("Error fetching data:", error.message);
    }
  }, [apiKey]);

  // useEffect now depends on city and fetchWeather
  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setCity(input.trim());
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city"
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <button type="submit">Search</button>
      </form>

      {!weather ? (
        <p>Loading weather...</p>
      ) : (
        <div>
          <h2>Current Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && <WeatherChart forecastData={forecast} />}
    </div>
  );
}

export default App;
