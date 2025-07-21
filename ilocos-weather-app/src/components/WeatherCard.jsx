import sunny from "../assets/sun.png";
import rain from "../assets/heavy-rain.png";
import clouds from "../assets/clouds.png";
import storm from "../assets/storm.png";

const WeatherCard = ({ weather }) => {
  function renderWeatherImage() {
    if (
      weather.weatherType === "Clear sky" ||
      weather.weatherType === "Mainly clear"
    ) {
      return sunny;
    } else if (
      weather.weatherType === "Partly cloudy" ||
      weather.weatherType === "Overcast" ||
      weather.weatherType === "Fog" ||
      weather.weatherType === "Depositing rime fog"
    ) {
      return clouds;
    } else if (
      weather.weatherType === "Drizzle: Light" ||
      weather.weatherType === "Drizzle: Moderate" ||
      weather.weatherType === "Drizzle: Dense intensity" ||
      weather.weatherType === "Freezing Drizzle: Light" ||
      weather.weatherType === "Freezing Drizzle: Dense intensity" ||
      weather.weatherType === "Rain: Slight" ||
      weather.weatherType === "Rain: Moderate" ||
      weather.weatherType === "Rain: Heavy intensity" ||
      weather.weatherType === "Freezing Rain: Light" ||
      weather.weatherType === "Freezing Rain: Heavy intensity" ||
      weather.weatherType === "Rain showers: Slight" ||
      weather.weatherType === "Rain showers: Moderate" ||
      weather.weatherType === "Rain showers: Violent"
    ) {
      return rain;
    } else {
      return storm;
    }
  }

  return (
    <div className="mt-1 space-y-3 text-center p-5 bg-transparent ring-0 ">
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        {" "}
        Today, {weather.date}
      </p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        {weather.time}
      </p>
      <img
        src={renderWeatherImage()}
        className="weather-icon"
        alt="Weather Icon"
      />

      <p className="weather-temperature text-white text-5xl drop-shadow-sm">
        {weather.temperature}°
      </p>
      <p className="weather-temperature text-white text-xl drop-shadow-sm">
        {weather.weatherType}
      </p>
      <div className="flex flex-row justify-center gap-5 text-base w-full ">
        <p className="weather-temperature text-white drop-shadow-sm text-center">
          Humidity: {weather.humidity}
        </p>
        <p className="text-white  drop-shadow-sm  text-center">
          Wind Speed: {weather.windSpeed} km/h
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
