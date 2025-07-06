import { locations } from "../data/locations";

const LocationSelector = ({ selected, onChange }) => (
  <select
    className="border p-2 rounded-lg w-full max-w-sm"
    value={selected}
    onChange={(e) => onChange(e.target.value)}
  >
    {locations.map((loc) => (
      <option key={loc.name} value={loc.name}>
        {loc.name}
      </option>
    ))}
  </select>
);

export default LocationSelector;
