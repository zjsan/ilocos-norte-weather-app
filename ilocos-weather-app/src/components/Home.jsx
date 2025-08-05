import LocationSelector from "../components/LocationSelector";
import WeatherCard from "../components/WeatherCard";
import { locations } from "../data/locations";
import { weatherCodeMap } from "../data/weathercode";
import { Footer } from "../components/Footer";

export const Home = ({
  selectedLocation,
  setSelectedLocation,
  weatherData,
  loading,
  error,
  backgroundClass,
}) => {
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
        }}
        locations={locations}
      />

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

      <Footer />

      <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>About the App</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
    </div>
  );
};
