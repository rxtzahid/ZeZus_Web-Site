import { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaUser, FaPhone, FaTag } from 'react-icons/fa';

const LiveChat = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    service: ''
  });
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! Welcome to Zezus Live Chat. How can we help you today?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  const services = [
    { name: 'Courier', icon: '📦', color: 'bg-blue-100 text-blue-600' },
    { name: 'Bike', icon: '🏍️', color: 'bg-green-100 text-green-600' },
    { name: 'Car', icon: '🚗', color: 'bg-purple-100 text-purple-600' },
    { name: 'Food', icon: '🍔', color: 'bg-orange-100 text-orange-600' },
    { name: 'Parcel', icon: '📮', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Shop', icon: '🛍️', color: 'bg-pink-100 text-pink-600' },
    { name: 'CNG', icon: '🛺', color: 'bg-teal-100 text-teal-600' }
  ];

  // 👇 Live Chat খোলার সময় সব রিসেট করুন
  useEffect(() => {
    if (isOpen) {
      // রিসেট সব স্টেট
      setStep(1);
      setFormData({
        name: '',
        mobile: '',
        service: ''
      });
      setMessages([
        { type: 'bot', text: 'Hello! Welcome to Zezus Live Chat. How can we help you today?' }
      ]);
      setCurrentMessage('');
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service: service.name });
    setStep(3);
    setTimeout(() => {
      setMessages(prev => [...prev, 
        { type: 'bot', text: `Great! You've selected ${service.name} service. How can I assist you with ${service.name}?` }
      ]);
    }, 500);
  };

  const handleSubmitInfo = () => {
    if (formData.name && formData.mobile) {
      setStep(2);
      setTimeout(() => {
        setMessages(prev => [...prev, 
          { type: 'bot', text: `Thanks ${formData.name}! Please select a service you need help with.` }
        ]);
      }, 500);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      setMessages(prev => [...prev, { type: 'user', text: currentMessage }]);
      
      setTimeout(() => {
        let botReply = "Thank you for your message. Our support team will get back to you shortly!";
        if (currentMessage.toLowerCase().includes('price') || currentMessage.toLowerCase().includes('ভাড়া')) {
          botReply = `For ${formData.service} service, prices vary based on distance. Please visit our pricing page for details.`;
        } else if (currentMessage.toLowerCase().includes('track') || currentMessage.toLowerCase().includes('ট্র্যাক')) {
          botReply = "You can track your ride/delivery in real-time from the app or website dashboard.";
        } else if (currentMessage.toLowerCase().includes('cancel') || currentMessage.toLowerCase().includes('বাতিল')) {
          botReply = "To cancel a ride/delivery, go to 'My Rides' section and click cancel. Cancellation fees may apply.";
        }
        setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
      }, 1000);
      
      setCurrentMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Zezus Live Chat</h3>
              <p className="text-purple-200 text-xs">Online • Usually replies in minutes</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:bg-purple-500 rounded-full p-2 transition">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-gray-800 border rounded-bl-none shadow-sm'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          
          {/* Info Form Step 1 */}
          {step === 1 && (
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 mt-4 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🎉</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800">We are happy to have you on our Live Chat!</h4>
                <p className="text-gray-500 text-sm mt-1">Please share your details to get started</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-purple-600" />
                    Enter your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Rahim Khan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaPhone className="inline mr-2 text-purple-600" />
                    Enter your mobile number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                      +880
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="1XXXXXXXXX"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSubmitInfo}
                  disabled={!formData.name || !formData.mobile}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Chat
                </button>
              </div>
            </div>
          )}
          
          {/* Service Selection Step 2 */}
          {step === 2 && (
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-5 mt-4 shadow-lg">
              <div className="text-center mb-4">
                <FaTag className="text-3xl text-purple-600 mx-auto mb-2" />
                <h4 className="text-lg font-bold text-gray-800">Select a service</h4>
                <p className="text-gray-500 text-sm">Choose the service you need help with</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServiceSelect(service)}
                    className={`${service.color} p-3 rounded-lg text-center hover:scale-105 transition transform`}
                  >
                    <span className="text-2xl block">{service.icon}</span>
                    <span className="text-sm font-medium mt-1 block">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input - Only show in step 3 */}
        {step === 3 && (
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                <FaPaperPlane />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Our support team is here to help you 24/7
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default LiveChat;