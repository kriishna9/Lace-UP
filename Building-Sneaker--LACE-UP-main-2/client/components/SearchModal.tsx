import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { searchProducts, Product } from '@shared/products';
import { Link } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const popularSearches = [
    'Jordan', 'Nike', 'Red sneakers', 'Limited edition', 'Basketball', 'Running'
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const searchResults = searchProducts(query);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      const newRecentSearches = [
        searchQuery,
        ...recentSearches.filter(s => s !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      
      setQuery(searchQuery);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 top-20 translate-y-0">
        <DialogTitle className="sr-only">Search Products</DialogTitle>
        <div className="bg-white rounded-lg shadow-2xl">
          {/* Search Header */}
          <div className="flex items-center p-6 border-b">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search for sneakers, brands, colors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              className="flex-1 text-lg outline-none placeholder-gray-400"
              autoFocus
            />
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {!query.trim() ? (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Recent Searches
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearRecentSearches}
                        className="text-xs text-gray-500"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-md transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-luxury-gold hover:text-luxury-black rounded-full transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-luxury-gold"></div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </h3>
                    <div className="space-y-3">
                      {results.slice(0, 6).map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-luxury-gold transition-colors">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">{product.brand}</p>
                            <p className="text-sm font-semibold text-luxury-gold">
                              ${product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {results.length > 6 && (
                      <Link
                        to={`/shop?search=${encodeURIComponent(query)}`}
                        onClick={onClose}
                        className="block text-center py-2 text-luxury-gold hover:text-luxury-gold-light font-medium"
                      >
                        View all {results.length} results
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">Try searching for different keywords or brands</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
