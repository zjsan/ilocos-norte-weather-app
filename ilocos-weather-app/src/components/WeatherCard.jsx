import sunny from "../assets/sun.png";
import rain from "../assets/heavy-rain.png";

const WeatherCard = ({ location, weather }) => {
  return (
    <div className="mt-2 space-y-3 text-center p-5 bg-transparent ring-0">
      <p className="weather-temperature text-white text-xl drop-shadow-sm"> Today, {weather.date}</p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">{weather.time}
      </p>
      <p className="weather-temperature text-white text-5xl drop-shadow-sm">{weather.temperature}°
      </p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        {weather.weatherType}
      </p>
      
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        Humidity: {weather.humidity}
      </p>
      <p className="text-white text-lg drop-shadow-sm">Wind Speed: {weather.windSpeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
