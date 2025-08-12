import weathericon from "../assets/weather.png";

export const Dashboard = () => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-8 rounded-xl w-screen h-screen text-center">
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-white">
          Amianan Forecast Dashboard
        </h1>

        <img
          src={weathericon}
          className="weather-icon mb-3 mx-auto"
          alt="Weather Icon"
        />
      </div>
    </div>
  );
};
