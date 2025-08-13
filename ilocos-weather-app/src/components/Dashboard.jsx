import weathericon from "../assets/weather.png";

export const Dashboard = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-600 p-2 w-screen h-screen text-center">
      <div
        className="flex flex-row items-center  w-full justify-between

 items-end"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-white">
          Amianan Forecast Dashboard
        </h2>
        <img src={weathericon} className="w-14" alt="Weather Icon" />
      </div>

      {/* main body*/}
      <div className="text-white lg: flex lg:flex-row flex-col items-center justify-center">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
