import React from 'react';
import { FaMoneyBillWave, FaMobileAlt, FaShoppingCart, FaHandHoldingUsd } from 'react-icons/fa';

const PromoSection = () => {
  const features = [
    {
      icon: <FaMoneyBillWave className="text-4xl text-purple-600" />,
      title: "টাকা পাঠানো",
      description: "যেকোনো জায়গায় তাৎক্ষণিক টাকা পাঠান নিরাপদে"
    },
    {
      icon: <FaMobileAlt className="text-4xl text-purple-600" />,
      title: "মোবাইল রিচার্জ",
      description: "সেকেন্ডের মধ্যে মোবাইল টি-আপ করুন"
    },
    {
      icon: <FaShoppingCart className="text-4xl text-purple-600" />,
      title: "অনলাইন শপিং",
      description: "পছন্দের পণ্য কিনুন সহজ পেমেন্টে"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Zezus <span className="text-purple-600">প্রোগ্রাম</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Zezus সকল সুবিধা প্রদান করে গুরুমাত্রা আপনার জন্য।
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left Card - লেনদের করণ নিজের মতো */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4">
              <h3 className="text-xl font-bold text-white text-center">
                লেনদের করণ নিজের মতো
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-gray-500 text-sm text-center">
                  টাকা পাঠানো, মোবাইল টি-আপ বা অনলাইন শপিং সবকিছুই করুন <br />
                  সহজ ও নিরাপদে।
                </p>
              </div>
            </div>
          </div>

          {/* Right Card - ফান্ড আপনার হাতেই */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
              <h3 className="text-xl font-bold text-white text-center">
                ফান্ড আপনার হাতেই
              </h3>
            </div>
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-4">
                  <FaHandHoldingUsd className="text-5xl text-green-600" />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                ফান্ড নেই?
              </h4>
              <p className="text-gray-600 mb-4">
                টাকা পড়ার যখন দরকার তখনই।
              </p>
              <p className="text-gray-500 text-sm">
                জরুরি প্রয়োজনে দ্রুত ফান্ড সুবিধা <br />
                সহজ শর্তে, ঝামেলাবিহীন প্রক্রিয়ায়।
              </p>
              <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                বিস্তারিত জানুন
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-purple-50 rounded-full px-4 py-2">
            <span className="text-purple-600 text-sm font-medium">
              🔒 ১০০% নিরাপদ লেনদেন
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;