const WeatherCard = ({ location, weather }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 text-center">
      <h2 className="text-xl font-semibold">{location.name}</h2>
      <p className="text-gray-700 text-lg">
        🌡️ {weather.temperature}°C
      </p>
      <p className="text-sm text-gray-500">Wind: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
