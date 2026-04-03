import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFlagCheckered, FaExchangeAlt, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const Car = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [selectedCar, setSelectedCar] = useState('standard');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Car types
  const carTypes = [
    { id: 'standard', name: 'Standard', icon: '🚗', pricePerKm: 35, minPrice: 60, waitTime: '5 min', features: ['AC', '4 Seats'], color: 'bg-blue-500', bgLight: 'bg-blue-50', borderColor: 'border-blue-200' },
    { id: 'premium', name: 'Premium', icon: '🚙', pricePerKm: 50, minPrice: 90, waitTime: '7 min', features: ['AC', 'Leather Seats', '4 Seats'], color: 'bg-purple-500', bgLight: 'bg-purple-50', borderColor: 'border-purple-200' },
    { id: 'suv', name: 'SUV', icon: '🚐', pricePerKm: 65, minPrice: 120, waitTime: '10 min', features: ['AC', '6 Seats', 'Extra Space'], color: 'bg-green-500', bgLight: 'bg-green-50', borderColor: 'border-green-200' }
  ];

  // Popular places
  const popularPlaces = [
    { name: 'Uttara', lat: 23.8759, lng: 90.3795 },
    { name: 'Mirpur', lat: 23.8060, lng: 90.3700 },
    { name: 'Dhanmondi', lat: 23.7455, lng: 90.3770 },
    { name: 'Gulshan', lat: 23.7820, lng: 90.4140 },
    { name: 'Banani', lat: 23.7940, lng: 90.4060 },
    { name: 'Motijheel', lat: 23.7330, lng: 90.4170 },
    { name: 'Airport', lat: 23.8436, lng: 90.4010 },
    { name: 'New Market', lat: 23.7320, lng: 90.3650 }
  ];

  const selectedCarData = carTypes.find(c => c.id === selectedCar);

  // Calculate distance (mock)
  const calculateDistance = () => {
    if (pickup && dropoff) {
      return Math.floor(Math.random() * 20) + 5;
    }
    return 0;
  };

  const distance = calculateDistance();
  const fare = distance > 0 ? Math.max(distance * selectedCarData.pricePerKm, selectedCarData.minPrice) : 0;

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
        alert(`✅ Car booked successfully!\n\nFrom: ${pickup}\nTo: ${dropoff}\nCar: ${selectedCarData.name}\nFare: ৳${fare}\n\nYour car is on the way!`);
        setIsBooking(false);
      }, 1500);
    } else {
      alert('Please select both pickup and dropoff locations');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Book Your Car</h1>
          <p className="text-gray-500 mt-2">Travel in comfort and style with our premium car service</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">📍</span>
                Select Locations
              </h2>
              
              <div className="space-y-4">
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  {showPickupSuggestions && pickup && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {popularPlaces.filter(place => 
                        place.name.toLowerCase().includes(pickup.toLowerCase())
                      ).map((place, idx) => (
                        <div key={idx} onClick={() => handlePlaceSelect(place, 'pickup')} className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{place.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-center">
                  <button onClick={handleSwapLocations} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
                    <FaExchangeAlt className="text-gray-600" />
                  </button>
                </div>

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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  {showDropoffSuggestions && dropoff && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {popularPlaces.filter(place => 
                        place.name.toLowerCase().includes(dropoff.toLowerCase())
                      ).map((place, idx) => (
                        <div key={idx} onClick={() => handlePlaceSelect(place, 'dropoff')} className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{place.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Car</h2>
              <div className="grid grid-cols-3 gap-3">
                {carTypes.map((car) => (
                  <button key={car.id} onClick={() => setSelectedCar(car.id)} className={`p-4 rounded-xl text-center transition-all transform hover:scale-105 ${selectedCar === car.id ? `${car.bgLight} border-2 ${car.borderColor} shadow-md` : 'bg-gray-50 border border-gray-200 hover:shadow'}`}>
                    <div className="text-3xl mb-2">{car.icon}</div>
                    <div className="font-semibold text-gray-800">{car.name}</div>
                    <div className="text-xs text-gray-500 mt-1">৳{car.pricePerKm}/km</div>
                    <div className="flex justify-center space-x-1 mt-2">
                      {car.features.map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-400">{feature}</span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleBooking} disabled={isBooking || !pickup || !dropoff} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isBooking || !pickup || !dropoff ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'}`}>
              {isBooking ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Booking...</span> : `Book ${selectedCarData.name} Car Now`}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Fare Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span>Distance</span><span className="font-semibold">{distance > 0 ? `${distance} km` : '--'}</span></div>
                <div className="flex justify-between"><span>Base Fare</span><span className="font-semibold">৳{selectedCarData.minPrice}</span></div>
                <div className="flex justify-between"><span>Per km rate</span><span className="font-semibold">৳{selectedCarData.pricePerKm}/km</span></div>
                <div className="border-t border-blue-500 pt-3 mt-2"><div className="flex justify-between text-xl font-bold"><span>Total Fare</span><span>৳{fare > 0 ? fare : '--'}</span></div></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center"><FaShieldAlt className="text-green-500 mr-2" />Car Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Professional Drivers</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Air Conditioned</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>GPS Tracked</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>24/7 Support</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <FaHeadset className="text-3xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-sm text-gray-600 mt-1">Call us at 09678-100800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;