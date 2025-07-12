import sunny from "../assets/sun.png";
import rain from "../assets/heavy-rain.png";

const WeatherCard = ({ location, weather }) => {
  return (
    <div className="mt-2 space-y-4 text-center p-5 bg-transparent ring-0">
      <p className="weather-temperature text-white text-xl">
        {weather.weatherType}
      </p>
      <p className="weather-temperature text-white text-xl">{weather.temperature} °
      </p>
      <p className="weather-temperature text-white text-xl">{weather.date}</p>
      <p className="weather-temperature text-white text-xl">{weather.time}
      </p>
      <p className="weather-temperature text-white text-xl">
        Humidity: {weather.humidity}
      </p>
      <p className="text-white text-lg">Wind Speed: {weather.windSpeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
