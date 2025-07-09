import React, { useEffect, useState } from "react";
import LocationSelector from "./components/LocationSelector";
import WeatherCard from "./components/WeatherCard";
import { locations } from "./data/locations";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const [weatherData, setWeatherData] = useState(null);
  
  const fetchWeather = async (lat, lon) => {

    try {

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia/Manila&forecast_days=1&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        // If response is not OK (e.g., 404, 500), throw an error
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Check if hourly data exists
      if (!data.hourly || !data.hourly.time || data.hourly.time.length === 0) {
          displayError("No hourly weather data available for this location.");
          return;
      }

      setWeatherData(data.current_weather);
      console.log(data);

    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError(`Failed to fetch weather data: ${error.message}. Please try again.`);
    }
    

  };

  useEffect(() => {
    const loc = locations.find((l) => l.name === selectedLocation);
    if (loc) fetchWeather(loc.lat, loc.lon);
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-indigo-900 p-6 flex flex-col items-center">
      <div className="text-center mt-11">
        <h1 className="text-3xl font-bold text-white">Amianan Forecast</h1>
        <h2 className=" text-white mt-2 mb-4 ">Ilocos Norte Weather App</h2>
      </div>
      
      <LocationSelector selected={selectedLocation} onChange={setSelectedLocation} />
      {weatherData && (
        <div className="mt-6">
          <WeatherCard location={locations.find(l => l.name === selectedLocation)} weather={weatherData} />
        </div>
      )}
    </div>
  );
}

export default App;
