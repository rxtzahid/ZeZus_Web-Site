import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '16px'
};

const defaultCenter = {
  lat: 23.8103,
  lng: 90.4125
};

const Map = ({ pickup, dropoff, onMapClick }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  // Calculate route between pickup and dropoff
  const calculateRoute = useCallback(() => {
    if (pickup && dropoff && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropoff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error('Directions request failed:', status);
          }
        }
      );
    }
  }, [pickup, dropoff]);

  React.useEffect(() => {
    if (pickup && dropoff) {
      calculateRoute();
    }
  }, [pickup, dropoff, calculateRoute]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // If no API key, show a placeholder
  if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-gray-200 rounded-2xl flex items-center justify-center" style={containerStyle}>
        <div className="text-center p-4">
          <p className="text-gray-600 mb-2">🗺️ Google Maps</p>
          <p className="text-sm text-gray-500">API Key not configured</p>
          <p className="text-xs text-gray-400 mt-2">Add REACT_APP_GOOGLE_MAPS_API_KEY to .env file</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {pickup && pickup.lat && pickup.lng && <Marker position={{ lat: pickup.lat, lng: pickup.lng }} label="P" />}
        {dropoff && dropoff.lat && dropoff.lng && <Marker position={{ lat: dropoff.lat, lng: dropoff.lng }} label="D" />}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;