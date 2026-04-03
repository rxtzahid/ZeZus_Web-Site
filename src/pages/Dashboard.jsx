import React, { useState } from 'react';
import { FaUser, FaHistory, FaWallet, FaCreditCard, FaCog, FaSignOutAlt, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaStar, FaPhone, FaEnvelope, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import PlacesAutocomplete from '../components/PlacesAutocomplete';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);
  const [fare, setFare] = useState(null);

  const user = {
    name: "zahid ",
    email: "zh@example.com",
    phone: "01798765478",
    memberSince: "January 2024",
    rating: 4.8,
    totalRides: 47,
    totalSpent: 3450
  };

  const recentRides = [
    { id: 1, from: "Uttara", to: "Gulshan", date: "2024-03-15", time: "09:30 AM", fare: 180, status: "Completed", driver: "Karim" },
    { id: 2, from: "Dhanmondi", to: "Mirpur", date: "2024-03-14", time: "06:45 PM", fare: 220, status: "Completed", driver: "Rafiq" },
    { id: 3, from: "Banani", to: "Airport", date: "2024-03-13", time: "02:15 PM", fare: 350, status: "Completed", driver: "Shahin" }
  ];

  const calculateFare = () => {
    if (pickup && dropoff) {
      // Mock fare calculation - in real app, use Google Maps distance
      const distance = Math.floor(Math.random() * 15) + 5;
      const calculatedFare = distance * 25;
      setFare(calculatedFare);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <FaUser /> },
    { id: 'rides', name: 'Ride History', icon: <FaHistory /> },
    { id: 'wallet', name: 'Wallet', icon: <FaWallet /> },
    { id: 'payment', name: 'Payment', icon: <FaCreditCard /> },
    { id: 'settings', name: 'Settings', icon: <FaCog /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl text-purple-600">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-purple-200">Member since {user.memberSince}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-2xl font-bold">{user.totalRides}</p>
                <p className="text-sm text-purple-200">Total Rides</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">৳{user.totalSpent}</p>
                <p className="text-sm text-purple-200">Total Spent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold flex items-center">{user.rating} <FaStar className="ml-1 text-yellow-400" /></p>
                <p className="text-sm text-purple-200">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                  <FaEdit /> <span>Edit Profile</span>
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <FaUser className="text-purple-600" />
                    <div><p className="text-sm text-gray-500">Full Name</p><p className="font-semibold">{user.name}</p></div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <FaEnvelope className="text-purple-600" />
                    <div><p className="text-sm text-gray-500">Email</p><p className="font-semibold">{user.email}</p></div>
                  </div>
                  <div className="flex items-center space-x-3 pb-3 border-b">
                    <FaPhone className="text-purple-600" />
                    <div><p className="text-sm text-gray-500">Phone</p><p className="font-semibold">{user.phone}</p></div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Quick Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-2xl font-bold text-purple-600">{user.totalRides}</p><p className="text-xs text-gray-500">Total Rides</p></div>
                    <div><p className="text-2xl font-bold text-purple-600">৳{user.totalSpent}</p><p className="text-xs text-gray-500">Total Spent</p></div>
                    <div><p className="text-2xl font-bold text-purple-600">{user.rating}★</p><p className="text-xs text-gray-500">Rating</p></div>
                    <div><p className="text-2xl font-bold text-purple-600">100%</p><p className="text-xs text-gray-500">Completion</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Ride History Tab */}
          {activeTab === 'rides' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ride History</h2>
              <div className="space-y-4">
                {recentRides.map((ride) => (
                  <div key={ride.id} className="border rounded-xl p-4 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="font-semibold text-gray-800">{ride.from}</span>
                          <span className="text-gray-400">→</span>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="font-semibold text-gray-800">{ride.to}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center"><FaCalendarAlt className="mr-1" />{ride.date}</span>
                          <span className="flex items-center"><FaClock className="mr-1" />{ride.time}</span>
                          <span>Driver: {ride.driver}</span>
                        </div>
                      </div>
                      <div className="text-right mt-3 md:mt-0">
                        <p className="text-xl font-bold text-purple-600">৳{ride.fare}</p>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">{ride.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div>
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white mb-6">
                <p className="text-sm opacity-80">Available Balance</p>
                <p className="text-4xl font-bold">৳1,250.00</p>
                <div className="flex gap-3 mt-4">
                  <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">Add Money</button>
                  <button className="border border-white px-4 py-2 rounded-lg">Withdraw</button>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-4">Transaction History</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border-b"><div><p className="font-semibold">Added to Wallet</p><p className="text-xs text-gray-500">Mar 15, 2024</p></div><p className="text-green-600 font-bold">+৳500</p></div>
                <div className="flex justify-between items-center p-3 border-b"><div><p className="font-semibold">Ride Payment</p><p className="text-xs text-gray-500">Mar 14, 2024</p></div><p className="text-red-600 font-bold">-৳180</p></div>
                <div className="flex justify-between items-center p-3 border-b"><div><p className="font-semibold">Cashback Bonus</p><p className="text-xs text-gray-500">Mar 13, 2024</p></div><p className="text-green-600 font-bold">+৳50</p></div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">💰</div><div><p className="font-semibold">bKash</p><p className="text-sm text-gray-500">017XXXXXXXX</p></div></div><button className="text-purple-600">Edit</button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div className="flex items-center space-x-3"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">💳</div><div><p className="font-semibold">Visa Card</p><p className="text-sm text-gray-500">**** **** **** 1234</p></div></div><button className="text-purple-600">Edit</button>
                </div>
              </div>
              <button className="w-full border-2 border-dashed border-purple-300 rounded-xl p-4 text-purple-600 font-semibold hover:bg-purple-50 transition">+ Add New Payment Method</button>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-xl"><div><p className="font-semibold">Notifications</p><p className="text-sm text-gray-500">Receive ride updates and offers</p></div><button className="relative inline-flex h-6 w-11 items-center rounded-full bg-purple-600"><span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white transition"></span></button></div>
                <div className="flex justify-between items-center p-4 border rounded-xl"><div><p className="font-semibold">Language</p><p className="text-sm text-gray-500">English / বাংলা</p></div><button className="text-purple-600">Change</button></div>
                <div className="flex justify-between items-center p-4 border rounded-xl"><div><p className="font-semibold">Privacy</p><p className="text-sm text-gray-500">Manage your data</p></div><button className="text-purple-600">View</button></div>
                <button className="w-full flex items-center justify-center space-x-2 text-red-600 border border-red-300 rounded-xl p-4 hover:bg-red-50 transition"><FaSignOutAlt /><span>Sign Out</span></button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Ride Section with Map */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Ride</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <PlacesAutocomplete onSelect={setPickup} placeholder="Enter pickup location" label="Pickup Location" />
              <PlacesAutocomplete onSelect={setDropoff} placeholder="Enter dropoff location" label="Dropoff Location" />
              <button onClick={calculateFare} className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition">Calculate Fare</button>
              {fare && <div className="bg-purple-50 rounded-lg p-4 text-center"><p className="text-gray-600">Estimated Fare</p><p className="text-2xl font-bold text-purple-600">৳{fare}</p><button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg">Book Now</button></div>}
            </div>
            <div><Map pickup={pickup} dropoff={dropoff} /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;