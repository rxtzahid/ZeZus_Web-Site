import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube,
  FaApple,
  FaGooglePlay,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  const platformLinks = [
    { name: "Zezus Bike", link: "/ride" },
    { name: "Zezus Car", link: "/car" },
    { name: "Zezus Food", link: "/food" },
    { name: "Zezus Shop", link: "/shop" },
    { name: "Zezus Parcel", link: "/parcel" },
    { name: "Zezus Courier", link: "/courier" },
    { name: "Zezus Rentals", link: "/rentals" },
    { name: "Zezus Pay", link: "/pay", badge: "NEW" },
    { name: "Zezus Maps", link: "/maps", badge: "BETA" }
  ];

  const earnLinks = [
    { name: "Earn With Bike", link: "/earn/bike" },
    { name: "Earn With Car", link: "/earn/car" },
    { name: "Earn With Cycle", link: "/earn/cycle" }
  ];

  const merchantLinks = [
    { name: "Courier Merchant Sign Up", link: "/merchant/courier/signup" },
    { name: "Courier Merchant Login", link: "/merchant/courier/login" },
    { name: "Car Admiral Login", link: "/merchant/car/login" },
    { name: "Resto Merchant Sign Up", link: "/merchant/resto/signup" },
    { name: "Resto Merchant Login", link: "/merchant/resto/login" }
  ];

  const helpLinks = [
    { name: "Walk in Support Centers", link: "/help/walkin" },
    { name: "User Help Centers", link: "/help/user" },
    { name: "Rider Help Center", link: "/help/rider" },
    { name: "Merchant Help Center", link: "/help/merchant" },
    { name: "Helpline 09678100800", link: "tel:09678100800", isPhone: true },
    { name: "Emergency Helpline 13301", link: "tel:13301", isPhone: true },
    { name: "Accidental Claim Support", link: "/help/claim" }
  ];

  const footerLinks = [
    { name: "About Us", link: "/about" },
    { name: "Blog", link: "/blog" },
    { name: "Press", link: "/press" },
    { name: "Contact", link: "/contact" },
    { name: "Safety", link: "/safety" },
    { name: "Terms of Service", link: "/terms" }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Column 1: Platform */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              {platformLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="text-gray-400 hover:text-purple-400 transition text-sm flex items-center space-x-1">
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`text-xs px-1.5 py-0.5 rounded ${item.badge === 'NEW' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'}`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Earn */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Earn</h3>
            <ul className="space-y-2">
              {earnLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="text-gray-400 hover:text-purple-400 transition text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Merchant */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Merchant</h3>
            <ul className="space-y-2">
              {merchantLinks.map((item, index) => (
                <li key={index}>
                  <Link to={item.link} className="text-gray-400 hover:text-purple-400 transition text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              {helpLinks.map((item, index) => (
                <li key={index}>
                  {item.isPhone ? (
                    <a href={item.link} className="text-gray-400 hover:text-purple-400 transition text-sm block">
                      {item.name}
                    </a>
                  ) : (
                    <Link to={item.link} className="text-gray-400 hover:text-purple-400 transition text-sm">
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Download App & Social */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Download App</h3>
            <div className="space-y-3">
              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg w-full">
                <FaApple className="text-xl" />
                <div className="text-left">
                  <p className="text-xs">Download on</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
              </button>
              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg w-full">
                <FaGooglePlay className="text-xl" />
                <div className="text-left">
                  <p className="text-xs">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </button>
            </div>

            {/* Social Media - এখানে পরিবর্তন করা হয়েছে */}
            <div className="mt-6">
              <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <button 
                  onClick={() => window.open('https://facebook.com', '_blank')}
                  className="text-gray-400 hover:text-purple-400 transition text-xl"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </button>
                <button 
                  onClick={() => window.open('https://twitter.com', '_blank')}
                  className="text-gray-400 hover:text-purple-400 transition text-xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </button>
                <button 
                  onClick={() => window.open('https://instagram.com', '_blank')}
                  className="text-gray-400 hover:text-purple-400 transition text-xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </button>
                <button 
                  onClick={() => window.open('https://linkedin.com', '_blank')}
                  className="text-gray-400 hover:text-purple-400 transition text-xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </button>
                <button 
                  onClick={() => window.open('https://youtube.com', '_blank')}
                  className="text-gray-400 hover:text-purple-400 transition text-xl"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-gray-800 py-6 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {footerLinks.map((item, index) => (
                <Link key={index} to={item.link} className="text-gray-400 hover:text-purple-400 transition">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Address & Copyright */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>House 05, Road 12, Block C, Dhaka, Bangladesh</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaPhone />
                <span>01976-100800</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope />
                <span>support@zezus.com</span>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs mt-6">
            <p>&copy; {new Date().getFullYear()} Zezus. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;