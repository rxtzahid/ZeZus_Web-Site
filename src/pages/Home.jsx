import Footer from '../components/Footer';
import Hero from '../components/Hero';
import PromoSection from '../components/PromoSection';


const Home = () => {
  return (
    <div>
      <Hero />
      <PromoSection />
    
      
      {/* অন্যান্য সেকশন পরে যোগ করা যাবে */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Zezus - আপনার যাত্রা সাথী
          </h2>
          <p className="text-gray-600 mt-4">
            দ্রুত, নিরাপদ ও সাশ্রয়ী রাইড ও ডেলিভারি সার্ভিস
          </p>
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default Home;