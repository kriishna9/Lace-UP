import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, CheckCircle, Lock, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fees: number;
}

interface CardDetails {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export default function Checkout() {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [saveCard, setSaveCard] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Load saved data
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [selectedShipping, setSelectedShipping] = useState<any>(null);

  useEffect(() => {
    const savedShipping = localStorage.getItem('shippingAddress');
    const savedShippingOption = localStorage.getItem('selectedShipping');
    
    if (savedShipping) {
      setShippingAddress(JSON.parse(savedShipping));
    }
    
    if (savedShippingOption) {
      setSelectedShipping(savedShippingOption);
    }
  }, []);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
      fees: 0
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: '🅿️',
      fees: 0
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      description: 'Pay with Touch ID or Face ID',
      icon: '🍎',
      fees: 0
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      description: 'Pay with Google Pay',
      icon: '🔵',
      fees: 0
    }
  ];

  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: state.total >= 200 ? 0 : 15 },
    { id: 'express', name: 'Express Shipping', price: 25 },
    { id: 'overnight', name: 'Overnight Shipping', price: 45 },
    { id: 'white-glove', name: 'White Glove Service', price: 75 }
  ];

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Items to Checkout</h1>
          <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
          <Button asChild className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!shippingAddress) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Missing Shipping Information</h1>
          <p className="text-gray-600 mb-6">Please complete the shipping information first.</p>
          <Button asChild className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
            <Link to="/shipping">Go to Shipping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const subtotal = state.total;
  const shippingCost = selectedShippingOption?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardChange = (field: keyof CardDetails, value: string) => {
    if (field === 'number') {
      value = formatCardNumber(value);
    } else if (field === 'expiry') {
      value = formatExpiry(value);
    } else if (field === 'cvv') {
      value = value.replace(/[^0-9]/g, '').slice(0, 4);
    }
    
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        toast({
          title: "Missing Payment Information",
          description: "Please fill in all card details.",
          variant: "destructive"
        });
        return false;
      }
    }

    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePayment()) return;

    setIsProcessing(true);
    
    // Generate order number
    const orderNum = 'LU' + Date.now().toString().slice(-6);
    setOrderNumber(orderNum);

    // Simulate payment processing
    setTimeout(() => {
      // Clear cart and saved data
      clearCart();
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('billingAddress');
      localStorage.removeItem('selectedShipping');
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderNum} has been confirmed.`,
      });
      
      setIsProcessing(false);
      
      // Redirect to success page or order confirmation
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/shipping">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shipping
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
            <div className="flex items-center text-sm text-green-600">
              <Shield className="h-4 w-4 mr-1" />
              <span>SSL Secured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center text-luxury-gold">
              <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
              <span className="ml-2 font-medium">Cart</span>
            </div>
            <div className="w-16 h-1 bg-luxury-gold"></div>
            <div className="flex items-center text-luxury-gold">
              <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="w-16 h-1 bg-luxury-gold"></div>
            <div className="flex items-center text-luxury-gold">
              <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <span className="ml-2 font-medium">Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-luxury-gold border-t-transparent mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
            <p className="text-gray-600">Please don't close this window</p>
            {orderNumber && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center text-green-600 mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Payment Successful!</span>
                </div>
                <p className="text-sm text-gray-600">Order #{orderNumber}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Review */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Order Review</h2>
              <div className="space-y-4">
                {state.items.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {state.items.length > 3 && (
                  <p className="text-sm text-gray-500 text-center pt-2">
                    ... and {state.items.length - 3} more item{state.items.length - 3 !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <CreditCard className="h-5 w-5 text-luxury-gold" />
                <h2 className="text-xl font-semibold">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={cn(
                      "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                      paymentMethod === method.id
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{method.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.name}
                      onChange={(e) => handleCardChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CreditCard className="h-4 w-4 inline mr-1" />
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={(e) => handleCardChange('number', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => handleCardChange('expiry', e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Lock className="h-4 w-4 inline mr-1" />
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={(e) => handleCardChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Save card for future purchases</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Alternative Payment Methods */}
              {paymentMethod !== 'card' && (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600 mb-4">
                    You will be redirected to {paymentMethods.find(m => m.id === paymentMethod)?.name} to complete your payment.
                  </p>
                  <div className="text-sm text-gray-500">
                    Your order will be confirmed after successful payment.
                  </div>
                </div>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="text-luxury-gold hover:underline">Terms and Conditions</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-luxury-gold hover:underline">Privacy Policy</Link>
                  </span>
                </label>
                <div className="text-xs text-gray-500">
                  By placing this order, you agree to our return policy and authorize us to charge your payment method.
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Final Order Summary</h2>
              
              {/* Shipping Address */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Shipping to:</h3>
                <div className="text-sm text-gray-600">
                  <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                  <p>{shippingAddress.address}</p>
                  {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping ({selectedShippingOption?.name || 'Standard'})
                  </span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-luxury-gold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                size="lg"
                className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold mb-4"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-luxury-black mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Complete Order
                  </>
                )}
              </Button>

              {/* Security Features */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 text-green-600 mr-2" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-gray-600 mr-2" />
                  <span>Your data is protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
