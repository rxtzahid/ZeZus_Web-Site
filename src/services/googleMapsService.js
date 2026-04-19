const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

class GoogleMapsService {
  async getRoute(origin, destination) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      if (response.data.routes.length === 0) {
        throw new Error('No route found');
      }

      const route = response.data.routes[0];
      const leg = route.legs[0];

      return {
        distance: leg.distance.value,
        duration: leg.duration.value,
        polyline: route.overview_polyline.points,
        steps: leg.steps,
      };
    } catch (error) {
      console.error('Google Maps Service Error:', error.message);
      throw error;
    }
  }

  async getDistanceMatrix(origins, destinations) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
        params: {
          origins: origins.map((o) => `${o.latitude},${o.longitude}`).join('|'),
          destinations: destinations.map((d) => `${d.latitude},${d.longitude}`).join('|'),
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Google Maps Service Error:', error.message);
      throw error;
    }
  }

  async getPlaceAutocomplete(input) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
        params: {
          input,
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      return response.data.predictions;
    } catch (error) {
      console.error('Google Maps Service Error:', error.message);
      throw error;
    }
  }
}

module.exports = new GoogleMapsService();
