import React, { useState } from 'react';
import { FaNewspaper, FaCalendarAlt, FaDownload, FaShare, FaSearch, FaExternalLinkAlt } from 'react-icons/fa';

const Press = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const news = [
    { id: 1, title: "Zezus Raises $50M in Series B Funding", date: "March 15, 2024", category: "Funding", excerpt: "Leading ride-sharing platform Zezus announces $50M funding round to expand operations across Bangladesh." },
    { id: 2, title: "Zezus Launches Eco-Friendly Cycle Service", date: "February 28, 2024", category: "Product", excerpt: "New green initiative aims to reduce carbon emissions and promote sustainable transportation." },
    { id: 3, title: "Zezus Named Best Startup of 2024", date: "January 20, 2024", category: "Award", excerpt: "Zezus recognized for innovation and impact in the transportation sector." },
    { id: 4, title: "Zezus Partners with Local Restaurants", date: "January 5, 2024", category: "Partnership", excerpt: "New partnership brings over 500 restaurants to Zezus Food platform." }
  ];

  const mediaResources = [
    { name: "Brand Logo Pack", size: "2.5 MB", icon: "🎨" },
    { name: "Press Kit 2024", size: "5.1 MB", icon: "📦" },
    { name: "Company Fact Sheet", size: "1.2 MB", icon: "📄" }
  ];

  const filteredNews = news.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Press & News</h1>
          <p className="text-xl text-purple-100">Latest news and updates from Zezus</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8"><div className="relative flex-1"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search news..." className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600" /></div></div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredNews.map(item => (<div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"><div className="flex items-center gap-2 text-sm text-purple-600 mb-2"><FaCalendarAlt /><span>{item.date}</span><span className="bg-purple-100 px-2 py-1 rounded-full text-xs">{item.category}</span></div><h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3><p className="text-gray-600 mb-4">{item.excerpt}</p><button className="text-purple-600 font-semibold flex items-center">Read More <FaExternalLinkAlt className="ml-2 text-sm" /></button></div>))}
        </div>

        {/* Media Resources */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12"><h2 className="text-2xl font-bold text-gray-800 mb-6">Media Resources</h2><div className="grid md:grid-cols-3 gap-4">{mediaResources.map((resource, idx) => (<div key={idx} className="border rounded-xl p-4 flex items-center justify-between"><div className="flex items-center gap-3"><span className="text-2xl">{resource.icon}</span><div><p className="font-semibold text-gray-800">{resource.name}</p><p className="text-xs text-gray-500">{resource.size}</p></div></div><button className="text-purple-600"><FaDownload /></button></div>))}</div><div className="mt-6 text-center"><button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition">View All Resources →</button></div></div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white"><h2 className="text-2xl font-bold mb-4">Media Inquiries</h2><p className="mb-4">For press-related questions, please contact our media team</p><p className="text-xl font-semibold">media@zezus.com</p><p className="mt-2">+880 9678-100800</p></div>
      </div>
    </div>
  );
};

export default Press;