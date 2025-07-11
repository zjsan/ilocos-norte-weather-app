import { locations } from "../data/locations";

const LocationSelector = ({ selected, onChange }) => (

  <div className="mt-1 mb-3 w-full max-w-sm">
    <select
    className="border border-white bg-blue-100 text-black px-3 py-3 rounded-lg w-full max-w-sm"
    aria-label="Select Location"
    data-testid="location-selector"
    value={selected}
    onChange={(e) => onChange(e.target.value)}
  >

    {locations.map((loc) => (
      <option key={loc.name} value={loc.name}>
        {loc.name}
      </option>
    ))}
  </select>
  </div>
  
);

export default LocationSelector;
