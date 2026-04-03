import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EarnPage from './pages/EarnPage';
import Ride from './pages/Ride';
import Car from './pages/Car';
import Food from './pages/Food';
import Courier from './pages/Courier'; 
import Parcel from './pages/Parcel';
import Rentals from './pages/Rentals';
import Shop from './pages/Shop';
import Pay from './pages/Pay';
import HelpUser from './pages/HelpUser';
import HelpRider from './pages/HelpRider';
import HelpMerchant from './pages/HelpMerchant';
import HelpWalkin from './pages/HelpWalkin';
import HelpJoin from './pages/HelpJoin';
import HelpMessage from './pages/HelpMessage';
import Blog from './pages/Blog';
import AppPage from './pages/AppPage';
import DownloadPage from './pages/DownloadPage';
import About from './pages/About';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Safety from './pages/Safety';
import Dashboard from './pages/Dashboard';

// Temporary components for each page

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Earn Routes */}
          <Route path="/earn/bike" element={<EarnPage />} />
          <Route path="/earn/car" element={<EarnPage />} />
          <Route path="/earn/cycle" element={<EarnPage />} />
          <Route path="/earn" element={<EarnPage />} />
          
          {/* Services Routes */}
          <Route path="/ride" element={<Ride />} />
          <Route path="/car" element={<Car />} />
          <Route path="/food" element={<Food />} />
          <Route path="/courier" element={<Courier />} />
          <Route path="/parcel" element={<Parcel />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/pay" element={<Pay />} />
          
          {/* Help Routes */}
          <Route path="/help/user" element={<HelpUser />} />
          <Route path="/help/rider" element={<HelpRider />} />
          <Route path="/help/merchant" element={<HelpMerchant />} />
          <Route path="/help/walkin" element={<HelpWalkin />} />
          <Route path="/help/join" element={<HelpJoin />} />
          <Route path="/help/message" element={<HelpMessage />} />
          
          {/* More Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;