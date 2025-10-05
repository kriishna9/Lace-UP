import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockProducts, Product } from '@shared/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize search from URL params
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'running', label: 'Running' },
    { value: 'casual', label: 'Casual' },
    { value: 'limited-edition', label: 'Limited Edition' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.colors.some(color => color.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.newArrival ? 1 : -1;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const ProductCard = ({ product }: { product: Product }) => {
    const inWishlist = isInWishlist(product.id);

    const handleAddToCart = () => {
      addToCart(product, product.sizes[0], product.colors[0]);
    };

    const handleWishlistToggle = () => {
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    };

    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.newArrival && (
              <span className="bg-luxury-deep-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                NEW
              </span>
            )}
            {product.onSale && (
              <span className="bg-luxury-gold text-luxury-black text-xs font-semibold px-3 py-1 rounded-full">
                SALE
              </span>
            )}
            {product.stock <= 5 && (
              <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                LOW STOCK
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleWishlistToggle}
              className={cn(
                "bg-white/90 hover:bg-white",
                inWishlist ? "text-red-500" : "text-gray-800"
              )}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
            </Button>
            <Link to={`/product/${product.id}`}>
              <Button size="sm" variant="ghost" className="bg-white/90 hover:bg-white text-gray-800">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-luxury-black hover:bg-gray-800 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-2">
            <div className="flex text-luxury-gold text-sm">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-luxury-gold transition-colors duration-300 cursor-pointer">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-luxury-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-luxury-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Premium</span>
            <span className="text-luxury-gold"> Collection</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover luxury sneakers that define your style and elevate your game
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.value
                        ? 'bg-luxury-gold text-luxury-black font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </div>
            
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">👟</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
