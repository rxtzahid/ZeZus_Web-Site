import React, { useState } from 'react';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt,  FaHeadset, FaGasPump, FaCogs, FaUsers } from 'react-icons/fa';

const Rentals = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCar, setSelectedCar] = useState('sedan');
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const popularLocations = ['Uttara', 'Mirpur', 'Dhanmondi', 'Gulshan', 'Banani', 'Motijheel', 'Airport'];

  const cars = [
    { id: 'sedan', name: 'Sedan', icon: '🚗', pricePerDay: 2500, seats: 4, ac: true, transmission: 'Auto', image: '🚗' },
    { id: 'suv', name: 'SUV', icon: '🚙', pricePerDay: 4000, seats: 7, ac: true, transmission: 'Auto', image: '🚙' },
    { id: 'premium', name: 'Premium', icon: '🏎️', pricePerDay: 6000, seats: 4, ac: true, transmission: 'Auto', image: '🏎️' }
  ];

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const days = calculateDays();
  const selectedCarData = cars.find(c => c.id === selectedCar);
  const totalPrice = selectedCarData.pricePerDay * days;

  const handlePlaceSelect = (place, type) => {
    if (type === 'pickup') { setPickup(place); setShowPickupSuggestions(false); }
    else { setDropoff(place); setShowDropoffSuggestions(false); }
  };

  const handleBooking = () => {
    if (pickup && startDate && endDate) {
      setIsBooking(true);
      setTimeout(() => {
        alert(`✅ Car rented successfully!\n\nCar: ${selectedCarData.name}\nPickup: ${pickup}\nFrom: ${startDate}\nTo: ${endDate}\nTotal Days: ${days}\nTotal: ৳${totalPrice}\n\nYour car will be ready for pickup!`);
        setIsBooking(false);
      }, 1500);
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-gray-800">Rent a Car</h1><p className="text-gray-500 mt-2">Drive your dream car at affordable prices</p></div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">🚗</span>Select Your Car</h2>
              <div className="grid grid-cols-3 gap-4">
                {cars.map((car) => (
                  <button key={car.id} onClick={() => setSelectedCar(car.id)} className={`p-4 rounded-xl text-center transition-all ${selectedCar === car.id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <div className="text-4xl mb-2">{car.icon}</div>
                    <div className="font-bold">{car.name}</div>
                    <div className="text-sm">৳{car.pricePerDay}/day</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Rental Details</h2>
              <div className="space-y-4">
                <div className="relative"><label className="block text-gray-700 font-medium mb-2"><FaMapMarkerAlt className="inline mr-2 text-green-500" />Pickup Location</label><input type="text" value={pickup} onChange={(e) => { setPickup(e.target.value); setShowPickupSuggestions(true); }} placeholder="Enter pickup location" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                {showPickupSuggestions && pickup && (<div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1">{popularLocations.filter(loc => loc.toLowerCase().includes(pickup.toLowerCase())).map((loc, idx) => (<div key={idx} onClick={() => handlePlaceSelect(loc, 'pickup')} className="px-4 py-2 hover:bg-blue-50 cursor-pointer">{loc}</div>))}</div>)}</div>
                <div><label className="block text-gray-700 font-medium mb-2"><FaCalendarAlt className="inline mr-2 text-blue-600" />Start Date</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-gray-700 font-medium mb-2"><FaCalendarAlt className="inline mr-2 text-red-600" />End Date</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
              </div>
            </div>

            <button onClick={handleBooking} disabled={isBooking || !pickup || !startDate || !endDate} className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isBooking || !pickup || !startDate || !endDate ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'}`}>
              {isBooking ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Booking...</span> : `Rent Now - ৳${totalPrice} (${days} days)`}
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white"><h3 className="text-lg font-semibold mb-4">Rental Summary</h3><div className="space-y-2"><div className="flex justify-between"><span>{selectedCarData.name}</span><span>৳{selectedCarData.pricePerDay}/day</span></div><div className="flex justify-between"><span>Days</span><span>{days} days</span></div><div className="border-t border-blue-500 pt-2 mt-2"><div className="flex justify-between font-bold"><span>Total</span><span>৳{totalPrice}</span></div></div></div></div>
            <div className="bg-white rounded-2xl shadow-lg p-6"><h3 className="font-semibold text-gray-800 mb-3 flex items-center"><FaCar className="text-blue-600 mr-2" />Car Features</h3><ul className="space-y-2 text-sm text-gray-600"><li><FaUsers className="inline mr-2" />{selectedCarData.seats} Seats</li><li><FaGasPump className="inline mr-2" />Fuel Included</li><li><FaCogs className="inline mr-2" />{selectedCarData.transmission}</li></ul></div>
            <div className="bg-blue-50 rounded-2xl p-6 text-center"><FaHeadset className="text-3xl text-blue-600 mx-auto mb-3" /><h3 className="font-semibold text-gray-800">24/7 Support</h3><p className="text-sm text-gray-600 mt-1">Call: 09678-100800</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rentals;