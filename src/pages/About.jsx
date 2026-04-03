import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaCity, FaTrophy, FaCheckCircle, FaHeart, FaGlobe, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const stats = [
    { number: "10M+", label: "Happy Users", icon: <FaUsers /> },
    { number: "100+", label: "Cities", icon: <FaCity /> },
    { number: "50K+", label: "Daily Rides", icon: <FaRocket /> },
    { number: "1000+", label: "Team Members", icon: <FaTrophy /> }
  ];

  const values = [
    { icon: <FaShieldAlt className="text-3xl text-purple-600" />, title: "Safety First", desc: "Your safety is our top priority" },
    { icon: <FaHeart className="text-3xl text-purple-600" />, title: "Customer First", desc: "We put customers at the heart" },
    { icon: <FaGlobe className="text-3xl text-purple-600" />, title: "Global Vision", desc: "Connecting the world" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zezus</h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">We're on a mission to revolutionize urban transportation</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">To provide safe, affordable, and reliable transportation solutions for everyone, while creating economic opportunities for thousands of drivers across Bangladesh.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition">
              <div className="text-purple-600 text-4xl mb-3">{stat.icon}</div>
              <p className="text-2xl font-bold text-gray-800">{stat.number}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">Zezus was founded in 2020 with a simple vision: to make transportation accessible, affordable, and safe for everyone. What started as a small startup in Dhaka has now grown into one of Bangladesh's leading ride-sharing platforms.</p>
          <p className="text-gray-600">Today, we're proud to serve millions of users across the country, providing reliable rides, food delivery, and courier services at the tap of a button.</p>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
          <p className="mb-6">Be part of something bigger. Download the app today!</p>
          <Link to="/download" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Download App</Link>
        </div>
      </div>
    </div>
  );
};

export default About;