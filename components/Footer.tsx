'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { COLORS } from '@/constants/colors';

/**
 * Enhanced Footer Component
 * Multi-column ecommerce footer with comprehensive links and information
 */
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gray-800 border-b" style={{ borderColor: COLORS.border.dark }}>
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h3 className="text-lg font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-gray-300 text-sm mb-4">Get exclusive deals and offers delivered to your inbox</p>
            </div>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': COLORS.primary.main } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-transform hover:scale-105"
                style={{ backgroundColor: COLORS.primary.main }}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div style={{ color: COLORS.primary.main }}>flipkart</div>
              <span style={{ color: COLORS.accent.yellow }} className="text-sm">explore</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Your one-stop destination for authentic products at unbeatable prices.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, City</span>
              </p>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>1-800-FLIPKART</span>
              </p>
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@flipkart.com</span>
              </p>
            </div>
          </div>

          {/* About Flipkart */}
          <div>
            <h4 className="font-bold text-base mb-4">About Flipkart</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Investor Relations
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-bold text-base mb-4">Help & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-base mb-4">Policies</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h4 className="font-bold text-base mb-4">For Sellers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Seller Policies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  How to Sell
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-sm mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div>
                <h4 className="font-bold text-sm mb-3">Secure Payments</h4>
                <div className="flex gap-2">
                  {['💳', '🏦', '📱', '₹'].map((method, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 rounded flex items-center justify-center text-lg"
                      style={{ backgroundColor: COLORS.neutral[100] }}
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2024 Flipkart Clone. All rights reserved.</p>
            <p>Made with ❤️ for ecommerce enthusiasts</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
/*
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>support@flipkart.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Commerce Street, New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider 
        <div className="border-t border-border my-8"></div>

        {/* Bottom Section 
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            <p>&copy; 2024 Flipkart. All rights reserved.</p>
          </div>

          {/* Social Links 
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
*/
