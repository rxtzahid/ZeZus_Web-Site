import React from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple, FaQrcode, FaMobileAlt, FaShieldAlt, FaRocket, FaClock, FaDownload, FaArrowRight } from 'react-icons/fa';

const AppPage = () => {
  const features = [
    { icon: <FaRocket className="text-3xl text-purple-600" />, title: "Fast Booking", desc: "Book rides in seconds" },
    { icon: <FaShieldAlt className="text-3xl text-purple-600" />, title: "Safe Rides", desc: "GPS tracked & verified" },
    { icon: <FaClock className="text-3xl text-purple-600" />, title: "24/7 Support", desc: "Always here to help" },
    { icon: <FaMobileAlt className="text-3xl text-purple-600" />, title: "Easy Payment", desc: "Multiple payment options" }
  ];

  const steps = [
    { step: 1, title: "Download the App", desc: "Get it from Google Play or App Store" },
    { step: 2, title: "Create Account", desc: "Sign up with your mobile number" },
    { step: 3, title: "Start Riding", desc: "Book your first ride instantly" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FaDownload className="text-6xl mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Download Zezus App</h1>
          <p className="text-xl text-purple-100 mb-8">Get the best ride-sharing experience on your phone</p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition"
            >
              <FaGooglePlay className="text-2xl" />
              <div className="text-left">
                <p className="text-xs">GET IT ON</p>
                <p className="text-lg font-semibold">Google Play</p>
              </div>
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-black text-white px-6 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition"
            >
              <FaApple className="text-2xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-lg font-semibold">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* Features Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Zezus App?</h2>
          <p className="text-gray-600">Everything you need in one powerful app</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition group">
              <div className="mb-4 group-hover:scale-110 transition">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* How to Get Started */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold text-center mb-8">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-purple-200 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="w-40 h-40 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto">
              <FaQrcode className="text-6xl text-gray-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Scan to download</p>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Get the App Now!</h3>
            <p className="text-gray-600 mb-4">Scan the QR code with your phone camera</p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold flex items-center">
                Google Play <FaArrowRight className="ml-1" />
              </a>
              <span className="text-gray-300">|</span>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="text-purple-600 font-semibold flex items-center">
                App Store <FaArrowRight className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-center">
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-2xl font-bold text-purple-600">10M+</p>
            <p className="text-sm text-gray-500">Downloads</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-2xl font-bold text-purple-600">4.8★</p>
            <p className="text-sm text-gray-500">User Rating</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-2xl font-bold text-purple-600">50K+</p>
            <p className="text-sm text-gray-500">Daily Rides</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow">
            <p className="text-2xl font-bold text-purple-600">100+</p>
            <p className="text-sm text-gray-500">Cities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;