import React, { useState } from 'react';
import { FaUserPlus, FaMobile, FaIdCard, FaCheckCircle, FaArrowRight, FaDownload, FaGooglePlay, FaApple, FaHeadset } from 'react-icons/fa';

const HelpJoin = () => {
  const [activeTab, setActiveTab] = useState('rider');

  const steps = {
    rider: [
      { step: 1, title: 'Download App', desc: 'Download Zezus Captain app from Google Play or App Store', icon: <FaDownload /> },
      { step: 2, title: 'Register', desc: 'Sign up with your mobile number and verify OTP', icon: <FaUserPlus /> },
      { step: 3, title: 'Submit Documents', desc: 'Upload your NID, Driving License, and Vehicle Registration', icon: <FaIdCard /> },
      { step: 4, title: 'Get Verified', desc: 'Wait for verification (24-48 hours)', icon: <FaCheckCircle /> },
      { step: 5, title: 'Start Earning', desc: 'Accept rides and start earning', icon: <FaArrowRight /> }
    ],
    merchant: [
      { step: 1, title: 'Sign Up Online', desc: 'Visit our website and click Merchant Sign Up', icon: <FaUserPlus /> },
      { step: 2, title: 'Business Details', desc: 'Fill your business information and upload documents', icon: <FaIdCard /> },
      { step: 3, title: 'Agreement', desc: 'Sign the merchant agreement', icon: <FaCheckCircle /> },
      { step: 4, title: 'Onboarding', desc: 'Get trained by our team', icon: <FaArrowRight /> },
      { step: 5, title: 'Start Selling', desc: 'Start receiving orders', icon: <FaCheckCircle /> }
    ],
    user: [
      { step: 1, title: 'Download App', desc: 'Download Zezus app from app store', icon: <FaDownload /> },
      { step: 2, title: 'Sign Up', desc: 'Create your account with mobile number', icon: <FaUserPlus /> },
      { step: 3, title: 'Add Payment', desc: 'Add payment method (optional)', icon: <FaCheckCircle /> },
      { step: 4, title: 'Book Ride', desc: 'Start booking rides and deliveries', icon: <FaArrowRight /> }
    ]
  };

  const requirements = {
    rider: ['Valid NID', 'Driving License (for bike/car)', 'Vehicle Registration Paper', 'Tax Token', 'Bank Account'],
    merchant: ['Trade License', 'TIN Certificate', 'Bank Account', 'Shop/Business Photos', 'NID of Owner']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">How to Join Zezus</h1>
          <p className="text-lg text-purple-100 mb-6">Start your journey with Zezus today</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-4 mb-8"><button onClick={() => setActiveTab('rider')} className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'rider' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>🚴 Become a Rider</button><button onClick={() => setActiveTab('merchant')} className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'merchant' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>🏪 Become a Merchant</button><button onClick={() => setActiveTab('user')} className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === 'user' ? 'bg-purple-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>👤 Join as User</button></div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6"><h2 className="text-2xl font-bold text-gray-800 mb-6">Steps to Join</h2><div className="space-y-6">{steps[activeTab].map((step) => (<div key={step.step} className="flex items-start"><div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xl mr-4">{step.step}</div><div><h3 className="font-semibold text-gray-800 text-lg">{step.title}</h3><p className="text-gray-500 text-sm">{step.desc}</p></div></div>))}</div></div>

          <div className="space-y-6"><div className="bg-purple-50 rounded-2xl p-6"><h3 className="text-xl font-bold text-gray-800 mb-4">Requirements</h3><ul className="space-y-2">{requirements[activeTab]?.map((req, idx) => (<li key={idx} className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /><span className="text-gray-700">{req}</span></li>))}</ul></div><div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white text-center"><FaMobile className="text-4xl mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">Download the App</h3><div className="flex justify-center space-x-3 mt-4"><button className="bg-black text-white px-4 py-2 rounded-lg flex items-center"><FaGooglePlay className="mr-2" />Google Play</button><button className="bg-black text-white px-4 py-2 rounded-lg flex items-center"><FaApple className="mr-2" />App Store</button></div></div><div className="bg-white rounded-2xl p-6 text-center"><FaHeadset className="text-3xl text-purple-600 mx-auto mb-3" /><h3 className="font-semibold text-gray-800">Need Help?</h3><p className="text-purple-600 font-bold mt-1">Call: 09678-100800</p></div></div>
        </div>
      </div>
    </div>
  );
};

export default HelpJoin;