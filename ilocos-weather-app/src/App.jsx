import React, { useEffect, useState } from "react";
import LocationSelector from "./components/LocationSelector";
import WeatherCard from "./components/WeatherCard";
import { locations } from "./data/locations";
import { weatherCodeMap } from "./data/weathercode";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(""); // Initialize empty, will be set by geo or default
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userlocation, setUserLocation] = useState(null);
  const [hasAttemptedGeolocation, setHasAttemptedGeolocation] = useState(false); //to check if the geolocation is actie

  const fetchWeather = async (lat, lon, locationName = "Current Location") => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia/Manila&forecast_days=1&current_weather=true`;
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        // If response is not OK (e.g., 404, 500), throw an error
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Check if hourly data exists
      if (!data.hourly || !data.hourly.time || data.hourly.time.length === 0) {
        displayError("No hourly weather data available for this location.");
        return;
      }

      const nowTimestamp = new Date(data.current_weather.time).getTime();
      let index = -1;

      // Iterate through hourly times to find the latest time that is less than or equal to nowTimestamp
      for (let i = 0; i < data.hourly.time.length; i++) {
        const hourlyTimestamp = new Date(data.hourly.time[i]).getTime();
        console.log(
          `Checking hourly time: ${data.hourly.time[i]} (timestamp: ${hourlyTimestamp}) against current time: ${nowTimestamp}`
        );
        if (hourlyTimestamp <= nowTimestamp) {
          index = i;
        } else {
          // Since the hourly.time array is sorted, if we've passed the current time,
          // the previous index is the closest valid one.
          break;
        }
      }

      if (index === -1) {
        index = 0;
        console.warn(
          "Could not find a past or exact hourly data point for current time. Using the first available hourly entry."
        );
      }

      // Extract relevant data for the current hour
      const currentTemperature = data.hourly.temperature_2m[index];
      const currentHumidity = data.hourly.relative_humidity_2m[index];
      const currentWindSpeed = data.hourly.wind_speed_10m[index];
      const currentWeatherCode = data.hourly.weather_code[index];

      // Map weather code to a descriptive string
      const weatherType = weatherCodeMap[currentWeatherCode] || "Unknown";

      // Format date and time for display
      const dateTime = new Date(data.current_weather.time);
      const formattedDate = dateTime.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      console.log(dateTime, formattedDate, formattedTime);
      console.log(lat);
      console.log(lon);
      // Set the processed weather data
      setWeatherData({
        city: locationName, // Use the selected city name
        temperature: currentTemperature,
        humidity: currentHumidity,
        windSpeed: currentWindSpeed,
        weatherType: weatherType,
        date: formattedDate,
        time: formattedTime,
      });

      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      displayError(
        `Failed to fetch weather data: ${error.message}. Please try again.`
      );
      setError(
        `Failed to fetch weather data: ${err.message}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserGeolocation = () => {
    setHasAttemptedGeolocation(true); //setting true to mark trying geolocation
    setError(null); //clear errors

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      }),
        (GeolocationPositionError) => {
          setUserLocation(null);
          let errorMessage = "Failed to retrieve your location";

          switch (GeolocationPositionError.code) {
            case GeolocationPositionError.PERMISSION_DENIED:
              errorMessage =
                "Permission to access location was denied. Please select from the dropdown.";
              break;
            case GeolocationPositionError.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable. Please select from the dropdown.";
              break;
            case GeolocationPositionError.TIMEOUT:
              errorMessage =
                "The request to get user location timed out. Please select from the dropdown.";
              break;
            default:
              errorMessage =
                "An unknown error occurred while getting your location. Please select from the dropdown.";
              break;
          }
          setError(errorMessage);
          setSelectedLocation(locations[0].name); // Fallback to default selected location if geolocation fails
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }; // Options for geolocation}
    } else {
      setError(
        "Geolocation is not supported by your browser. Please select from the dropdown."
      );
      setSelectedLocation(locations[0].name); // Fallback to default selected location if geolocation fails
      setHasAttemptedGeolocation(true);
    }
  };

  useEffect(() => {
    getUserGeolocation();
  }, []); //runs once on mount

  // Effect to fetch weather based on location state
  useEffect(() => {
    if (userlocation) {
      // If userLocation is available, fetch weather for it
      fetchWeather(userlocation.lat, userlocation.lon, "Current Location");
      setSelectedLocation(""); // Ensure dropdown is not showing a selected city
      console.log("Geolocation is being used");
    } else if (
      hasAttemptedGeolocation &&
      !userlocation &&
      !selectedLocation &&
      locations.length > 0
    ) {
      // If geolocation was attempted and failed, and no city is selected yet,
      // default to the first city in the list.
      setSelectedLocation(locations[0].name);
    } else if (selectedLocation) {
      // If a city is selected (either by default or user selection), fetch its weather
      const loc = locations.find((l) => l.name === selectedLocation);
      if (loc) {
        fetchWeather(loc.lat, loc.lon, loc.name);
      }
      console.log("Selected from the dropdown");
    }
  }, [selectedLocation, userlocation, hasAttemptedGeolocation]); // Dependencies for this effect

  // Function to determine background class based on weather type
  const getBackgroundClass = (weatherType) => {
    switch (weatherType) {
      case "Clear sky":
      case "Mainly clear":
        return "from-blue-300 to-blue-600"; // Sunny day
      case "Partly cloudy":
      case "Overcast":
        return "from-gray-400 to-gray-600"; // Cloudy day
      case "Fog":
      case "Depositing rime fog":
        return "from-gray-500 to-gray-700"; // Foggy
      case "Drizzle: Light":
      case "Drizzle: Moderate":
      case "Drizzle: Dense intensity":
      case "Rain: Slight":
      case "Rain: Moderate":
      case "Rain: Heavy intensity":
      case "Rain showers: Slight":
      case "Rain showers: Moderate":
      case "Rain showers: Violent":
        return "from-blue-900 to-indigo-400"; // Rainy
      case "Freezing Drizzle: Light":
      case "Freezing Drizzle: Dense intensity":
      case "Freezing Rain: Light":
      case "Freezing Rain: Heavy intensity":
        return "from-gray-300 to-gray-500"; // Snowy/Icy (though unlikely in Ilocos Norte, good for completeness)
      case "Thunderstorm: Slight or moderate":
      case "Thunderstorm with slight hail":
      case "Thunderstorm with heavy hail":
        return "from-purple-700 to-indigo-900"; // Thunderstorm
      default:
        return "from-blue-400 to-purple-600"; // Default gradient
    }
  };

  const backgroundClass = weatherData
    ? getBackgroundClass(weatherData.weatherType)
    : "from-blue-400 to-purple-600";

  return (
    <div
      className={`bg-gradient-to-br ${backgroundClass} min-h-screen p-2 flex flex-col items-center`}
    >
      <div className="text-center mt-11">
        <h1 className="text-3xl font-bold text-white drop-shadow-sm">
          Amianan Forecast
        </h1>
        <h2 className=" text-white mt-2 mb-4 drop-shadow-sm">
          Ilocos Norte Weather App
        </h2>
      </div>

      <LocationSelector
        selected={selectedLocation}
        onChange={(value) => {
          setSelectedLocation(value);
          setUserLocation(null); // Clear user location if user selects from dropdown
        }}
        locations={locations}
      />

      {/* Loading and Error States */}
      {loading && (
        <div className="text-center text-white font-semibold text-lg mt-4">
          Loading weather data...
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      )}

      {weatherData && (
        <div className="mt-1">
          <WeatherCard
            location={locations.find((l) => l.name === selectedLocation)}
            weather={weatherData}
          />
        </div>
      )}
    </div>
  );
}

export default App;
