import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PlacesAutocomplete = ({ onSelect, placeholder, label }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng, address });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-purple-600">
        <div className="bg-gray-100 px-3 py-3">
          <FaMapMarkerAlt className="text-purple-600" />
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 outline-none"
        />
      </div>
      {status === 'OK' && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {data.map((suggestion) => (
            <div
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion.description)}
              className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2"
            >
              <FaMapMarkerAlt className="text-gray-400 text-sm" />
              <span className="text-sm">{suggestion.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesAutocomplete;