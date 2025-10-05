import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { SearchModal } from '@/components/SearchModal';
import { useCart } from '@/contexts/CartContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();

  return (
    <header className="bg-luxury-black text-white sticky top-0 z-50 border-b border-luxury-gold/20">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-center py-2 text-sm text-luxury-gold">
          Free shipping on orders over $200 | Premium quality guaranteed
        </div>
        
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:text-luxury-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-white">LACE</span>
              <span className="text-luxury-gold"> UP</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-luxury-gold hover:bg-luxury-gold/10"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-luxury-gold hover:bg-luxury-gold/10 hidden md:flex"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-luxury-gold hover:bg-luxury-gold/10"
            >
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-luxury-gold hover:bg-luxury-gold/10 relative"
              >
                <ShoppingBag className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-luxury-deep-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-luxury-gold/20 mt-4 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/collections" 
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="text-white hover:text-luxury-gold transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
