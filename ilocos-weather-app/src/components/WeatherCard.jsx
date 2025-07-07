import sunny from '../assets/sun.png';


const WeatherCard = ({ location, weather }) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <img src={sunny} alt="sunny-sky image" className="weather-icons" />
      <h2 className="text-white font-semibold">{location.name}</h2>
      <p className="text-white text-lg">🌡️ {weather.temperature}°C</p>
      <p className="text-sm text-white">Wind: {weather.windspeed} km/h</p>
    </div>

  );
};

export default WeatherCard;
