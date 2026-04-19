import React, { useState } from 'react';
import { FaSearch, FaMotorcycle, FaCar, FaBicycle, FaMoneyBillWave, FaShieldAlt, FaHeadset, FaEnvelope, FaPhone, FaComments, FaStar, FaArrowRight, FaChartLine, FaUserCheck, FaQuestionCircle } from 'react-icons/fa';

const HelpRider = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaQuestionCircle /> },
    { id: 'earning', name: 'Earnings', icon: <FaMoneyBillWave /> },
    { id: 'riding', name: 'Riding Tips', icon: <FaMotorcycle /> },
    { id: 'safety', name: 'Safety', icon: <FaShieldAlt /> },
    { id: 'account', name: 'Account', icon: <FaUserCheck /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'earning',
      question: 'How do I start earning with Zezus?',
      answer: 'Download the Zezus Captain app, complete your registration with valid documents (NID, Driving License, Vehicle Registration), and after verification, you can start accepting rides.'
    },
    {
      id: 2,
      category: 'earning',
      question: 'When will I receive my earnings?',
      answer: 'Your earnings are settled weekly every Thursday. You can withdraw your earnings to your bank account or mobile wallet anytime after settlement.'
    },
    {
      id: 3,
      category: 'earning',
      question: 'How is the fare calculated?',
      answer: 'Fare is calculated based on distance (per km rate) + base fare + waiting time + surge pricing during peak hours.'
    },
    {
      id: 4,
      category: 'riding',
      question: 'How do I accept a ride request?',
      answer: 'When you receive a ride request, tap on "Accept" within 15 seconds. Make sure you have good internet connection.'
    },
    {
      id: 5,
      category: 'riding',
      question: 'What should I do if a passenger cancels?',
      answer: 'If a passenger cancels after you\'ve arrived, you will receive a cancellation fee. Always mark "Arrived" when you reach the pickup point.'
    },
    {
      id: 6,
      category: 'safety',
      question: 'How does Zezus ensure rider safety?',
      answer: 'We provide emergency SOS button, real-time trip tracking, passenger verification, and 24/7 support team.'
    },
    {
      id: 7,
      category: 'account',
      question: 'How do I update my vehicle information?',
      answer: 'Go to Account Settings → Vehicle Info → Update details → Submit for verification. Changes will be reviewed within 24 hours.'
    }
  ];

  const riderTips = [
    { title: 'Keep your documents ready', desc: 'Always carry your NID, driving license, and vehicle papers' },
    { title: 'Maintain high rating', desc: 'Be polite, drive safely, and keep your vehicle clean' },
    { title: 'Maximize earnings', desc: 'Drive during peak hours (8-10 AM, 6-9 PM) for bonus earnings' },
    { title: 'Stay safe', desc: 'Use the emergency button if you feel unsafe during a trip' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Rider/Captain/Cyclist Help Center</h1>
          <p className="text-lg text-green-100 mb-6">Everything you need to know about earning with Zezus</p>
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for help..." className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white text-center"><FaMotorcycle className="text-3xl mx-auto mb-2" /><h3 className="font-bold">Bike Riders</h3><p className="text-sm">Join as a bike rider</p></div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center"><FaCar className="text-3xl mx-auto mb-2" /><h3 className="font-bold">Car Captains</h3><p className="text-sm">Join as a car captain</p></div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-4 text-white text-center"><FaBicycle className="text-3xl mx-auto mb-2" /><h3 className="font-bold">Cyclists</h3><p className="text-sm">Join as a cyclist</p></div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white text-center"><FaChartLine className="text-3xl mx-auto mb-2" /><h3 className="font-bold">Earnings</h3><p className="text-sm">Maximize your income</p></div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b"><h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2></div>
          <div className="flex flex-wrap gap-2 p-4 border-b bg-gray-50">
            {categories.map((cat) => (<button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${activeCategory === cat.id ? 'bg-green-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{cat.icon}<span>{cat.name}</span></button>))}
          </div>
          <div className="divide-y">
            {filteredFaqs.map((faq) => (<div key={faq.id} className="p-4"><button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="w-full text-left flex justify-between items-center"><span className="font-semibold text-gray-800">{faq.question}</span><span className="text-green-600 text-xl">{openFaq === faq.id ? '−' : '+'}</span></button>{openFaq === faq.id && (<div className="mt-3 pl-4 border-l-4 border-green-500"><p className="text-gray-600">{faq.answer}</p></div>)}</div>))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-2xl p-6"><h3 className="text-xl font-bold text-gray-800 mb-4">Pro Tips for Riders</h3><ul className="space-y-3">{riderTips.map((tip, idx) => (<li key={idx} className="flex items-start"><FaStar className="text-green-500 mt-1 mr-2 flex-shrink-0" /><div><h4 className="font-semibold text-gray-800">{tip.title}</h4><p className="text-sm text-gray-600">{tip.desc}</p></div></li>))}</ul></div>
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white text-center"><FaHeadset className="text-4xl mx-auto mb-3" /><h3 className="text-xl font-bold mb-2">Rider Support</h3><p className="mb-3">Call us for immediate assistance</p><p className="text-2xl font-bold">09678-100800</p><p className="text-sm mt-2">24/7 dedicated rider support</p></div>
        </div>
      </div>
    </div>
  );
};

export default HelpRider;