import React from 'react';
import { FaShieldAlt, FaUserCheck, FaCar, FaPhone, FaShieldVirus, FaHeartbeat, FaLock, FaCheckCircle, FaHeadset, FaGlobe } from 'react-icons/fa';

const Safety = () => {
  const features = [
    { icon: <FaUserCheck />, title: "Verified Drivers", desc: "All drivers undergo background verification" },
    { icon: <FaCar />, title: "Real-time Tracking", desc: "Share your ride status with family" },
    { icon: <FaPhone />, title: "SOS Button", desc: "Emergency button for immediate help" },
    { icon: <FaLock />, title: "Secure Payments", desc: "Cashless & encrypted transactions" }
  ];

  const tips = [
    "Verify driver and vehicle before getting in",
    "Share your trip details with family/friends",
    "Keep emergency contacts handy",
    "Use the in-app emergency button if needed"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FaShieldAlt className="text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Safety Matters</h1>
          <p className="text-xl text-purple-100">We're committed to keeping you safe on every ride</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (<div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition"><div className="text-purple-600 text-4xl mb-3 flex justify-center">{feature.icon}</div><h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3><p className="text-gray-600">{feature.desc}</p></div>))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg"><h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><FaShieldVirus className="mr-2 text-purple-600" />Safety Guidelines</h2><ul className="space-y-3">{tips.map((tip, idx) => (<li key={idx} className="flex items-start"><FaCheckCircle className="text-green-500 mt-1 mr-2" /><span className="text-gray-700">{tip}</span></li>))}</ul></div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center"><FaHeadset className="text-5xl mx-auto mb-4" /><h2 className="text-2xl font-bold mb-4">Emergency Support</h2><p className="mb-2">24/7 Emergency Helpline</p><p className="text-3xl font-bold mb-4">13301</p><p className="text-sm">Available for all users</p></div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg text-center"><FaHeartbeat className="text-4xl text-purple-600 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-800 mb-4">Our Commitment</h2><p className="text-gray-600 max-w-3xl mx-auto">Zezus is dedicated to providing a safe and secure platform for all users. We continuously invest in safety features, driver training, and emergency response systems to ensure peace of mind on every ride.</p><div className="mt-6 flex justify-center gap-4 text-sm text-gray-500"><span>✓ 24/7 Monitoring</span><span>✓ Regular Driver Training</span><span>✓ Emergency Response Team</span></div></div>
      </div>
    </div>
  );
};

export default Safety;