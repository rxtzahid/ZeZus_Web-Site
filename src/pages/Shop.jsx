import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaStar} from 'react-icons/fa';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    { id: 1, name: 'Zezus T-Shirt', price: 599, category: 'Clothing', rating: 4.5, image: '👕', stock: 50 },
    { id: 2, name: 'Zezus Cap', price: 299, category: 'Accessories', rating: 4.3, image: '🧢', stock: 100 },
    { id: 3, name: 'Zezus Mug', price: 349, category: 'Accessories', rating: 4.6, image: '☕', stock: 75 },
    { id: 4, name: 'Zezus Hoodie', price: 1299, category: 'Clothing', rating: 4.8, image: '👔', stock: 30 },
    { id: 5, name: 'Zezus Bag', price: 899, category: 'Accessories', rating: 4.4, image: '🎒', stock: 40 },
    { id: 6, name: 'Zezus Sticker', price: 49, category: 'Accessories', rating: 4.2, image: '📱', stock: 200 }
  ];

  const categories = ['All', 'Clothing', 'Accessories'];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
    }
  };

  const getCartTotal = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    alert(`✅ Order placed successfully!\n\nTotal: ৳${getCartTotal()}\n\nYour order will be delivered within 3-5 business days.`);
    setCart([]);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8"><h1 className="text-3xl font-bold text-gray-800">Zezus Shop</h1><p className="text-gray-500 mt-2">Shop exclusive Zezus merchandise</p></div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1"><FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" /><input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search products..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500" /></div>
          <div className="flex gap-2">{categories.map(cat => (<button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-lg transition ${selectedCategory === cat ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{cat}</button>))}</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (<div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"><div className="h-40 bg-gradient-to-r from-pink-400 to-pink-600 flex items-center justify-center text-6xl">{product.image}</div><div className="p-4"><div className="flex justify-between items-start"><h3 className="font-bold text-gray-800 text-lg">{product.name}</h3><div className="flex items-center"><FaStar className="text-yellow-500 mr-1" /><span className="text-sm">{product.rating}</span></div></div><p className="text-pink-600 font-bold text-xl mt-2">৳{product.price}</p><button onClick={() => addToCart(product)} className="w-full mt-3 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">Add to Cart</button></div></div>))}
        </div>

        {cart.length > 0 && (<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"><button onClick={() => setShowCart(true)} className="bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition flex items-center space-x-3"><FaShoppingCart /><span className="font-semibold">Cart (৳{getCartTotal()})</span></button></div>)}

        {showCart && (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"><div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center"><h3 className="text-xl font-bold">Your Cart</h3><button onClick={() => setShowCart(false)} className="text-gray-500 text-2xl">&times;</button></div><div className="p-4">{cart.map(item => (<div key={item.id} className="flex justify-between items-center mb-4 pb-3 border-b"><div><p className="font-semibold">{item.name}</p><p className="text-pink-600">৳{item.price} x {item.quantity}</p></div><div className="flex items-center space-x-3"><button onClick={() => removeFromCart(item.id)} className="text-red-500">-</button><span>{item.quantity}</span><button onClick={() => addToCart(item)} className="text-green-500">+</button></div></div>))}<div className="border-t pt-4 mt-2"><div className="flex justify-between text-lg font-bold"><span>Total</span><span>৳{getCartTotal()}</span></div><button onClick={handleCheckout} className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-pink-700 transition">Checkout</button></div></div></div></div>)}
      </div>
    </div>
  );
};

export default Shop;