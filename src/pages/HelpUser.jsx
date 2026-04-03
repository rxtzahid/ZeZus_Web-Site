import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaUserCircle, FaMoneyBillWave, FaShieldAlt, FaHeadset, FaEnvelope, FaPhone, FaComments, FaBook, FaVideo, FaDownload, FaStar, FaArrowRight } from 'react-icons/fa';

const HelpUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All Topics', icon: <FaQuestionCircle /> },
    { id: 'account', name: 'Account', icon: <FaUserCircle /> },
    { id: 'payment', name: 'Payment', icon: <FaMoneyBillWave /> },
    { id: 'safety', name: 'Safety', icon: <FaShieldAlt /> },
    { id: 'support', name: 'Support', icon: <FaHeadset /> }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create a Zezus account?',
      answer: 'To create a Zezus account, download the app from Google Play or App Store, click on "Sign Up", enter your mobile number, verify with OTP, and fill in your basic information.'
    },
    {
      id: 2,
      category: 'account',
      question: 'How can I reset my password?',
      answer: 'Go to Login screen → Click "Forgot Password" → Enter your registered mobile number → You will receive an OTP → Create a new password.'
    },
    {
      id: 3,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Profile → Edit Profile → Update your name, email, or profile picture → Save changes.'
    },
    {
      id: 4,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept bKash, Nagad, Rocket, Credit/Debit Cards, and Cash on delivery.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'How do I add money to my Zezus wallet?',
      answer: 'Go to Wallet → Add Money → Select payment method → Enter amount → Complete payment.'
    },
    {
      id: 6,
      category: 'payment',
      question: 'Why was my payment declined?',
      answer: 'Your payment may be declined due to insufficient balance, incorrect payment details, or bank issues. Try again or use another payment method.'
    },
    {
      id: 7,
      category: 'safety',
      question: 'Is Zezus safe to use?',
      answer: 'Yes! Zezus is completely safe. We verify all drivers, provide real-time GPS tracking, and have 24/7 customer support.'
    },
    {
      id: 8,
      category: 'safety',
      question: 'How do I report a safety issue?',
      answer: 'Go to Trip History → Select the ride → Click "Report Issue" → Describe the problem → Submit. You can also call our emergency helpline.'
    },
    {
      id: 9,
      category: 'support',
      question: 'How do I contact customer support?',
      answer: 'You can reach us via Live Chat (available 24/7), call us at 09678-100800, or email at support@zezus.com'
    },
    {
      id: 10,
      category: 'support',
      question: 'What are your support hours?',
      answer: 'Our customer support is available 24 hours a day, 7 days a week, including holidays.'
    }
  ];

  // Help Topics
  const helpTopics = [
    { icon: <FaBook />, title: 'Getting Started', desc: 'Learn the basics of Zezus', color: 'bg-blue-500' },
    { icon: <FaVideo />, title: 'Video Tutorials', desc: 'Watch step-by-step guides', color: 'bg-red-500' },
    { icon: <FaDownload />, title: 'App Download', desc: 'Download Zezus app', color: 'bg-green-500' },
    { icon: <FaStar />, title: 'Pro Tips', desc: 'Get the most out of Zezus', color: 'bg-purple-500' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">User Help Center</h1>
          <p className="text-lg text-purple-100 mb-6">How can we help you today?</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Help Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {helpTopics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition cursor-pointer">
              <div className={`${topic.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3`}>
                {topic.icon}
              </div>
              <h3 className="font-semibold text-gray-800">{topic.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{topic.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-1">Find answers to common questions</p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 p-4 border-b bg-gray-50">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="divide-y">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="p-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full text-left flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    <span className="text-purple-600 text-xl">{openFaq === faq.id ? '−' : '+'}</span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="mt-3 pl-4 border-l-4 border-purple-500">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No results found for "{searchTerm}"
              </div>
            )}
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Still need help?</h3>
            <p className="text-gray-600">Our support team is here for you 24/7</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center">
              <FaComments className="text-3xl text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800">Live Chat</h4>
              <p className="text-sm text-gray-500">Chat with our support team</p>
              <button className="mt-2 text-purple-600 text-sm font-medium">Start Chat →</button>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <FaPhone className="text-3xl text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800">Call Us</h4>
              <p className="text-sm text-gray-500">0172635535</p>
              <p className="text-xs text-gray-400">24/7 Available</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <FaEnvelope className="text-3xl text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800">Email Us</h4>
              <p className="text-sm text-gray-500">support@zezus.com</p>
              <p className="text-xs text-gray-400">Reply within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpUser;