import React, { useState } from "react";
import weathericon from "../assets/weather.png";
import { Search } from "lucide-react"; // For the search icon
import { Menu, X } from "lucide-react"; // For mobile menu icons

export const Dashboard = ({ weather }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    </div>
  );
};
