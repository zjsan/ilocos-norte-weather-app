import LocationSelector from "../components/LocationSelector";
import WeatherCard from "../components/WeatherCard";
import { locations } from "../data/locations";
import { Footer } from "../components/Footer";
import alert from "../assets/caution.png";
import { Link } from "react-router-dom";

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
      {/*modal for the about app */}
      <div className="flex justify-end w-full">
        <button
          className="cursor-pointer"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          <img className="w-10 " src={alert} alt="alert icon" />
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg text-center">Amianan Forecast</h3>
            <p className="py-4 text-justify">
              {" "}
              This is a weather application for the different cities and
              municipalities in Ilocos Norte, Philippines. It fetches real-time
              weather data from the Open-Meteo API which can be accessed using
              this link: https://open-meteo.com/. The application can
              automatically detect your current location (with your permission)
              or you can manually select a city from the dropdown list.
            </p>
          </div>
        </dialog>
      </div>{" "}
      {/*end of modal */}
      {/*main app interface*/}
      <div className="text-center mt-11">
        <h1 className="text-3xl font-bold text-white drop-shadow-sm">
          Amianan Forecast
        </h1>
        <h2 className=" text-white mt-2 mb-4 drop-shadow-sm">
          Ilocos Norte Weather App
        </h2>
      </div>
      {/* city and municipality selector - dropdown*/}
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
      {/* weather card*/}
      {weatherData && (
        <div className="mt-1">
          <WeatherCard
            location={locations.find((l) => l.name === selectedLocation)}
            weather={weatherData}
          />
        </div>
      )}
      <div
        className="text-white text-center 
underline"
      >
        <Link to="/dashboard" className="text-gray-50 hover: text-gray-300">
          Click here for more details.
        </Link>
      </div>
      <Footer />
    </div>
  );
};
