import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaPhone, FaComment, FaPaperPlane, FaHeadset, FaClock, FaCheckCircle } from 'react-icons/fa';

const HelpMessage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); setTimeout(() => setSubmitted(false), 3000); }, 1500);
  };

  const subjects = ['Account Issue', 'Payment Problem', 'Ride Issue', 'Delivery Issue', 'Technical Support', 'General Inquiry', 'Feedback', 'Complaint'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4 text-center"><h1 className="text-3xl md:text-4xl font-bold mb-3">Send us a Message</h1><p className="text-lg text-indigo-100 mb-6">We're here to help. Get in touch with us.</p></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {submitted ? (<div className="text-center py-8"><FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" /><h2 className="text-2xl font-bold text-gray-800">Message Sent!</h2><p className="text-gray-600 mt-2">We'll get back to you within 24 hours.</p></div>) : (<form onSubmit={handleSubmit}><div className="grid md:grid-cols-2 gap-4"><div><label className="block text-gray-700 font-medium mb-2"><FaUser className="inline mr-2" />Your Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" /></div><div><label className="block text-gray-700 font-medium mb-2"><FaEnvelope className="inline mr-2" />Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" /></div></div><div className="mt-4"><label className="block text-gray-700 font-medium mb-2"><FaPhone className="inline mr-2" />Phone Number</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" /></div><div className="mt-4"><label className="block text-gray-700 font-medium mb-2">Subject *</label><select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"><option value="">Select a subject</option>{subjects.map((sub) => (<option key={sub} value={sub}>{sub}</option>))}</select></div><div className="mt-4"><label className="block text-gray-700 font-medium mb-2"><FaComment className="inline mr-2" />Message *</label><textarea name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="Please describe your issue in detail..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"></textarea></div><button type="submit" disabled={loading} className={`mt-6 w-full py-3 rounded-xl font-semibold text-lg transition ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'}`}>{loading ? <span className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Sending...</span> : <span className="flex items-center justify-center"><FaPaperPlane className="mr-2" />Send Message</span>}</button></form>)}
          </div>

          <div className="space-y-6"><div className="bg-indigo-50 rounded-2xl p-6"><h3 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h3><div className="space-y-4"><div className="flex items-start"><FaHeadset className="text-indigo-600 text-xl mr-3 mt-1" /><div><h4 className="font-semibold text-gray-800">Customer Support</h4><p className="text-gray-600">01755-100800</p><p className="text-sm text-gray-500">24/7 Available</p></div></div><div className="flex items-start"><FaEnvelope className="text-indigo-600 text-xl mr-3 mt-1" /><div><h4 className="font-semibold text-gray-800">Email Us</h4><p className="text-gray-600">support@zezus.com</p><p className="text-sm text-gray-500">Reply within 24h</p></div></div><div className="flex items-start"><FaClock className="text-indigo-600 text-xl mr-3 mt-1" /><div><h4 className="font-semibold text-gray-800">Response Time</h4><p className="text-gray-600">Within 24 hours</p><p className="text-sm text-gray-500">Mon-Sun</p></div></div></div></div><div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white text-center"><h3 className="text-xl font-bold mb-2">Live Chat Available</h3><p className="text-sm mb-3">Get instant help from our support team</p><button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold">Start Live Chat →</button></div></div>
        </div>
      </div>
    </div>
  );
};

export default HelpMessage;