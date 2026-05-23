'use client';

import React from 'react';
import { Search, ShoppingCart, Heart, User, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const [scrolled, setScrolled] = React.useState(false);
  const [step, setStep] = React.useState(1);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
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
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-8" style={{ color: '#212121' }}>Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition ${
                  s <= step ? 'bg-blue-600' : 'bg-gray-300'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`flex-1 h-1 mx-2 transition ${s < step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          <div className="space-y-6">
            {/* Step 1: Address */}
            {step >= 1 && (
              <div className="border border-gray-200 rounded p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: '#212121' }}>Delivery Address</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                  <input type="text" placeholder="Address" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="City" className="px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                    <input type="text" placeholder="Postal Code" className="px-4 py-2 border border-gray-300 rounded focus:outline-none" />
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    style={{ backgroundColor: '#2874f0' }}
                    className="w-full py-2 text-white font-bold rounded hover:opacity-90"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step >= 2 && (
              <div className="border border-gray-200 rounded p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: '#212121' }}>Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span>Net Banking</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-gray-300 rounded cursor-pointer hover:bg-blue-50">
                    <input type="radio" name="payment" className="w-4 h-4" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 border border-gray-300 font-bold rounded hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    style={{ backgroundColor: '#2874f0' }}
                    className="flex-1 py-2 text-white font-bold rounded hover:opacity-90"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step >= 3 && (
              <div className="border border-gray-200 rounded p-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: '#212121' }}>Order Review</h2>
                <div className="bg-blue-50 p-4 rounded mb-4">
                  <p className="text-sm"><strong>Estimated Total:</strong> ₹9,998</p>
                  <p className="text-xs text-gray-600 mt-2">Including 5% tax and free shipping</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 py-2 border border-gray-300 font-bold rounded hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(4)}
                    style={{ backgroundColor: '#2874f0' }}
                    className="flex-1 py-2 text-white font-bold rounded hover:opacity-90"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step >= 4 && (
              <div className="border border-gray-200 rounded p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-green-600">✓</span>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#212121' }}>Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">Your order has been placed successfully. Order ID: #FLK123456</p>
                <button 
                  style={{ backgroundColor: '#2874f0' }}
                  className="px-8 py-2 text-white font-bold rounded hover:opacity-90"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer style={{ backgroundColor: '#172337' }} className="text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400 text-xs">
          <p>&copy; 2024 Flipkart.com. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
