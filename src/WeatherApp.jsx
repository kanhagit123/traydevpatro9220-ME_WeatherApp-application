import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY ="bbeca987f104471684a81354250609"; // Replace with your WeatherAPI key

  const handleSearch = async () => {
    if (!city) return;
    setLoading(true);
    setWeatherData(null);

    try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        );
      
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
      
        const data = await response.json();
      
        if (data.error) {
          throw new Error(data.error.message);
        }
      
        setWeatherData({
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          condition: data.current.condition.text,
          wind: data.current.wind_kph,
        });
      } catch (error) {
        alert("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
      
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">Temperature: {weatherData.temp}°C</div>
          <div className="weather-card">Humidity: {weatherData.humidity}%</div>
          <div className="weather-card">Condition: {weatherData.condition}</div>
          <div className="weather-card">Wind Speed: {weatherData.wind} kph</div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
