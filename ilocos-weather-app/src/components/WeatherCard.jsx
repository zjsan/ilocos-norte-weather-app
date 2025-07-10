import sunny from '../assets/sun.png';
import rain from '../assets/heavy-rain.png';

const WeatherCard = ({ location, weather }) => {
  return (
    <div className="mt-6 space-y-4 text-center">
      <h2 className="weather-location text-white text-4xl font-semibold">{location.name}</h2>
      <p className="weather-temperature text-white text-xl">Date: {weather.date}</p>
      <p className="weather-temperature text-white text-xl">Time: {weather.time}</p>
      <p className="weather-temperature text-white text-xl">{weather.weatherType}</p>
      <p className="weather-temperature text-white text-xl">Temperature: {weather.temperature}</p>
      <p className="weather-temperature text-white text-xl">Humidity: {weather.humidity}</p>
      <p className="text-white text-lg">Wind Speed: {weather.windSpeed} km/h</p>
    
    </div>

  );
};

export default WeatherCard;
