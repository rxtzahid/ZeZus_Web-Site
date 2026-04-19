import React, { useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaGraduationCap, FaHeart, FaUsers, FaRocket, FaSearch } from 'react-icons/fa';

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('all');

  const jobs = [
    { id: 1, title: "Senior Software Engineer", department: "Engineering", location: "Dhaka", type: "Full-time", experience: "3-5 years", salary: "Competitive" },
    { id: 2, title: "Product Manager", department: "Product", location: "Dhaka", type: "Full-time", experience: "2-4 years", salary: "Competitive" },
    { id: 3, title: "Marketing Specialist", department: "Marketing", location: "Dhaka", type: "Full-time", experience: "1-3 years", salary: "Competitive" },
    { id: 4, title: "Customer Support Executive", department: "Support", location: "Dhaka", type: "Full-time", experience: "0-2 years", salary: "Competitive" },
    { id: 5, title: "Data Analyst", department: "Data", location: "Dhaka", type: "Full-time", experience: "2-4 years", salary: "Competitive" },
    { id: 6, title: "UI/UX Designer", department: "Design", location: "Dhaka", type: "Full-time", experience: "2-3 years", salary: "Competitive" }
  ];

  const departments = ['all', 'Engineering', 'Product', 'Marketing', 'Support', 'Data', 'Design'];

  const filteredJobs = jobs.filter(job => 
    (department === 'all' || job.department === department) &&
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl text-purple-100">Build the future of transportation with us</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Why Join Us */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Join Zezus?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Be part of a fast-growing company that's changing the way people move</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg"><FaRocket className="text-4xl text-purple-600 mx-auto mb-3" /><h3 className="text-xl font-bold text-gray-800 mb-2">Growth</h3><p className="text-gray-600">Rapid career growth opportunities</p></div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg"><FaUsers className="text-4xl text-purple-600 mx-auto mb-3" /><h3 className="text-xl font-bold text-gray-800 mb-2">Great Culture</h3><p className="text-gray-600">Collaborative and inclusive environment</p></div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg"><FaHeart className="text-4xl text-purple-600 mx-auto mb-3" /><h3 className="text-xl font-bold text-gray-800 mb-2">Benefits</h3><p className="text-gray-600">Competitive salary and benefits</p></div>
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Open Positions</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search jobs..." className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600" /></div>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"><option value="all">All Departments</option>{departments.slice(1).map(dept => (<option key={dept} value={dept}>{dept}</option>))}</select>
        </div>

        <div className="space-y-4">
          {filteredJobs.map(job => (<div key={job.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition"><div className="flex flex-col md:flex-row justify-between items-start md:items-center"><div><h3 className="text-xl font-bold text-gray-800">{job.title}</h3><div className="flex flex-wrap gap-3 mt-2"><span className="flex items-center text-sm text-gray-500"><FaBriefcase className="mr-1" />{job.department}</span><span className="flex items-center text-sm text-gray-500"><FaMapMarkerAlt className="mr-1" />{job.location}</span><span className="flex items-center text-sm text-gray-500"><FaClock className="mr-1" />{job.type}</span><span className="flex items-center text-sm text-gray-500"><FaGraduationCap className="mr-1" />{job.experience}</span></div></div><button className="mt-3 md:mt-0 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">Apply Now →</button></div></div>))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-center text-white"><h2 className="text-2xl font-bold mb-4">Don't see the right role?</h2><p className="mb-6">Send us your resume and we'll keep you in mind</p><button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Send Resume →</button></div>
      </div>
    </div>
  );
};

export default Careers;