// weatherIcons.js
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
  CloudHail,
} from "lucide-react";

export const weatherIcons = {
  0: <Sun className="w-8 h-8 text-yellow-400 mx-auto" />, // Clear sky
  1: <Sun className="w-8 h-8 text-yellow-400 mx-auto" />, // Mainly clear
  2: <Cloud className="w-8 h-8 text-gray-300 mx-auto" />, // Partly cloudy
  3: <Cloud className="w-8 h-8 text-gray-400 mx-auto" />, // Overcast
  45: <CloudFog className="w-8 h-8 text-gray-400 mx-auto" />, // Fog
  48: <CloudFog className="w-8 h-8 text-gray-400 mx-auto" />, // Depositing rime fog

  51: <CloudDrizzle className="w-8 h-8 text-blue-300 mx-auto" />, // Drizzle: Light
  53: <CloudDrizzle className="w-8 h-8 text-blue-400 mx-auto" />, // Drizzle: Moderate
  55: <CloudDrizzle className="w-8 h-8 text-blue-500 mx-auto" />, // Drizzle: Dense

  56: <CloudDrizzle className="w-8 h-8 text-cyan-300 mx-auto" />, // Freezing Drizzle: Light
  57: <CloudDrizzle className="w-8 h-8 text-cyan-500 mx-auto" />, // Freezing Drizzle: Dense

  61: <CloudRain className="w-8 h-8 text-blue-400 mx-auto" />, // Rain: Slight
  63: <CloudRain className="w-8 h-8 text-blue-500 mx-auto" />, // Rain: Moderate
  65: <CloudRain className="w-8 h-8 text-blue-600 mx-auto" />, // Rain: Heavy

  66: <CloudHail className="w-8 h-8 text-cyan-400 mx-auto" />, // Freezing Rain: Light
  67: <CloudHail className="w-8 h-8 text-cyan-600 mx-auto" />, // Freezing Rain: Heavy

  71: <CloudSnow className="w-8 h-8 text-blue-200 mx-auto" />, // Snow: Slight
  73: <CloudSnow className="w-8 h-8 text-blue-300 mx-auto" />, // Snow: Moderate
  75: <CloudSnow className="w-8 h-8 text-blue-400 mx-auto" />, // Snow: Heavy
  77: <CloudSnow className="w-8 h-8 text-blue-500 mx-auto" />, // Snow grains

  80: <CloudRain className="w-8 h-8 text-blue-400 mx-auto" />, // Rain showers: Slight
  81: <CloudRain className="w-8 h-8 text-blue-500 mx-auto" />, // Rain showers: Moderate
  82: <CloudRain className="w-8 h-8 text-blue-600 mx-auto" />, // Rain showers: Violent

  85: <CloudSnow className="w-8 h-8 text-blue-300 mx-auto" />, // Snow showers: Slight
  86: <CloudSnow className="w-8 h-8 text-blue-500 mx-auto" />, // Snow showers: Heavy

  95: <CloudLightning className="w-8 h-8 text-yellow-400 mx-auto" />, // Thunderstorm: Slight/Moderate
  96: <CloudLightning className="w-8 h-8 text-yellow-500 mx-auto" />, // Thunderstorm slight hail
  99: <CloudLightning className="w-8 h-8 text-yellow-600 mx-auto" />, // Thunderstorm heavy hail
};
