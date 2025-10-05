import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, Heart, ArrowLeft, ShoppingBag, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

export default function Cart() {
  const { state, updateQuantity, removeFromCart, addToWishlist, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const shipping = state.total >= 200 ? 0 : 15;
  const tax = state.total * 0.08; // 8% tax
  const promoDiscount = isPromoApplied ? state.total * 0.1 : 0; // 10% discount
  const finalTotal = state.total + shipping + tax - promoDiscount;

  const handlePromoCode = () => {
    if (promoCode.toUpperCase() === 'LUXURY10') {
      setIsPromoApplied(true);
    }
  };

  const handleMoveToWishlist = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId);
    if (item) {
      addToWishlist(item.product);
      removeFromCart(productId);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Discover our premium collection.
          </p>
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link to="/collections">View Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/shop">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({state.itemCount} items)</h1>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-luxury-gold transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span>Size: <span className="font-medium">{item.selectedSize}</span></span>
                      <span>Color: <span className="font-medium">{item.selectedColor}</span></span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price */}
                        <div className="text-lg font-bold text-luxury-gold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMoveToWishlist(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {item.quantity >= item.product.stock && (
                      <p className="text-sm text-red-600 mt-2">Maximum quantity reached</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Promo Code */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="h-5 w-5 text-luxury-gold" />
                <h3 className="font-semibold text-gray-900">Promo Code</h3>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter promo code (try LUXURY10)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                  disabled={isPromoApplied}
                />
                <Button
                  onClick={handlePromoCode}
                  disabled={isPromoApplied || !promoCode}
                  className="bg-luxury-black hover:bg-gray-800 text-white"
                >
                  Apply
                </Button>
              </div>
              {isPromoApplied && (
                <p className="text-green-600 text-sm mt-2">✓ Promo code applied! 10% discount</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">${state.total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                {isPromoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount (LUXURY10)</span>
                    <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
                  </div>
                )}

                {state.total < 200 && (
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    Add ${(200 - state.total).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-luxury-gold">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild size="lg" className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold">
                  <Link to="/shipping">Proceed to Shipping</Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
                  <div>
                    <div className="text-luxury-gold text-lg mb-1">🔒</div>
                    <div>Secure Checkout</div>
                  </div>
                  <div>
                    <div className="text-luxury-gold text-lg mb-1">📦</div>
                    <div>Fast Shipping</div>
                  </div>
                  <div>
                    <div className="text-luxury-gold text-lg mb-1">↩️</div>
                    <div>Easy Returns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
