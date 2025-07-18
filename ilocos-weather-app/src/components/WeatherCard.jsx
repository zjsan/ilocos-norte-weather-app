import sunny from "../assets/sun.png";
import rain from "../assets/heavy-rain.png";



const WeatherCard = ({ location, weather }) => {

  let weatherType = weather.weatherType

  function renderWeatherImage({weatherType}){

  }

  return (
    <div className="mt-1 space-y-3 text-center p-5 bg-transparent ring-0">
      <p className="weather-temperature text-white text-xl drop-shadow-sm"> Today, {weather.date}</p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">{weather.time}
      </p>
      <img src={rain} className="weather-icon" alt="Weather Icon" />
      <p className="weather-temperature text-white text-5xl drop-shadow-sm">{weather.temperature}°
      </p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        {weather.weatherType}
      </p>
      
      <div className="flex flex-row justify-around text-base w-full">
        <p className="weather-temperature text-white drop-shadow-sm">
        Humidity: {weather.humidity}
      </p>
      <p className="text-white  drop-shadow-sm">Wind Speed: {weather.windSpeed} km/h</p>
      </div>
      
    </div>
  );
};

export default WeatherCard;
