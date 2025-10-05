import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RefreshCw, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getProductById, getFeaturedProducts } from '@shared/products';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const product = id ? getProductById(id) : null;
  const relatedProducts = getFeaturedProducts().slice(0, 4);
  const inWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/shop" className="text-luxury-gold hover:text-luxury-gold-light">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-luxury-gold">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-luxury-gold">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-luxury-gold font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-500 cursor-zoom-in",
                  isZoomed && "scale-150"
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.newArrival && (
                  <Badge className="bg-luxury-deep-red text-white">NEW</Badge>
                )}
                {product.onSale && (
                  <Badge className="bg-luxury-gold text-luxury-black">SALE</Badge>
                )}
                {product.stock <= 5 && (
                  <Badge variant="destructive">LOW STOCK</Badge>
                )}
              </div>

              {/* Share Button */}
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index
                      ? "border-luxury-gold"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-luxury-gold uppercase tracking-wide">
                  {product.brand}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleWishlistToggle}
                  className={cn(
                    "text-gray-400 hover:text-red-500",
                    inWishlist && "text-red-500"
                  )}
                >
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
                </Button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-luxury-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating) && "fill-current"
                        )}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-luxury-black">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.onSale && (
                <Badge className="bg-red-100 text-red-800">
                  Save ${product.originalPrice! - product.price}
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Color: <span className="font-normal">{selectedColor}</span>
              </h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 border rounded-lg text-sm font-medium transition-colors",
                      selectedColor === color
                        ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Size: <span className="font-normal">{selectedSize}</span>
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 border rounded-lg text-sm font-medium transition-colors",
                      selectedSize === size
                        ? "border-luxury-gold bg-luxury-gold text-luxury-black"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor || product.stock === 0}
                className="w-full bg-luxury-black hover:bg-gray-800 text-white text-lg py-6"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="h-5 w-5 text-luxury-gold mb-1" />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center">
                  <Shield className="h-5 w-5 text-luxury-gold mb-1" />
                  <span className="text-xs text-gray-600">Authentic</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw className="h-5 w-5 text-luxury-gold mb-1" />
                  <span className="text-xs text-gray-600">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.detailedDescription}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Premium materials and construction</li>
                      <li>• Advanced cushioning technology</li>
                      <li>• Durable rubber outsole</li>
                      <li>• Breathable interior lining</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Care Instructions</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Clean with soft brush and mild soap</li>
                      <li>• Air dry at room temperature</li>
                      <li>• Store in dust bag when not in use</li>
                      <li>• Avoid exposure to extreme heat</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-8">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Brand:</span>
                      <span className="text-gray-600">{product.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span className="text-gray-600 capitalize">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Material:</span>
                      <span className="text-gray-600">{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Release Date:</span>
                      <span className="text-gray-600">{product.releaseDate}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Available Sizes:</span>
                      <span className="text-gray-600">{product.sizes.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Available Colors:</span>
                      <span className="text-gray-600">{product.colors.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">SKU:</span>
                      <span className="text-gray-600">{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Stock:</span>
                      <span className="text-gray-600">{product.stock} units</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="bg-white rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8 text-gray-500">
                  <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Reviews coming soon!</p>
                  <p className="text-sm">Be the first to review this product.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-luxury-gold transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-luxury-gold font-bold">${relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
