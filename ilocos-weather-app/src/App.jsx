import React, { useEffect, useState } from "react";
import LocationSelector from "./components/LocationSelector";
import WeatherCard from "./components/WeatherCard";
import { locations } from "./data/locations";
import { weatherCodeMap } from "./data/weathercode";

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

      const nowTimestamp = new Date(data.current_weather.time).getTime();
      let index = -1;

       // Iterate through hourly times to find the latest time that is less than or equal to nowTimestamp
      for (let i = 0; i < data.hourly.time.length; i++) {
        const hourlyTimestamp = new Date(data.hourly.time[i]).getTime();
        console.log(`Checking hourly time: ${data.hourly.time[i]} (timestamp: ${hourlyTimestamp}) against current time: ${nowTimestamp}`);
        if (hourlyTimestamp <= nowTimestamp) {
          index = i;
        } else {
          // Since the hourly.time array is sorted, if we've passed the current time,
          // the previous index is the closest valid one.
          break;
        }
      }

      if (index === -1) {
        index = 0;
        console.warn("Could not find a past or exact hourly data point for current time. Using the first available hourly entry.");
      }  

      // Extract relevant data for the current hour
      const currentTemperature = data.hourly.temperature_2m[index];
      const currentHumidity = data.hourly.relative_humidity_2m[index];
      const currentWindSpeed = data.hourly.wind_speed_10m[index];
      const currentWeatherCode = data.hourly.weather_code[index];

      // Map weather code to a descriptive string
      const weatherType = weatherCodeMap[currentWeatherCode] || 'Unknown';

      // Format date and time for display
      const dateTime = new Date(data.current_weather.time);
      const formattedDate = dateTime.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const formattedTime = dateTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      console.log(dateTime, formattedDate, formattedTime);  
      console.log(lat);
      console.log(lon);
       // Set the processed weather data
      setWeatherData({
        city: selectedLocation, // Use the selected city name
        temperature: currentTemperature,
        humidity: currentHumidity,
        windSpeed: currentWindSpeed,
        weatherType: weatherType,
        date: formattedDate,
        time: formattedTime,
      });

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
    <div className="bg-gradient-to-br from-blue-400 to-purple-800 min-h-screen p-3 flex flex-col items-center">
      <div className="text-center mt-11">
        <h1 className="text-3xl font-bold text-white drop-shadow-sm">Amianan Forecast</h1>
        <h2 className=" text-white mt-2 mb-4 drop-shadow-sm">Ilocos Norte Weather App</h2>
      </div>

      <LocationSelector selected={selectedLocation} onChange={setSelectedLocation} />
      {weatherData && (
        <div className="mt-1">
          <WeatherCard location={locations.find(l => l.name === selectedLocation)} weather={weatherData} />
        </div>
      )}
    </div>
  );
}

export default App;