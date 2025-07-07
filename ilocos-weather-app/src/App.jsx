import React, { useEffect, useState } from "react";
import LocationSelector from "./components/LocationSelector";
import WeatherCard from "./components/WeatherCard";
import { locations } from "./data/locations";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0].name);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const res = await fetch(url);
    const data = await res.json();
    setWeatherData(data.current_weather);
  };

  useEffect(() => {
    const loc = locations.find((l) => l.name === selectedLocation);
    if (loc) fetchWeather(loc.lat, loc.lon);
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-indigo-900 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-white">Ilocos Norte Weather App</h1>
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
