import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-luxury-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold">
                <span className="text-white">LACE</span>
                <span className="text-luxury-gold"> UP</span>
              </div>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Elevating streetwear culture with luxury craftsmanship. Every step is a statement.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-luxury-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-luxury-gold">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/shop?category=new-arrivals" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=lifestyle" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=basketball" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Basketball
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=running" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Running
                </Link>
              </li>
              <li>
                <Link 
                  to="/shop?category=limited-edition" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Limited Edition
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-luxury-gold">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/shipping" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link 
                  to="/returns" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link 
                  to="/size-guide" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-luxury-gold">Stay Connected</h3>
            <p className="text-gray-300">
              Subscribe for exclusive releases and insider access.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors duration-300"
              />
              <button className="w-full bg-luxury-gold text-luxury-black font-semibold py-3 px-4 rounded-md hover:bg-luxury-gold-light transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-sm">
            © 2024 Lace UP. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
