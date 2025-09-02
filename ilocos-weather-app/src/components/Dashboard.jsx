import React, { useState } from "react";
import weathericon from "../assets/weather.png";
import { Menu, X } from "lucide-react"; // For mobile menu icons
import LocationSelector from "../components/LocationSelector";
import { locations } from "../data/locations";
import { weatherIcons } from "../data/weathericons";

export const Dashboard = ({
  weather,
  selectedLocation,
  setSelectedLocation,
  weatherData,
  userlocation,
  usingGeolocation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Placeholder data for demonstration, replace with actual weather data
  const defaultWeather = {
    location: "Berlin, DE",
    date: "2023-02-13 02:03 GMT",
    current: {
      temperature: 7,
      condition: "broken clouds",
      realFeel: 5,
      wind: "3.09 m/s",
      clouds: "75 %",
      humidity: "91 %",
    },
    todayForecast: [
      { time: "06:00", temp: 7, icon: "cloud" },
      { time: "09:00", temp: 7, icon: "cloud" },
      { time: "12:00", temp: 9, icon: "cloud" },
      { time: "15:00", temp: 9, icon: "cloud" },
      { time: "18:00", temp: 6, icon: "cloud" },
      { time: "21:00", temp: 5, icon: "cloud" },
    ],
    weeklyForecast: [
      {
        day: "Tuesday",
        temp: 7,
        condition: "overcast clouds",
        wind: "2.67 m/s",
        humidity: "80 %",
      },
      {
        day: "Wednesday",
        temp: 5,
        condition: "clear sky",
        wind: "1.14 m/s",
        humidity: "82 %",
      },
      {
        day: "Thursday",
        temp: 6,
        condition: "clear sky",
        wind: "2.02 m/s",
        humidity: "78 %",
      },
      {
        day: "Friday",
        temp: 8,
        condition: "overcast clouds",
        wind: "3.28 m/s",
        humidity: "80 %",
      },
      {
        day: "Saturday",
        temp: 7,
        condition: "light rain",
        wind: "7.28 m/s",
        humidity: "89 %",
      },
      {
        day: "Sunday",
        temp: 5,
        condition: "light rain",
        wind: "10.94 m/s",
        humidity: "75 %",
      },
    ],
  };

  // If no data yet, show loading or fallback
  if (!weatherData) {
    return (
      <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <p className="text-xl">Loading weather data...</p>
      </div>
    );
  }

  const displayWeather = weather || defaultWeather;
  console.log(userlocation);
  console.log(selectedLocation);
  console.log("Weather Type: ", weatherData.weatherType);
  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div className="flex flex-row items-end  w-full justify-between mb-4">
        <h2 className="text-xl font-bold  mb-4 text-white">
          Amianan Forecast Dashboard
        </h2>
        <img src={weathericon} className="w-14" alt="Weather Icon" />
      </div>
      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="lg:hidden flex justify-end mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-blue-900 bg-opacity-95 z-50 flex flex-col items-center justify-center space-y-6">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            <X size={28} className="text-white" />
          </button>
          <div className="w-full max-w-sm">
            <div className="relative flex items-center rounded-full p-2 shadow-lg">
              {/* city and municipality selector - dropdown*/}
              <LocationSelector
                selected={selectedLocation}
                onChange={(value) => {
                  setSelectedLocation(value);
                }}
                locations={locations}
              />
            </div>
            <p className="text-center text-gray-300 mt-2 text-sm">
              e.g., "Vintar", "Laoag City", "Paoay"
            </p>
          </div>
          {/* Add other mobile menu items here if needed */}
        </div>
      )}

      {/* Main content body - Restructured for lg screens */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 mt-4">
        {/* Left Column for lg screens (Search, Current Weather, Air Conditions) */}
        <div className="lg:w-2/5 flex flex-col space-y-6">
          {/* Search Input - Hidden on mobile, visible on lg */}
          <div className="hidden lg:block relative w-full">
            <div>
              {" "}
              {/* relative flex items-center bg-white rounded-full p-2 shadow-lg - old css style */}
              <LocationSelector
                className="pl-11"
                selected={selectedLocation}
                onChange={(value) => {
                  setSelectedLocation(value);
                }}
                locations={locations}
              />
            </div>
          </div>

          {/* Current Weather Card */}
          {/* bg-white/20 is a shorthand for bg-white bg-opacity-20 */}
          <div className="rounded-xl p-4 shadow-xl backdrop-blur-sm bg-white/20">
            <h3 className="text-lg font-semibold mb-3 text-white">
              CURRENT WEATHER
            </h3>
            <p className="text-3xl font-bold mb-1 text-white">
              {usingGeolocation
                ? "Using your current location"
                : `Weather in ${selectedLocation}`}
            </p>
            <p className="text-lg  text-gray-200">{weatherData.date}</p>
            <p className="text-lg  text-gray-200">{weatherData.time}</p>
            <div className="flex items-center justify-between">
              <p className="text-6xl font-extrabold text-white">
                {weatherData.temperature}°C
              </p>
              <div className="flex flex-col items-center">
                {/* Placeholder for weather icon, replace with actual icons */}
                <svg
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM16 10h-2V6h-4v4H8l4 4 4-4z" />
                </svg>
                <p className="text-lg text-white">{weatherData.weatherType}</p>
              </div>
            </div>
          </div>

          {/* Weather Details Card */}
          <div className="rounded-xl p-4 shadow-xl backdrop-blur-sm bg-white/20 mt-6 lg:mt-0">
            <h3 className="text-lg font-semibold mb-3">Weather Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">🌡️</span>
                <div>
                  <p className="text-sm text-gray-300">Real Feel</p>
                  <p className="text-lg font-semibold">
                    {weatherData.temperature}°C
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">💨</span>
                <div>
                  <p className="text-sm text-gray-300">Wind</p>
                  <p className="text-lg font-semibold">
                    {weatherData.windSpeed} km/h
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">🌧️</span>
                <div>
                  <p className="text-sm text-gray-300">Chances of Rain</p>
                  <p className="text-lg font-semibold">
                    {weatherData.precipitationProbability} %
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">💧</span>
                <div>
                  <p className="text-sm text-gray-300">Humidity</p>
                  <p className="text-lg font-semibold">
                    {weatherData.humidity} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column for lg screens (Today's Forecast, Weekly Forecast) */}
        <div className="lg:w-3/5 flex flex-col space-y-6 mt-6 lg:mt-0">
          {/* Today's Forecast Card */}
          <div className="rounded-xl p-4 shadow-xl backdrop-blur-sm bg-white/20">
            <h3 className="text-lg font-semibold mb-3">TODAY'S FORECAST</h3>
            <div className="flex overflow-x-auto pb-2 space-x-4">
              {weatherData?.todayForecast?.map((hour, index) => {
                const Icon = weatherIcons[hour.weatherCode] || weatherIcons[3]; // fallback: cloudy

                return (
                  <div key={index} className="flex-shrink-0 text-center">
                    <p className="text-sm text-gray-300">{hour.time}</p>

                    {/* Render the component */}
                    <Icon className="w-8 h-8 text-white mx-auto" />

                    <p className="text-md font-semibold">{hour.temp}°C</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Forecast Card */}
          <div className="rounded-xl p-4 shadow-xl backdrop-blur-sm bg-white/20">
            <h3 className="text-lg font-semibold mb-3">WEEKLY FORECAST</h3>
            <div className="space-y-3">
              {displayWeather.weeklyForecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-white/30 last:border-b-0"
                >
                  <p className="w-1/5">{day.day}</p>
                  <div className="flex items-center w-2/5">
                    <p className="mr-2">{day.temp}°C</p>
                    {/* Placeholder for daily weather icon */}
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM16 10h-2V6h-4v4H8l4 4 4-4z" />
                    </svg>
                    <p className="ml-2 text-sm text-gray-300">
                      {day.condition}
                    </p>
                  </div>
                  <p className="w-1/5 text-right text-gray-300">{day.wind}</p>
                  <p className="w-1/5 text-right text-gray-300">
                    {day.humidity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
