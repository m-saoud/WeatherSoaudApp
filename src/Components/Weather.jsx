import React, { useState, useEffect } from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "./Weather.css";

import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const API_KEY = "7ec2036af2aa49fb22c35b29bd003d55";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=${API_KEY}`;

    axios
      .get(API_URL)
      .then((resp) => {
        setWeatherData(resp.data);
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });
  }, []);

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01":
        return <WiDaySunny />;
      case "02":
      case "03":
      case "04":
        return <WiCloudy />;
      case "09":
      case "10":
        return <WiRain />;
      case "11":
        return <WiThunderstorm />;
      case "13":
        return <WiSnow />;
      case "50":
        return <WiFog />;
      default:
        return null;
    }
  };

    return (
        <div className="weather-container">
          {weatherData ? (
            <div>
              <div className="weather-icon">{getWeatherIcon(weatherData.weather[0].icon.slice(0, 2))}</div>
              <h2>Weather in {weatherData.name}</h2>
              <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      );
      
};

export default Weather;
