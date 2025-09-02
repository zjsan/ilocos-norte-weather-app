// weatherIcons.js
import { Sun, Cloud, CloudRain, CloudLightning } from "lucide-react";

export const weatherIcons = {
  0: <Sun className="w-8 h-8 text-yellow-400 mx-auto" />, // Clear sky
  1: <Sun className="w-8 h-8 text-yellow-400 mx-auto" />, // Mainly clear
  2: <Cloud className="w-8 h-8 text-gray-300 mx-auto" />, // Partly cloudy
  3: <Cloud className="w-8 h-8 text-gray-400 mx-auto" />, // Overcast
  45: <Cloud className="w-8 h-8 text-gray-400 mx-auto" />, // Fog
  48: <Cloud className="w-8 h-8 text-gray-400 mx-auto" />, // Fog with rime
  51: <CloudRain className="w-8 h-8 text-blue-400 mx-auto" />, // Drizzle
  61: <CloudRain className="w-8 h-8 text-blue-500 mx-auto" />, // Rain
  95: <CloudLightning className="w-8 h-8 text-yellow-300 mx-auto" />, // Thunderstorm
};
