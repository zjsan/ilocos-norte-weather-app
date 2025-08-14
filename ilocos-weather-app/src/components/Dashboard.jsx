import React, { useState } from "react";
import weathericon from "../assets/weather.png";
import { Search } from "lucide-react"; // For the search icon
import { Menu, X } from "lucide-react"; // For mobile menu icons

export const Dashboard = ({ weather }) => {
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

  const displayWeather = weather || defaultWeather;

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <div
        className="flex flex-row items-center  w-full justify-between

 items-end mb-4"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-white">
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
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-lg">
              <input
                type="text"
                placeholder="Enter location..."
                className="flex-grow bg-transparent text-gray-800 outline-none pl-3 pr-2"
              />
              <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                <Search size={20} />
              </button>
            </div>
            <p className="text-center text-gray-300 mt-2 text-sm">
              e.g., Berlin, DE
            </p>
          </div>
          {/* Add other mobile menu items here if needed */}
        </div>
      )}

      {/* Main content body */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 mt-4">
        <div className="lg:w-2/5 flex flex-col space-y-6">
          <div className="hidden lg:block relative w-full mb-6">
            <div className="relative flex items-center bg-white rounded-full p-2 shadow-lg">
              <input
                type="text"
                placeholder="Enter location..."
                className="flex-grow bg-transparent text-gray-800 outline-none pl-3 pr-2"
              />
              <button className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-white bg-opacity-20 rounded-xl p-4 shadow-xl backdrop-blur-sm">
        <h3 className="text-lg font-semibold mb-3">CURRENT WEATHER</h3>
        <p className="text-3xl font-bold mb-1">{displayWeather.location}</p>
        <p className="text-lg mb-4">
          Today{" "}
          {new Date().toLocaleString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-6xl font-extrabold">
            {displayWeather.current.temperature}°C
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
            <p className="text-lg">{displayWeather.current.condition}</p>
          </div>
        </div>
      </div>

      {/* Air Conditions Card */}
    </div>
  );
};
