import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaClock, FaStar, FaSearch, FaDirections, FaBuilding, FaBus, FaHeadset } from 'react-icons/fa';

const HelpWalkin = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const centers = [
    { id: 1, name: 'Dhaka - Gulshan', address: 'House 00, Road 00, Gulshan 1, Dhaka', hours: '9:00 AM - 8:00 PM', phone: '09678-100801', map: 'https://maps.google.com', type: 'Main Center' },
    { id: 2, name: 'Dhaka - Dhanmondi', address: 'Shop 00, Shopping Mall, Dhanmondi 2, Dhaka', hours: '10:00 AM - 7:00 PM', phone: '09678-100802', map: 'https://maps.google.com', type: 'Branch' },
    { id: 3, name: 'Chittagong', address: 'Road 00, Agrabad Commercial Area, Chittagong', hours: '9:00 AM - 7:00 PM', phone: '09678-100803', map: 'https://maps.google.com', type: 'Main Center' },
    { id: 4, name: 'Sylhet', address: 'Zindabazar, Sylhet', hours: '9:00 AM - 6:00 PM', phone: '09678-100804', map: 'https://maps.google.com', type: 'Branch' }
  ];

  const services = ['Account Registration', 'Document Verification', 'Payment Issues', 'Technical Support', 'Complaint Resolution', 'Training Sessions'];

  const filteredCenters = centers.filter(center => center.name.toLowerCase().includes(searchTerm.toLowerCase()) || center.address.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Walk-In Support Centers</h1>
          <p className="text-lg text-blue-100 mb-6">Visit us for in-person assistance</p>
          <div className="max-w-md mx-auto relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by city..." className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300" /></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filteredCenters.map((center) => (<div key={center.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"><div className="flex items-start justify-between"><div className="flex-1"><div className="flex items-center"><FaBuilding className="text-blue-600 mr-2" /><h3 className="text-xl font-bold text-gray-800">{center.name}</h3><span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{center.type}</span></div><div className="mt-3 space-y-2"><div className="flex items-start"><FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" /><p className="text-gray-600">{center.address}</p></div><div className="flex items-center"><FaClock className="text-gray-400 mr-2" /><p className="text-gray-600">{center.hours}</p></div><div className="flex items-center"><FaPhone className="text-gray-400 mr-2" /><p className="text-gray-600">{center.phone}</p></div></div><button className="mt-4 flex items-center text-blue-600 font-medium"><FaDirections className="mr-2" />Get Directions →</button></div></div></div>))}
          </div>
          <div className="space-y-6"><div className="bg-blue-50 rounded-2xl p-6"><h3 className="text-xl font-bold text-gray-800 mb-4">Services Available</h3><ul className="space-y-2">{services.map((service, idx) => (<li key={idx} className="flex items-center"><FaStar className="text-blue-500 mr-2 text-sm" /><span className="text-gray-700">{service}</span></li>))}</ul></div><div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white text-center"><FaHeadset className="text-4xl mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">Before You Visit</h3><p className="text-sm mb-3">Bring your NID and relevant documents</p><FaClock className="inline mr-2" /><span className="text-sm">Peak hours: 4-7 PM</span></div></div>
        </div>
      </div>
    </div>
  );
};

export default HelpWalkin;