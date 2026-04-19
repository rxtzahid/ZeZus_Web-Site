const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// Get coordinates from address
const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('Address not found');
    }

    const location = response.data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng,
    };
  } catch (error) {
    console.error('Geocoding error:', error.message);
    throw error;
  }
};

// Get address from coordinates
const getAddress = async (latitude, longitude) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        latlng: `${latitude},${longitude}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    if (response.data.results.length === 0) {
      throw new Error('Address not found');
    }

    return response.data.results[0].formatted_address;
  } catch (error) {
    console.error('Reverse geocoding error:', error.message);
    throw error;
  }
};

// Calculate distance and duration between two points
const getDistanceAndDuration = async (origin, destination) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: `${origin.latitude},${origin.longitude}`,
        destinations: `${destination.latitude},${destination.longitude}`,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const element = response.data.rows[0].elements[0];

    if (element.status === 'NOT_FOUND') {
      throw new Error('Could not calculate distance');
    }

    return {
      distance: element.distance.value / 1000, // Convert to km
      duration: element.duration.value / 60, // Convert to minutes
    };
  } catch (error) {
    console.error('Distance calculation error:', error.message);
    throw error;
  }
};

module.exports = {
  getCoordinates,
  getAddress,
  getDistanceAndDuration,
};
