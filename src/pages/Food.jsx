import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaClock, FaStar, FaShoppingCart, FaPlus, FaMinus, FaLeaf } from 'react-icons/fa';

const Food = () => {
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [cart, setCart] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showCart, setShowCart] = useState(false);

  // Popular locations
  const popularLocations = [
    'Uttara', 'Mirpur', 'Dhanmondi', 'Gulshan', 'Banani', 'Motijheel', 'Airport', 'New Market'
  ];

  // Restaurants data
  const restaurants = [
    { id: 1, name: 'Pizza Hut', cuisine: 'Italian, Fast Food', rating: 4.5, deliveryTime: '25-35 min', priceForTwo: 800, image: '🍕', offer: '20% off', isOpen: true, distance: '1.2 km' },
    { id: 2, name: 'KFC', cuisine: 'American, Fast Food', rating: 4.3, deliveryTime: '20-30 min', priceForTwo: 600, image: '🍗', offer: 'Free Delivery', isOpen: true, distance: '0.8 km' },
    { id: 3, name: 'Burger King', cuisine: 'American, Burger', rating: 4.4, deliveryTime: '25-35 min', priceForTwo: 700, image: '🍔', offer: 'Buy 1 Get 1', isOpen: true, distance: '1.5 km' },
    { id: 4, name: 'Thai Emerald', cuisine: 'Thai, Asian', rating: 4.6, deliveryTime: '35-45 min', priceForTwo: 1200, image: '🥘', offer: '15% off', isOpen: true, distance: '2.1 km' },
    { id: 5, name: 'Chinese Wok', cuisine: 'Chinese', rating: 4.2, deliveryTime: '30-40 min', priceForTwo: 650, image: '🥡', offer: 'Combo Offer', isOpen: true, distance: '1.0 km' },
    { id: 6, name: 'Bikaner', cuisine: 'Indian, Sweets', rating: 4.4, deliveryTime: '20-30 min', priceForTwo: 500, image: '🍛', offer: '10% off', isOpen: true, distance: '0.5 km' },
    { id: 7, name: 'Starbucks', cuisine: 'Coffee, Bakery', rating: 4.7, deliveryTime: '15-25 min', priceForTwo: 900, image: '☕', offer: 'Buy 1 Get 1', isOpen: true, distance: '1.8 km' },
    { id: 8, name: 'Sultan\'s Dine', cuisine: 'Bengali, BBQ', rating: 4.8, deliveryTime: '40-50 min', priceForTwo: 1500, image: '🍖', offer: 'Special Eid Offer', isOpen: false, distance: '3.0 km' }
  ];

  // Menu items for selected restaurant
  const menuItems = {
    1: [
      { id: 101, name: 'Margherita Pizza', price: 450, category: 'Pizza', veg: true },
      { id: 102, name: 'Pepperoni Pizza', price: 650, category: 'Pizza', veg: false },
      { id: 103, name: 'Garlic Bread', price: 150, category: 'Starters', veg: true }
    ],
    2: [
      { id: 201, name: 'Chicken Bucket', price: 550, category: 'Chicken', veg: false },
      { id: 202, name: 'Zinger Burger', price: 280, category: 'Burger', veg: false },
      { id: 203, name: 'French Fries', price: 120, category: 'Sides', veg: true }
    ],
    3: [
      { id: 301, name: 'Whopper', price: 350, category: 'Burger', veg: false },
      { id: 302, name: 'Veg Whopper', price: 300, category: 'Burger', veg: true },
      { id: 303, name: 'Chicken Fries', price: 180, category: 'Sides', veg: false }
    ]
  };

  const filteredRestaurants = restaurants.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePlaceOrder = () => {
    alert(`✅ Order placed successfully!\n\nTotal: ৳${getCartTotal()}\n\nYour food will be delivered to: ${location}\n\nEstimated delivery time: 30-40 minutes`);
    setCart([]);
    setSelectedRestaurant(null);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header with Location */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Food Delivery</h1>
          <p className="text-orange-100 mb-4">Delicious food delivered to your doorstep</p>
          
          {/* Location Input */}
          <div className="relative max-w-md">
            <div className="flex items-center bg-white rounded-lg overflow-hidden">
              <div className="bg-orange-100 px-3 py-3">
                <FaMapMarkerAlt className="text-orange-600" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                placeholder="Enter your delivery location"
                className="flex-1 px-4 py-3 text-gray-800 outline-none"
              />
            </div>
            {showLocationSuggestions && location && (
              <div className="absolute z-10 w-full bg-white rounded-lg shadow-lg mt-1">
                {popularLocations.filter(loc => loc.toLowerCase().includes(location.toLowerCase())).map((loc, idx) => (
                  <div key={idx} onClick={() => { setLocation(loc); setShowLocationSuggestions(false); }} className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700">
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for restaurants or cuisines..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {!selectedRestaurant ? (
          <>
            {/* Categories */}
            <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
              {['All', 'Pizza', 'Burger', 'Chinese', 'Indian', 'Coffee'].map((cat, idx) => (
                <button key={idx} className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition whitespace-nowrap text-gray-700">
                  {cat}
                </button>
              ))}
            </div>

            {/* Restaurants Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} onClick={() => setSelectedRestaurant(restaurant)} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
                  <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-6xl">
                    {restaurant.image}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-800 text-lg">{restaurant.name}</h3>
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{restaurant.offer}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <FaStar className="text-yellow-500 mr-1" />
                        <span>{restaurant.rating}</span>
                        <span className="text-gray-400 mx-2">•</span>
                        <FaClock className="text-gray-400 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <span className="text-gray-500">৳{restaurant.priceForTwo} for two</span>
                    </div>
                    {!restaurant.isOpen && <p className="text-red-500 text-sm mt-2">Currently Closed</p>}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Restaurant Menu View
          <div>
            <button onClick={() => setSelectedRestaurant(null)} className="mb-4 text-orange-600 hover:text-orange-700 flex items-center">
              ← Back to Restaurants
            </button>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                <div className="text-6xl mb-2">{selectedRestaurant.image}</div>
                <h2 className="text-2xl font-bold">{selectedRestaurant.name}</h2>
                <p className="text-orange-100">{selectedRestaurant.cuisine}</p>
                <div className="flex items-center mt-2 text-sm">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span>{selectedRestaurant.rating}</span>
                  <span className="mx-2">•</span>
                  <FaClock className="mr-1" />
                  <span>{selectedRestaurant.deliveryTime}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4">Menu</h3>
                <div className="space-y-3">
                  {(menuItems[selectedRestaurant.id] || []).map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-4 border rounded-xl hover:shadow-md transition">
                      <div className="flex-1">
                        <div className="flex items-center">
                          {item.veg && <FaLeaf className="text-green-600 mr-2" />}
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        </div>
                        <p className="text-orange-600 font-bold mt-1">৳{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {cart.find(cartItem => cartItem.id === item.id) ? (
                          <div className="flex items-center space-x-3 bg-orange-50 rounded-lg px-3 py-1">
                            <button onClick={() => removeFromCart(item.id)} className="text-orange-600"><FaMinus /></button>
                            <span className="font-semibold">{cart.find(cartItem => cartItem.id === item.id).quantity}</span>
                            <button onClick={() => addToCart(item)} className="text-orange-600"><FaPlus /></button>
                          </div>
                        ) : (
                          <button onClick={() => addToCart(item)} className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button onClick={() => setShowCart(true)} className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition flex items-center space-x-3">
              <FaShoppingCart />
              <span className="font-semibold">View Cart (৳{getCartTotal()})</span>
            </button>
          </div>
        )}

        {/* Cart Modal */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold">Your Cart</h3>
                <button onClick={() => setShowCart(false)} className="text-gray-500 text-2xl">&times;</button>
              </div>
              <div className="p-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-4 pb-3 border-b">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-orange-600">৳{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="text-green-500">+</button>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>৳{getCartTotal()}</span>
                  </div>
                  <button onClick={handlePlaceOrder} className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-orange-600 transition">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Food;