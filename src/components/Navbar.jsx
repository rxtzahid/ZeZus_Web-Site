import { useState } from 'react';
import { Link } from 'react-router-dom';
import LiveChat from './LiveChat';
import { 
  FaChevronDown, 
  FaGlobe, 
  FaMotorcycle, 
  FaCar, 
  FaHamburger, 
  FaBox, 
  FaBoxOpen, 
  FaKey, 
  FaStore, 
  FaCreditCard,
  FaQuestionCircle,
  FaUserCircle,
  FaBuilding,
  FaMapMarkerAlt,
  FaEnvelope,
  FaComments,
  FaBicycle,
  FaMoneyBillWave,
  FaInfoCircle,
  FaBriefcase,
  FaNewspaper,
  FaShieldAlt
} from 'react-icons/fa';

const Navbar = () => {
  // Timers for dropdown delay
  const [earnTimer, setEarnTimer] = useState(null);
  const [servicesTimer, setServicesTimer] = useState(null);
  const [helpTimer, setHelpTimer] = useState(null);
  const [moreTimer, setMoreTimer] = useState(null);
  
  const [isEarnOpen, setIsEarnOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState('ENG');
  const [showLiveChat, setShowLiveChat] = useState(false);

  // Earn With Zezus Menu Items
  const earnItems = [
    { 
      icon: <FaMotorcycle className="text-3xl text-purple-600" />, 
      titleEn: "Earn With Bike", 
      titleBn: "বাইক দিয়ে আয় করুন",
      subEn: "Become a Rider",
      subBn: "রাইডার হন",
      link: "/earn/bike" 
    },
    { 
      icon: <FaCar className="text-3xl text-purple-600" />, 
      titleEn: "Earn With Car", 
      titleBn: "কার দিয়ে আয় করুন",
      subEn: "Become a Captain",
      subBn: "ক্যাপ্টেন হন",
      link: "/earn/car" 
    },
    { 
      icon: <FaBicycle className="text-3xl text-purple-600" />, 
      titleEn: "Earn With Cycle", 
      titleBn: "সাইকেল দিয়ে আয় করুন",
      subEn: "Become a Cyclist",
      subBn: "সাইক্লিস্ট হন",
      link: "/earn/cycle" 
    },
  ];

  // Services Menu Items
  const servicesItems = [
    { icon: <FaMotorcycle className="text-2xl text-purple-600" />, title: "Bike", desc: "Beat the Traffic, Save Time", link: "/ride" },
    { icon: <FaCar className="text-2xl text-purple-600" />, title: "Car", desc: "Travel in Comfort, at Your Convenience", link: "/car" },
    { icon: <FaHamburger className="text-2xl text-purple-600" />, title: "Food", desc: "Fastest Food Delivery services in Town", link: "/food" },
    { icon: <FaBox className="text-2xl text-purple-600" />, title: "Courier", desc: "Reliable Delivery for Your Business", link: "/courier" },
    { icon: <FaBoxOpen className="text-2xl text-purple-600" />, title: "Parcel", desc: "On Demand Delivery at Your Doorstep", link: "/parcel" },
    { icon: <FaKey className="text-2xl text-purple-600" />, title: "Rentals", desc: "Simplify Your Travel with Affordable Car Rentals", link: "/rentals" },
    { icon: <FaStore className="text-2xl text-purple-600" />, title: "Zezus Shop", desc: "Your One-stop Shop", link: "/shop" },
    { icon: <FaCreditCard className="text-2xl text-purple-600" />, title: "Zezus Pay", desc: "The future of money", link: "/pay" },
  ];

  // Help Menu Items
  const helpItems = [
    { icon: <FaQuestionCircle className="text-xl text-purple-600" />, titleEn: "User Help Center", titleBn: "ইউজার হেল্প সেন্টার", link: "/help/user" },
    { icon: <FaUserCircle className="text-xl text-purple-600" />, titleEn: "Rider/Captain/Cyclist Help Center", titleBn: "রাইডার/ক্যাপ্টেন/সাইক্লিস্ট হেল্প সেন্টার", link: "/help/rider" },
    { icon: <FaBuilding className="text-xl text-purple-600" />, titleEn: "Merchant Help Center", titleBn: "মার্চেন্ট হেল্প সেন্টার", link: "/help/merchant" },
    { icon: <FaMapMarkerAlt className="text-xl text-purple-600" />, titleEn: "Walk-In Support Centers (WIS)", titleBn: "ওয়াক-ইন সাপোর্ট সেন্টার", link: "/help/walkin" },
    { icon: <FaComments className="text-xl text-purple-600" />, titleEn: "How to join Zezus", titleBn: "কীভাবে Zezus এ জয়েন করবেন", link: "/help/join" },
    { icon: <FaEnvelope className="text-xl text-purple-600" />, titleEn: "Send a message", titleBn: "বার্তা পাঠান", link: "/help/message" },
  ];

  // More Menu Items
  const moreItems = [
    { icon: <FaInfoCircle className="text-xl text-purple-600" />, titleEn: "About Us", titleBn: "আমাদের সম্পর্কে", link: "/about" },
    { icon: <FaBriefcase className="text-xl text-purple-600" />, titleEn: "Careers", titleBn: "ক্যারিয়ার", link: "/careers" },
    { icon: <FaNewspaper className="text-xl text-purple-600" />, titleEn: "Press", titleBn: "প্রেস", link: "/press" },
    { icon: <FaShieldAlt className="text-xl text-purple-600" />, titleEn: "Safety", titleBn: "নিরাপত্তা", link: "/safety" },
  ];

  const getEarnTitle = (item) => language === 'BN' ? item.titleBn : item.titleEn;
  const getEarnSub = (item) => language === 'BN' ? item.subBn : item.subEn;
  const getHelpTitle = (item) => language === 'BN' ? item.titleBn : item.titleEn;
  const getMoreTitle = (item) => language === 'BN' ? item.titleBn : item.titleEn;

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-3">
            
            {/* Logo with Rocket Image */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/3106/3106777.png" 
                alt="Zezus Rocket Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-2xl font-bold text-purple-600">Zezus</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              
              {/* Earn With Zezus Dropdown with Timer (800ms delay) */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (earnTimer) clearTimeout(earnTimer);
                  setIsEarnOpen(true);
                }}
                onMouseLeave={() => {
                  const timer = setTimeout(() => setIsEarnOpen(false), 800);
                  setEarnTimer(timer);
                }}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition font-medium">
                  <span>Earn With Zezus</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {isEarnOpen && (
                  <div 
                    className="absolute top-8 left-0 bg-white shadow-xl rounded-xl py-3 w-[350px] z-50"
                    onMouseEnter={() => {
                      if (earnTimer) clearTimeout(earnTimer);
                      setIsEarnOpen(true);
                    }}
                    onMouseLeave={() => setIsEarnOpen(false)}
                  >
                    {earnItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.link} 
                        className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-purple-50 transition group"
                      >
                        <div className="text-purple-600 group-hover:scale-110 transition">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 flex items-center space-x-2">
                            <span>{getEarnTitle(item)}</span>
                            <FaMoneyBillWave className="text-green-500 text-sm" />
                          </div>
                          <div className="text-sm text-gray-500">{getEarnSub(item)}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Services Dropdown with Timer (800ms delay) */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (servicesTimer) clearTimeout(servicesTimer);
                  setIsServicesOpen(true);
                }}
                onMouseLeave={() => {
                  const timer = setTimeout(() => setIsServicesOpen(false), 800);
                  setServicesTimer(timer);
                }}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition font-medium">
                  <span>Services</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {isServicesOpen && (
                  <div 
                    className="absolute top-8 left-0 bg-white shadow-xl rounded-xl py-3 w-[500px] grid grid-cols-2 gap-2 z-50"
                    onMouseEnter={() => {
                      if (servicesTimer) clearTimeout(servicesTimer);
                      setIsServicesOpen(true);
                    }}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    {servicesItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.link} 
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition group"
                      >
                        <div className="text-purple-600 group-hover:scale-110 transition">
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Help Dropdown with Timer (800ms delay) */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (helpTimer) clearTimeout(helpTimer);
                  setIsHelpOpen(true);
                }}
                onMouseLeave={() => {
                  const timer = setTimeout(() => setIsHelpOpen(false), 800);
                  setHelpTimer(timer);
                }}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition font-medium">
                  <span>Help</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {isHelpOpen && (
                  <div 
                    className="absolute top-8 left-0 bg-white shadow-xl rounded-xl py-3 w-[380px] z-50"
                    onMouseEnter={() => {
                      if (helpTimer) clearTimeout(helpTimer);
                      setIsHelpOpen(true);
                    }}
                    onMouseLeave={() => setIsHelpOpen(false)}
                  >
                    {helpItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.link} 
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition"
                      >
                        <div className="text-purple-600">
                          {item.icon}
                        </div>
                        <div className="font-medium text-gray-700">
                          {getHelpTitle(item)}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Blog */}
              <Link to="/blog" className="text-gray-700 hover:text-purple-600 transition font-medium">
                Blog
              </Link>

              {/* More Dropdown with Timer (800ms delay) */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (moreTimer) clearTimeout(moreTimer);
                  setIsMoreOpen(true);
                }}
                onMouseLeave={() => {
                  const timer = setTimeout(() => setIsMoreOpen(false), 800);
                  setMoreTimer(timer);
                }}
              >
                <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition font-medium">
                  <span>More</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {isMoreOpen && (
                  <div 
                    className="absolute top-8 left-0 bg-white shadow-xl rounded-xl py-3 w-[250px] z-50"
                    onMouseEnter={() => {
                      if (moreTimer) clearTimeout(moreTimer);
                      setIsMoreOpen(true);
                    }}
                    onMouseLeave={() => setIsMoreOpen(false)}
                  >
                    {moreItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.link} 
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition"
                      >
                        <div className="text-purple-600">
                          {item.icon}
                        </div>
                        <div className="font-medium text-gray-700">
                          {getMoreTitle(item)}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Items */}
            <div className="flex items-center space-x-4">
              {/* Live Chat Button */}
              <button 
                onClick={() => setShowLiveChat(true)}
                className="flex items-center space-x-1 bg-purple-100 text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-200 transition"
              >
                <span className="text-lg">💬</span>
                <span className="text-sm font-medium hidden md:inline">Live Chat</span>
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 hover:border-purple-600 transition"
                >
                  <FaGlobe />
                  <span>{language === 'ENG' ? 'ENG' : 'বাংলা'}</span>
                  <FaChevronDown className="text-xs" />
                </button>
                {isLangOpen && (
                  <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg py-2 w-32 z-50">
                    <button 
                      onClick={() => { setLanguage('ENG'); setIsLangOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      English
                    </button>
                    <button 
                      onClick={() => { setLanguage('BN'); setIsLangOpen(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                    >
                      বাংলা
                    </button>
                  </div>
                )}
              </div>

              {/* Dashboard Button */}
              <Link to="/dashboard" className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-purple-100 hover:text-purple-600 transition">
                <FaUserCircle className="text-lg" />
                <span className="text-sm font-medium hidden md:inline">Dashboard</span>
              </Link>

              {/* Get the app Button */}
              <Link to="/app" className="bg-black text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition">
                Get the app
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Live Chat Modal */}
      <LiveChat isOpen={showLiveChat} onClose={() => setShowLiveChat(false)} />
    </>
  );
};

export default Navbar;