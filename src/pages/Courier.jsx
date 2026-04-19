import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFlagCheckered, FaExchangeAlt, FaBox, FaWeightHanging, FaRuler, FaHeadset, FaTruck } from 'react-icons/fa';

const Courier = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [weight, setWeight] = useState('1');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [packageType, setPackageType] = useState('document');
  const [isFragile, setIsFragile] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  // Popular locations
  const popularLocations = [
    'Uttara', 'Mirpur', 'Dhanmondi', 'Gulshan', 'Banani', 'Motijheel', 'Airport', 'New Market',
    'Old Dhaka', 'Mohakhali', 'Bashundhara', 'Baridhara', 'Khilgaon', 'Jatrabari', 'Savar'
  ];

  // Package types
  const packageTypes = [
    { id: 'document', name: 'Document', icon: '📄', basePrice: 50, description: 'Papers, letters, documents' },
    { id: 'small', name: 'Small Package', icon: '📦', basePrice: 80, description: 'Small boxes, parcels' },
    { id: 'medium', name: 'Medium Package', icon: '📫', basePrice: 120, description: 'Medium size boxes' },
    { id: 'large', name: 'Large Package', icon: '🏢', basePrice: 180, description: 'Large boxes, furniture' }
  ];

  // Calculate price
  const calculatePrice = () => {
    let price = 0;
    const selectedPackage = packageTypes.find(p => p.id === packageType);
    price += selectedPackage.basePrice;
    
    // Weight calculation
    const weightNum = parseFloat(weight);
    if (weightNum > 1) {
      price += (weightNum - 1) * 30;
    }
    
    // Fragile charge
    if (isFragile) price += 40;
    
    // Urgent charge
    if (isUrgent) price += 60;
    
    // Distance calculation (mock)
    if (pickup && dropoff) {
      const distance = Math.floor(Math.random() * 20) + 2;
      price += distance * 10;
    }
    
    return price;
  };

  const price = calculatePrice();
  const selectedPackage = packageTypes.find(p => p.id === packageType);

  const handleSwapLocations = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handlePlaceSelect = (place, type) => {
    if (type === 'pickup') {
      setPickup(place);
      setShowPickupSuggestions(false);
    } else {
      setDropoff(place);
      setShowDropoffSuggestions(false);
    }
  };

  const handleBooking = () => {
    if (pickup && dropoff) {
      setIsBooking(true);
      setTimeout(() => {
        alert(`✅ Courier booked successfully!\n\nFrom: ${pickup}\nTo: ${dropoff}\nPackage: ${selectedPackage.name}\nWeight: ${weight} kg\nTotal: ৳${price}\n\nYour package will be picked up soon!`);
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
          <h1 className="text-3xl font-bold text-gray-800">Send a Package</h1>
          <p className="text-gray-500 mt-2">Fast, reliable and affordable courier service</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Location Selection Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">📍</span>
                Pickup & Delivery Locations
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
                      {popularLocations.filter(loc => loc.toLowerCase().includes(pickup.toLowerCase())).map((loc, idx) => (
                        <div key={idx} onClick={() => handlePlaceSelect(loc, 'pickup')} className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{loc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <button onClick={handleSwapLocations} className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition">
                    <FaExchangeAlt className="text-gray-600" />
                  </button>
                </div>

                {/* Dropoff Location */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaFlagCheckered className="inline mr-2 text-red-500" />
                    Delivery Location
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
                      placeholder="Enter delivery location"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                  {showDropoffSuggestions && dropoff && (
                    <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {popularLocations.filter(loc => loc.toLowerCase().includes(dropoff.toLowerCase())).map((loc, idx) => (
                        <div key={idx} onClick={() => handlePlaceSelect(loc, 'dropoff')} className="px-4 py-2 hover:bg-purple-50 cursor-pointer flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-gray-400 text-sm" />
                          <span>{loc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Package Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaBox className="inline mr-2 text-purple-600" />
                Package Details
              </h2>
              
              <div className="space-y-4">
                {/* Package Type */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Package Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {packageTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setPackageType(type.id)}
                        className={`p-3 rounded-xl text-center transition-all ${packageType === type.id ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        <div className="text-2xl mb-1">{type.icon}</div>
                        <div className="text-sm font-semibold">{type.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaWeightHanging className="inline mr-2" />
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                {/* Dimensions (Optional) */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FaRuler className="inline mr-2" />
                    Dimensions (Optional) - cm
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <input type="number" placeholder="Length" value={dimensions.length} onChange={(e) => setDimensions({...dimensions, length: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                    <input type="number" placeholder="Width" value={dimensions.width} onChange={(e) => setDimensions({...dimensions, width: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                    <input type="number" placeholder="Height" value={dimensions.height} onChange={(e) => setDimensions({...dimensions, height: e.target.value})} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                  </div>
                </div>

                {/* Extra Options */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={isFragile} onChange={(e) => setIsFragile(e.target.checked)} className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">Fragile (Handle with care)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} className="w-4 h-4 text-purple-600" />
                    <span className="text-gray-700">Urgent Delivery (Express)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Sender Name</label>
                  <input type="text" placeholder="Your name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Sender Phone</label>
                  <input type="tel" placeholder="01XXXXXXXXX" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Receiver Name</label>
                  <input type="text" placeholder="Receiver name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Receiver Phone</label>
                  <input type="tel" placeholder="Receiver phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                </div>
              </div>
            </div>

            {/* Booking Button */}
            <button onClick={handleBooking} disabled={isBooking || !pickup || !dropoff} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isBooking || !pickup || !dropoff ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg'}`}>
              {isBooking ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Booking...</span> : `Book Courier - ৳${price}`}
            </button>
          </div>

          {/* Right Column - Price & Info */}
          <div className="space-y-6">
            
            {/* Price Card */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Base Price ({selectedPackage.name})</span><span>৳{selectedPackage.basePrice}</span></div>
                <div className="flex justify-between"><span>Weight ({weight} kg)</span><span>৳{weight > 1 ? (weight - 1) * 30 : 0}</span></div>
                {isFragile && <div className="flex justify-between"><span>Fragile Handling</span><span>৳40</span></div>}
                {isUrgent && <div className="flex justify-between"><span>Urgent Delivery</span><span>৳60</span></div>}
                <div className="border-t border-purple-500 pt-2 mt-2">
                  <div className="flex justify-between font-bold"><span>Total</span><span>৳{price}</span></div>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center"><FaTruck className="text-purple-600 mr-2" />Delivery Info</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Standard Delivery: 2-3 days</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Express Delivery: 24 hours</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Real-time tracking</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>Insurance available</li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <FaHeadset className="text-3xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-sm text-gray-600 mt-1">Call us at 09678-100800</p>
              <p className="text-xs text-gray-500">24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courier;