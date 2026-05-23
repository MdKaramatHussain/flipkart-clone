'use client';

import React from 'react';
import { Search, ShoppingCart, Heart, User, MapPin, X, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const [scrolled, setScrolled] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([
    { id: 1, name: 'Product 1', price: 999, quantity: 1, originalPrice: 1999, image: 'Product Image' },
    { id: 2, name: 'Product 2', price: 2499, quantity: 2, originalPrice: 4999, image: 'Product Image' },
    { id: 3, name: 'Product 3', price: 5999, quantity: 1, originalPrice: 9999, image: 'Product Image' },
  ]);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const tax = Math.floor(subtotal * 0.05);
  const total = subtotal + tax;

  return (
    <div className="bg-white">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${scrolled ? 'shadow-lg' : ''}`}
        style={{ backgroundColor: '#2874f0' }}
      >
        <div className="px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-28 h-7 bg-white rounded flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: '#2874f0' }}>Flipkart</span>
              </div>
              <span className="text-white text-xs font-light italic">Explore <span className="font-bold">Plus</span></span>
            </div>

            <div className="flex-1 max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  className="w-full px-4 py-2 rounded text-sm placeholder-gray-600 focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-6 text-white">
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6" style={{ color: '#212121' }}>Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-gray-200 rounded overflow-hidden">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border-b border-gray-200 last:border-b-0">
                      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-400">Product Image</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-bold" style={{ color: '#212121' }}>₹{item.price.toLocaleString()}</span>
                          <span className="text-gray-500 line-through text-sm">₹{item.originalPrice.toLocaleString()}</span>
                          <span className="text-green-600 text-sm font-medium">{Math.round((1 - item.price / item.originalPrice) * 100)}% off</span>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mb-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 text-sm font-medium hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold" style={{ color: '#212121' }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded p-4 sticky top-24 space-y-4">
                  <h2 className="font-bold text-lg" style={{ color: '#212121' }}>Order Summary</h2>
                  
                  <div className="space-y-2 text-sm pb-4 border-b border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl" style={{ color: '#212121' }}>₹{total.toLocaleString()}</span>
                  </div>

                  <button 
                    style={{ backgroundColor: '#2874f0' }}
                    className="w-full py-3 text-white font-bold rounded hover:opacity-90 transition"
                  >
                    Proceed to Checkout
                  </button>

                  <button className="w-full py-2 border border-gray-300 rounded font-medium text-gray-900 hover:bg-gray-50 transition">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add products to get started</p>
              <button 
                style={{ backgroundColor: '#2874f0' }}
                className="px-8 py-2 text-white font-bold rounded hover:opacity-90 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#172337' }} className="text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {['About', 'Help', 'Policy', 'Social'].map((section) => (
              <div key={section}>
                <h3 className="font-bold text-sm mb-4">{section}</h3>
                <ul className="space-y-2">
                  {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-white text-xs transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-xs">
            <p>&copy; 2024 Flipkart.com. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
