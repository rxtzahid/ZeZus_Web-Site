import React, { useState } from 'react';
import { FaSearch, FaStore, FaBox, FaMoneyBillWave, FaChartLine, FaHeadset, FaEnvelope, FaPhone, FaComments, FaStar, FaBuilding, FaUserPlus } from 'react-icons/fa';

const HelpMerchant = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { id: 1, question: 'How do I register as a merchant?', answer: 'Visit our website → Click "Merchant Sign Up" → Fill your business details → Submit documents → Wait for verification (24-48 hours).' },
    { id: 2, question: 'What are the merchant fees?', answer: 'We charge 10-15% commission per order depending on your business category and order volume. Contact our merchant support for customized plans.' },
    { id: 3, question: 'How do I receive payments?', answer: 'Payments are settled weekly to your bank account. You can also request early settlement for a small fee.' },
    { id: 4, question: 'How do I manage orders?', answer: 'Use the Zezus Merchant Dashboard to view, accept, and track all orders. You can also update menu items and offers.' },
    { id: 5, question: 'What if a delivery is delayed?', answer: 'Contact our merchant support immediately. We have a dedicated team to handle delivery issues.' }
  ];

  const merchantBenefits = [
    { icon: <FaStore />, title: 'Wider Reach', desc: 'Connect with thousands of customers' },
    { icon: <FaChartLine />, title: 'Increase Sales', desc: 'Boost your business revenue' },
    { icon: <FaMoneyBillWave />, title: 'Fast Settlement', desc: 'Weekly payment settlements' },
        { icon: <FaHeadset />, title: 'Dedicated Support', desc: '24/7 merchant support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Merchant Help Center</h1>
          <p className="text-lg text-orange-100 mb-6">Grow your business with Zezus</p>
          <div className="max-w-2xl mx-auto relative"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for help..." className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300" /></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {merchantBenefits.map((benefit, idx) => (<div key={idx} className="bg-white rounded-xl p-6 text-center shadow-md"><div className="text-4xl text-orange-600 mb-3">{benefit.icon}</div><h3 className="font-bold text-gray-800">{benefit.title}</h3><p className="text-sm text-gray-500 mt-1">{benefit.desc}</p></div>))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden"><div className="p-6 border-b bg-orange-50"><h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2></div><div className="divide-y">{faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())).map((faq) => (<div key={faq.id} className="p-4"><button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="w-full text-left flex justify-between items-center"><span className="font-semibold text-gray-800">{faq.question}</span><span className="text-orange-600 text-xl">{openFaq === faq.id ? '−' : '+'}</span></button>{openFaq === faq.id && (<div className="mt-3 pl-4 border-l-4 border-orange-500"><p className="text-gray-600">{faq.answer}</p></div>)}</div>))}</div></div>

          <div className="space-y-6"><div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white"><h3 className="text-xl font-bold mb-3">Ready to join?</h3><p className="mb-4">Partner with Zezus and grow your business</p><button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold flex items-center"><FaUserPlus className="mr-2" />Sign Up Now</button></div><div className="bg-orange-50 rounded-2xl p-6 text-center"><FaHeadset className="text-4xl text-orange-600 mx-auto mb-3" /><h3 className="text-xl font-bold text-gray-800">Merchant Support</h3><p className="text-2xl font-bold text-orange-600 mt-2">01378-765800</p><p className="text-sm text-gray-600 mt-1">Dedicated merchant helpline</p></div></div>
        </div>
      </div>
    </div>
  );
};

export default HelpMerchant;