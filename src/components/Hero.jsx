import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone, FaHeadset, FaCommentDots } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  
  // 5 Animated Icons
  const icons = [
    { 
      image: "https://cdn-icons-png.flaticon.com/512/2936/2936886.png",
      name: 'Bike Ride', 
      bgColor: 'bg-gradient-to-br from-green-500 to-green-700',
      description: 'Fast & Affordable'
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/3096/3096970.png",
      name: 'Car Travel', 
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-700',
      description: 'Comfort & Style'
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      name: 'Food Delivery', 
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-600',
      description: 'Delicious & Quick'
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png",
      name: 'Parcel Service', 
      bgColor: 'bg-gradient-to-br from-purple-500 to-pink-600',
      description: 'Safe & Reliable'
    },
    { 
      image: "https://cdn-icons-png.flaticon.com/512/1020/1020924.png",
      name: 'Shop Online', 
      bgColor: 'bg-gradient-to-br from-yellow-500 to-orange-600',
      description: 'Best Deals'
    }
  ];

  // Auto rotate every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Side - Text Content with Animation */}
          <div className="lg:w-5/12 text-center lg:text-left mb-6 lg:mb-0 z-10 overflow-hidden">
            {/* Animated Title - Slides from left to right */}
            <div className="relative overflow-hidden">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-slideInOut inline-block whitespace-nowrap">
                #1 Super App
              </h1>
            </div>
            
            {/* Animated Subtitle - Slides from right to left */}
            <div className="relative overflow-hidden mt-2">
              <p className="text-xl md:text-2xl mb-8 text-purple-100 animate-slideInOutReverse">
                All solutions in one app
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                to="/earn/bike" 
                className="group px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 text-center flex items-center justify-center"
              >
                Earn Now
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </Link>
              <Link 
                to="/download" 
                className="group px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition duration-300 text-center flex items-center justify-center"
              >
                Download App
              </Link>
            </div>
          </div>
          
          {/* Right Side - Person + Icons Side by Side */}
          <div className="lg:w-7/12 flex flex-col md:flex-row items-center justify-center gap-6">
            
            {/* Person Talking on Phone */}
            <div className="relative">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                {/* Person Avatar Circle */}
                <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <div className="text-center">
                    <div className="text-6xl md:text-7xl">👨‍💼</div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full px-2 py-0.5 text-xs whitespace-nowrap">
                      <FaHeadset className="inline mr-1 text-xs" /> Online
                    </div>
                  </div>
                </div>

                {/* Phone Icon */}
                <div className="absolute -top-2 -right-2 animate-pulse">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <FaPhone className="text-purple-600 text-xl" />
                  </div>
                </div>

                {/* Sound Waves */}
                <div className="absolute -top-8 -right-8">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/30 rounded-full animate-ping absolute"></div>
                    <div className="w-10 h-10 bg-white/20 rounded-full animate-ping absolute animation-delay-300"></div>
                    <FaCommentDots className="relative text-yellow-300 text-xl z-10" />
                  </div>
                </div>

                {/* Speech Bubble */}
                <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-3 py-1.5 shadow-lg animate-pulse whitespace-nowrap">
                  <p className="text-purple-600 text-xs font-semibold">📞 "Welcome to Zezus"</p>
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2.5 h-2.5 bg-white rotate-45"></div>
                </div>

                {/* Floating Chat Dots */}
                <div className="absolute -left-6 top-10">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>

                {/* Call Status */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap">
                  <p className="text-white text-xs flex items-center gap-1 justify-center">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Live Call
                  </p>
                </div>
              </div>
            </div>

            {/* VS / Plus Icon */}
            <div className="text-2xl font-bold text-white/50 hidden md:block">+</div>

            {/* Animated Icons Carousel */}
            <div className="relative">
              <div className="relative w-56 h-56 md:w-64 md:h-64">
                {icons.map((icon, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 transform ${
                      currentIcon === index 
                        ? 'scale-100 opacity-100 rotate-0 translate-y-0' 
                        : 'scale-50 opacity-0 rotate-12 translate-y-8'
                    }`}
                  >
                    <div className={`${icon.bgColor} rounded-full p-6 shadow-2xl animate-bounce`}>
                      <img 
                        src={icon.image} 
                        alt={icon.name}
                        className="w-24 h-24 md:w-28 md:h-28 object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold mt-4 animate-pulse">{icon.name}</h3>
                    <p className="text-purple-200 text-xs">{icon.description}</p>
                  </div>
                ))}
              </div>

              {/* Navigation Dots for Icons */}
              <div className="flex justify-center gap-1 mt-4">
                {icons.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIcon(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      currentIcon === idx ? 'w-3 bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Service Icons */}
        <div className="flex justify-center gap-3 mt-10">
          {icons.slice(0, 5).map((icon, index) => (
            <button
              key={index}
              onClick={() => setCurrentIcon(index)}
              onMouseEnter={() => setCurrentIcon(index)}
              className="group flex flex-col items-center transition-all duration-300"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentIcon === index 
                  ? 'bg-white scale-110 shadow-lg' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}>
                <img 
                  src={icon.image} 
                  alt={icon.name}
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className={`text-xs mt-1 transition-all duration-300 hidden sm:block ${
                currentIcon === index 
                  ? 'text-white font-semibold opacity-100' 
                  : 'text-purple-300 opacity-60'
              }`}>
                {icon.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mt-4">
          <div className="w-40 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-200"
              style={{ width: `${((currentIcon + 1) / icons.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <style>{`
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        /* Slide In - From Left to Right */
        @keyframes slideInOut {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            transform: translateX(0);
            opacity: 1;
          }
          90% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        /* Slide In Reverse - From Right to Left */
        @keyframes slideInOutReverse {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          10% {
            transform: translateX(0);
            opacity: 1;
          }
          90% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        .animate-slideInOut {
          animation: slideInOut 8s ease-in-out infinite;
        }
        
        .animate-slideInOutReverse {
          animation: slideInOutReverse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;