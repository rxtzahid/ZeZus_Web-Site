import React from 'react';
import { Link } from 'react-router-dom';
import { earnItems } from '../data/earnData';
import { FaArrowRight } from 'react-icons/fa';

const EarnDropdown = ({ language }) => {
  const IconComponent = ({ icon: Icon, color }) => <Icon className={`text-2xl ${color}`} />;

  return (
    <div className="bg-white shadow-xl rounded-xl py-4 w-[400px] z-50">
      <div className="px-4 pb-2 border-b border-gray-100">
        <h3 className="font-bold text-gray-800">
          {language === 'BN' ? 'আয় করার উপায়' : 'Ways to Earn'}
        </h3>
        <p className="text-xs text-gray-500">
          {language === 'BN' ? 'আপনার মতো করে আয় শুরু করুন' : 'Start earning your way'}
        </p>
      </div>
      
      <div className="p-2 space-y-1">
        {earnItems.map((item) => {
          const Icon = item.icon;
          const title = language === 'BN' ? item.titleBn : item.titleEn;
          const sub = language === 'BN' ? item.subBn : item.subEn;
          
          return (
            <Link
              key={item.id}
              to={item.link}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition group"
            >
              <div className={`${item.iconColor} bg-gray-100 rounded-full p-2 group-hover:scale-110 transition`}>
                <Icon className="text-xl" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{title}</div>
                <div className="text-xs text-gray-500">{sub}</div>
              </div>
              <FaArrowRight className="text-gray-400 text-sm group-hover:text-purple-600 group-hover:translate-x-1 transition" />
            </Link>
          );
        })}
      </div>
      
      <div className="px-4 pt-2 border-t border-gray-100 mt-1">
        <Link 
          to="/earn/bike" 
          className="text-purple-600 text-sm font-medium hover:underline flex items-center justify-center"
        >
          {language === 'BN' ? 'সব দেখুন' : 'View All'} →
        </Link>
      </div>
    </div>
  );
};

export default EarnDropdown;