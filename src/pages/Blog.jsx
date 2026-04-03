import React, { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaComments, FaShare, FaHeart, FaEye, FaArrowRight, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);

  // Categories
  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'rides', name: 'Rides' },
    { id: 'delivery', name: 'Delivery' },
    { id: 'safety', name: 'Safety' },
    { id: 'updates', name: 'Updates' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  // Blog Posts Data
  const blogPosts = [
    {
      id: 1,
      title: '10 Tips for a Safe and Comfortable Ride with Zezus',
      excerpt: 'Discover essential safety tips and best practices for a comfortable ride experience with Zezus...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...',
      category: 'safety',
      author: 'Zezus Team',
      authorImage: '👤',
      date: 'March 15, 2024',
      readTime: '5 min read',
      image: '🛡️',
      views: 1245,
      comments: 23,
      likes: 89,
      tags: ['Safety', 'Tips', 'Ride']
    },
    {
      id: 2,
      title: 'How Zezus is Revolutionizing Urban Transportation',
      excerpt: 'Learn how Zezus is changing the way people move around cities with innovative technology...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'rides',
      author: 'Zezus Team',
      authorImage: '👤',
      date: 'March 10, 2024',
      readTime: '4 min read',
      image: '🚗',
      views: 2341,
      comments: 45,
      likes: 156,
      tags: ['Transportation', 'Innovation']
    },
    {
      id: 3,
      title: 'Food Delivery: Best Restaurants to Order From',
      excerpt: 'Explore the top-rated restaurants on Zezus Food for an amazing culinary experience...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'delivery',
      author: 'Food Team',
      authorImage: '👤',
      date: 'March 5, 2024',
      readTime: '6 min read',
      image: '🍕',
      views: 3421,
      comments: 67,
      likes: 234,
      tags: ['Food', 'Restaurants', 'Delivery']
    },
    {
      id: 4,
      title: 'New Features: What\'s Coming to Zezus in 2024',
      excerpt: 'Get an exclusive sneak peek at the exciting new features launching soon on Zezus...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'updates',
      author: 'Product Team',
      authorImage: '👤',
      date: 'February 28, 2024',
      readTime: '3 min read',
      image: '✨',
      views: 5678,
      comments: 89,
      likes: 345,
      tags: ['Updates', 'New Features']
    },
    {
      id: 5,
      title: 'Maximize Your Earnings: Tips for Zezus Captains',
      excerpt: 'Proven strategies to increase your earnings as a Zezus captain or rider...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'tips',
      author: 'Captain Team',
      authorImage: '👤',
      date: 'February 20, 2024',
      readTime: '7 min read',
      image: '💰',
      views: 4321,
      comments: 112,
      likes: 567,
      tags: ['Earnings', 'Tips', 'Captains']
    },
    {
      id: 6,
      title: 'Eco-Friendly Rides: Zezus Cycle Initiative',
      excerpt: 'Join the green revolution with Zezus Cycle - eco-friendly and affordable...',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'rides',
      author: 'Green Team',
      authorImage: '👤',
      date: 'February 15, 2024',
      readTime: '4 min read',
      image: '🚲',
      views: 987,
      comments: 34,
      likes: 123,
      tags: ['Eco-Friendly', 'Cycle']
    }
  ];

  // Featured Posts
  const featuredPosts = blogPosts.slice(0, 3);

  const filteredPosts = blogPosts.filter(post => 
    (activeCategory === 'all' || post.category === activeCategory) &&
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Zezus Blog</h1>
          <p className="text-xl text-purple-100 mb-6">Stories, tips, and updates from the Zezus team</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        {/* Featured Posts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer group">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-6xl group-hover:scale-105 transition">
                  {post.image}
                </div>
                <div className="p-5">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <FaCalendarAlt className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <FaEye className="mr-1" />
                    <span>{post.views} views</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                  <button className="text-purple-600 font-semibold flex items-center group-hover:translate-x-1 transition">
                    Read More <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories & Posts */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full transition ${
                activeCategory === cat.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.id} onClick={() => setSelectedPost(post)} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
              <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-5xl">
                {post.image}
              </div>
              <div className="p-4">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <FaCalendarAlt className="mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <FaEye className="mr-1" />
                  <span>{post.views}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{post.excerpt.substring(0, 80)}...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaComments className="text-purple-500" />
                    <span>{post.comments}</span>
                    <FaHeart className="text-red-500 ml-2" />
                    <span>{post.likes}</span>
                  </div>
                  <span className="text-purple-600 text-sm font-medium">Read More →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found matching your search.</p>
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-purple-100 mb-6">Get the latest posts delivered right to your inbox</p>
          <div className="max-w-md mx-auto flex gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none" />
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selectedPost.title}</h2>
              <button onClick={() => setSelectedPost(null)} className="text-gray-500 text-2xl hover:text-gray-700">&times;</button>
            </div>
            <div className="p-6">
              <div className="text-center text-8xl mb-6">{selectedPost.image}</div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center"><FaCalendarAlt className="mr-2" />{selectedPost.date}</div>
                <div className="flex items-center"><FaUser className="mr-2" />{selectedPost.author}</div>
                <div className="flex items-center"><FaEye className="mr-2" />{selectedPost.views} views</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag, idx) => (<span key={idx} className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full"><FaTag className="inline mr-1 text-xs" />{tag}</span>))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{selectedPost.content}</p>
              <p className="text-gray-700 leading-relaxed mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p className="text-gray-700 leading-relaxed mb-6">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              
              {/* Share Section */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Share this article</h4>
                <div className="flex space-x-3">
                  <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"><FaFacebook /></button>
                  <button className="bg-sky-500 text-white p-2 rounded-full hover:bg-sky-600"><FaTwitter /></button>
                  <button className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"><FaLinkedin /></button>
                  <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"><FaWhatsapp /></button>
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-800 mb-4">Comments ({selectedPost.comments})</h4>
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">👤</div>
                  <div className="flex-1">
                    <textarea placeholder="Add a comment..." className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" rows="3"></textarea>
                    <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">Post Comment</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;