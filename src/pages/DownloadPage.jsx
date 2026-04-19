import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGooglePlay, FaApple, FaQrcode, FaMobileAlt, FaShieldAlt, FaRocket, FaClock, FaDownload, FaArrowRight, FaCheckCircle, FaStar, FaUsers, FaCity, FaHeadset, FaCamera, FaCopy, FaShare } from 'react-icons/fa';

const DownloadPage = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "ZEZUS2024";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <FaRocket className="text-3xl text-purple-600" />, title: "Fast Booking", desc: "Book rides in seconds" },
    { icon: <FaShieldAlt className="text-3xl text-purple-600" />, title: "Safe Rides", desc: "GPS tracked & verified" },
    { icon: <FaClock className="text-3xl text-purple-600" />, title: "24/7 Support", desc: "Always here to help" },
    { icon: <FaMobileAlt className="text-3xl text-purple-600" />, title: "Easy Payment", desc: "Multiple payment options" }
  ];

  const stats = [
    { number: "10M+", label: "Downloads", icon: <FaDownload /> },
    { number: "4.8★", label: "User Rating", icon: <FaStar /> },
    { number: "50K+", label: "Daily Rides", icon: <FaUsers /> },
    { number: "100+", label: "Cities", icon: <FaCity /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-bounce mb-4">
            <FaDownload className="text-7xl mx-auto" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Download Zezus App</h1>
          <p className="text-xl text-purple-100 mb-4 max-w-2xl mx-auto">
            Get the best ride-sharing experience on your phone
          </p>
          <p className="text-purple-200 mb-8">Fast, Safe & Affordable Rides at Your Fingertips</p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://play.google.com/store" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition transform hover:scale-105 duration-300"
            >
              <FaGooglePlay className="text-3xl" />
              <div className="text-left">
                <p className="text-xs">GET IT ON</p>
                <p className="text-xl font-semibold">Google Play</p>
              </div>
            </a>
            <a 
              href="https://www.apple.com/app-store/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-black text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-900 transition transform hover:scale-105 duration-300"
            >
              <FaApple className="text-3xl" />
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-xl font-semibold">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition group">
              <div className="text-purple-600 text-3xl mb-3 group-hover:scale-110 transition">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Zezus App?</h2>
          <p className="text-gray-600">Everything you need in one powerful app</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition group cursor-pointer">
              <div className="mb-4 group-hover:scale-110 transition duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* QR Code & Referral Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* QR Code Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <FaQrcode className="text-8xl text-purple-600" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                  <FaCamera className="text-white text-xs" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Scan to Download</h3>
            <p className="text-gray-500 text-sm">Open your camera and scan the QR code</p>
          </div>

          {/* Referral Code Card */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 shadow-lg text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Get ₹100 Free!</h3>
            <p className="mb-4">Use referral code while signing up</p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-xl text-2xl font-mono tracking-wider">
                {referralCode}
              </div>
              <button 
                onClick={copyToClipboard}
                className="bg-white text-purple-600 p-3 rounded-xl hover:bg-gray-100 transition"
              >
                {copied ? <FaCheckCircle /> : <FaCopy />}
              </button>
            </div>
            <p className="text-sm text-purple-200">Share with friends and earn rewards!</p>
            <div className="flex justify-center gap-3 mt-4">
              <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                <FaShare />
              </button>
            </div>
          </div>
        </div>

        {/* How to Install Section */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">How to Install Zezus App</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">1</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Download</h3>
              <p className="text-gray-600 text-sm">Get the app from Google Play or App Store</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">2</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Install</h3>
              <p className="text-gray-600 text-sm">Click install and wait for the download</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">3</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sign Up</h3>
              <p className="text-gray-600 text-sm">Create account and start your first ride</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-gray-600">Join millions of satisfied users</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex text-yellow-500 mb-3">★★★★★</div>
            <p className="text-gray-600 mb-4">"Best ride-sharing app in Bangladesh! Very affordable and safe."</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">👨</div>
              <div><p className="font-semibold text-gray-800">Rahim Khan</p><p className="text-xs text-gray-500">Dhaka</p></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex text-yellow-500 mb-3">★★★★★</div>
            <p className="text-gray-600 mb-4">"Quick service and professional drivers. Highly recommended!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">👩</div>
              <div><p className="font-semibold text-gray-800">Fatema Begum</p><p className="text-xs text-gray-500">Chittagong</p></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex text-yellow-500 mb-3">★★★★★</div>
            <p className="text-gray-600 mb-4">"Easy to use app and great customer support. Love it!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">👨</div>
              <div><p className="font-semibold text-gray-800">Shahidul Islam</p><p className="text-xs text-gray-500">Sylhet</p></div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div><h3 className="font-semibold text-gray-800 mb-2">Is Zezus app free?</h3><p className="text-gray-600 text-sm">Yes, the app is completely free to download and install.</p></div>
            <div><h3 className="font-semibold text-gray-800 mb-2">Which platforms are supported?</h3><p className="text-gray-600 text-sm">Android (Google Play) and iOS (App Store).</p></div>
            <div><h3 className="font-semibold text-gray-800 mb-2">How do I update the app?</h3><p className="text-gray-600 text-sm">Updates are automatic from your app store.</p></div>
            <div><h3 className="font-semibold text-gray-800 mb-2">Is my data secure?</h3><p className="text-gray-600 text-sm">Yes, we use industry-standard encryption.</p></div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-purple-100 mb-6">Download Zezus app now and get your first ride free!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2">
              <FaGooglePlay /> Download Now
            </a>
            <Link to="/" className="bg-transparent border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;