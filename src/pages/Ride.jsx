import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFlagCheckered, FaExchangeAlt, FaClock, FaWallet, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { vehicleTypes, popularPlaces } from '../data/rideData';

const Ride = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Calculate distance (mock calculation - based on character length)
  const calculateDistance = () => {
    if (pickup && dropoff) {
      // Mock distance calculation (in real app, use Google Maps API)
      const baseDistance = Math.floor(Math.random() * 15) + 3;
      return baseDistance;
    }
    return 0;
  };

  const distance = calculateDistance();
  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);
  
  const calculateFare = () => {
    if (distance > 0) {
      const fare = distance * selectedVehicleData.pricePerKm;
      return Math.max(fare, selectedVehicleData.minPrice);
    }
    return 0;
  };

  const fare = calculateFare();

  const handleSwapLocations = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handlePlaceSelect = (place, type) => {
    if (type === 'pickup') {
      setPickup(place.name);
      setShowPickupSuggestions(false);
    } else {
      setDropoff(place.name);
      setShowDropoffSuggestions(false);
    }
  };

  const handleBooking = () => {
    if (pickup && dropoff) {
      setIsBooking(true);
      setTimeout(() => {
        alert(`✅ Ride booked successfully!\n\nFrom: ${pickup}\nTo: ${dropoff}\nVehicle: ${selectedVehicleData.name}\nFare: ৳${fare}\n\nYour ride is on the way!`);
        setIsBooking(false);
      }, 1500);
    } else {
      alert('Please select both pickup and dropoff locations');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book Your Ride</h1>
          <p className="text-gray-500 mt-2">Fast, safe and affordable rides at your doorstep</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Location Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">📍</span>
                Select Locations
              </h2>
              
              <div className="space-y-4">
                {/* Pickup Location */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaMapMarkerAlt className="inline mr-2 text-green-500" />
                    Pickup Location
                  </label>
                  <div className="flex">
                    <div className="bg-green-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => {
                        setPickup(e.target.value);
                        setShowPickupSuggestions(true);
                      }}
                      onFocus={() => setShowPickupSuggestions(true)}
                      placeholder="Enter pickup location"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  {showPickupSuggestions && pickup && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {popularPlaces.filter(place => 
                        place.name.toLowerCase().includes(pickup.toLowerCase())
                      ).map((place, idx) => (
                        <div
                          key={idx}
                          onClick={() => handlePlaceSelect(place, 'pickup')}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2"
                        >
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{place.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleSwapLocations}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
                  >
                    <FaExchangeAlt className="text-gray-600" />
                  </button>
                </div>

                {/* Dropoff Location */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaFlagCheckered className="inline mr-2 text-red-500" />
                    Dropoff Location
                  </label>
                  <div className="flex">
                    <div className="bg-red-100 px-3 py-3 rounded-l-lg border border-r-0 border-gray-300">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <input
                      type="text"
                      value={dropoff}
                      onChange={(e) => {
                        setDropoff(e.target.value);
                        setShowDropoffSuggestions(true);
                      }}
                      onFocus={() => setShowDropoffSuggestions(true)}
                      placeholder="Enter dropoff location"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  {showDropoffSuggestions && dropoff && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {popularPlaces.filter(place => 
                        place.name.toLowerCase().includes(dropoff.toLowerCase())
                      ).map((place, idx) => (
                        <div
                          key={idx}
                          onClick={() => handlePlaceSelect(place, 'dropoff')}
                          className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2"
                        >
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{place.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Vehicle Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Vehicle</h2>
              <div className="grid grid-cols-3 gap-3">
                {vehicleTypes.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${
                      selectedVehicle === vehicle.id
                        ? `${vehicle.bgLight} border-2 ${vehicle.borderColor} shadow-md`
                        : 'bg-gray-50 border border-gray-200 hover:shadow'
                    }`}
                  >
                    <div className="text-3xl mb-2">{vehicle.icon}</div>
                    <div className="font-semibold text-gray-800">{vehicle.name}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <FaClock className="inline mr-1 text-xs" />
                      {vehicle.waitTime}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Button */}
            <button
              onClick={handleBooking}
              disabled={isBooking || !pickup || !dropoff}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                isBooking || !pickup || !dropoff
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'
              }`}
            >
              {isBooking ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Booking...
                </span>
              ) : (
                `Book ${selectedVehicleData.name} Now`
              )}
            </button>
          </div>

          {/* Right Column - Fare Details */}
          <div className="space-y-6">
            
            {/* Fare Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Fare Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Distance</span>
                  <span className="font-semibold">{distance > 0 ? `${distance} km` : '--'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span className="font-semibold">৳{selectedVehicleData.minPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Per km rate</span>
                  <span className="font-semibold">৳{selectedVehicleData.pricePerKm}/km</span>
                </div>
                <div className="border-t border-purple-500 pt-3 mt-2">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total Fare</span>
                    <span>৳{fare > 0 ? fare : '--'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ride Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <FaShieldAlt className="text-green-500 mr-2" />
                Ride Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  24/7 Customer Support
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  GPS Tracked Rides
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Verified Drivers
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Cashless Payment
                </li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <FaHeadset className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-sm text-gray-600 mt-1">Call us at 09678-100800</p>
              <p className="text-xs text-gray-500">24/7 available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ride;