import sunny from '../assets/sun.png';
import rain from '../assets/heavy-rain.png';

const WeatherCard = ({ location, weather }) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <img src={rain} alt="sunny-sky image" className="weather-icons max-w-full h-auto" />
      <h2 className="weather-location text-white text-4xl font-semibold">{location.name}</h2>
      <p className="weather-temperature text-white text-xl">🌡️ {weather.temperature}°C</p>
      <p className="text-base text-white">Wind: {weather.windspeed} km/h</p>
    </div>

  );
};

export default WeatherCard;
