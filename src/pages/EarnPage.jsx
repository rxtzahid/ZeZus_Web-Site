import React, { useState } from 'react';
import { FaArrowRight, FaCheckCircle, FaFileAlt, FaIdCard } from 'react-icons/fa';

const EarnPage = () => {
  // URL থেকে শেষ অংশটা বের করুন
  const path = window.location.pathname;
  let vehicleType = 'bike';
  
  if (path.includes('car')) {
    vehicleType = 'car';
  } else if (path.includes('cycle')) {
    vehicleType = 'cycle';
  } else if (path.includes('bike')) {
    vehicleType = 'bike';
  }
  
  console.log("Vehicle type:", vehicleType);

  // Bike Data
  const bikeData = {
    title: 'Earn with Your Bike',
    subTitle: 'Become a rider on the highest earning platform!',
    vehicleType: 'Bike',
    services: ['Bike Rider', 'Food Man', 'Parcel Delivery'],
    bgColor: 'from-green-500 to-green-700',
    icon: '🏍️',
    tagline: 'Zezus Bike: Easy Income'
  };

  // Car Data
  const carData = {
    title: 'Earn with Your Car',
    subTitle: 'Become a captain on the highest earning platform!',
    vehicleType: 'Car',
    services: ['Car Rider', 'Private Hire', 'Airport Transfer', 'Car Rentals'],
    bgColor: 'from-blue-500 to-blue-700',
    icon: '🚗',
    tagline: 'Zezus Car: Flexible Hours, More Earnings'
  };

  // Cycle Data
  const cycleData = {
    title: 'Earn with Your Cycle',
    subTitle: 'Become a cyclist on the highest earning platform!',
    vehicleType: 'Cycle',
    services: ['Cycle Rider', 'Food Delivery', 'Small Parcel'],
    bgColor: 'from-yellow-500 to-yellow-700',
    icon: '🚲',
    tagline: 'Zezus Cycle: Eco-friendly Earning'
  };

  // Vehicle type অনুযায়ী ডাটা নির্বাচন
  let data;
  if (vehicleType === 'car') {
    data = carData;
  } else if (vehicleType === 'cycle') {
    data = cycleData;
  } else {
    data = bikeData;
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${data.vehicleType}!`);
  };

  const requirements = [
    { icon: <FaIdCard />, text: "Original copy of National Identity Card" },
    { icon: <FaFileAlt />, text: "Driving License (Professional / Non-Professional)" },
    { icon: <FaFileAlt />, text: "Vehicle Registration Paper" },
    { icon: <FaFileAlt />, text: "Tax Token" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${data.bgColor} rounded-2xl p-8 text-white text-center mb-10`}>
          <div className="text-6xl mb-4">{data.icon}</div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.title}</h1>
          <p className="text-lg opacity-90">{data.subTitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Left Side - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              Register Now
              <span className="ml-2 text-sm bg-purple-100 text-purple-600 px-2 py-1 rounded">Join Zezus</span>
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Vehicle Type */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Vehicle Type <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2 p-3 bg-gray-100 rounded-lg">
                  <span className="text-2xl">{data.icon}</span>
                  <span className="font-medium text-gray-800">{data.vehicleType}</span>
                </div>
              </div>

              {/* First Name */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Mobile Number */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              {/* City */}
              <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="">Select City</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700 transition flex items-center justify-center space-x-2"
              >
                <span>Next Step</span>
                <FaArrowRight />
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By clicking this button, you are agreeing to Zezus's terms and privacy policy
              </p>
            </form>
          </div>

          {/* Right Side */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                What is required to apply
              </h3>
              <p className="text-gray-600 mb-4">
                Not sure if you're eligible to be a {data.vehicleType.toLowerCase()}? If you have the following, you can join us!
              </p>
              
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-purple-600 text-xl">
                      {req.icon}
                    </div>
                    <span className="text-gray-700">{req.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-green-700 text-sm flex items-center">
                  <span className="font-bold mr-1">New!</span> Message on WhatsApp to rent a vehicle instantly.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-3xl mr-2">{data.icon}</span>
                Got a {data.vehicleType}?
              </h3>
              <p className="text-gray-600 mb-4">
                These are the services you can be a part of!
              </p>
              
              <div className="space-y-2 mb-4">
                {data.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border-b border-purple-200">
                    <span className="text-gray-700">{service}</span>
                    <span className="text-purple-600 text-sm font-semibold">Apply →</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg">
                <p className="text-gray-800 font-medium">{data.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnPage;