import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, Truck, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  delivery: string;
  icon: string;
}

export default function Shipping() {
  const { state } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivered to your door',
      price: state.total >= 200 ? 0 : 15,
      delivery: '5-7 business days',
      icon: '📦'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery',
      price: 25,
      delivery: '2-3 business days',
      icon: '⚡'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 45,
      delivery: '1 business day',
      icon: '🚀'
    },
    {
      id: 'white-glove',
      name: 'White Glove Service',
      description: 'Premium delivery & setup',
      price: 75,
      delivery: '3-5 business days',
      icon: '👔'
    }
  ];

  const handleAddressChange = (
    address: ShippingAddress,
    setAddress: React.Dispatch<React.SetStateAction<ShippingAddress>>,
    field: keyof ShippingAddress,
    value: string
  ) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    
    for (const field of requiredFields) {
      if (!shippingAddress[field as keyof ShippingAddress]) {
        toast({
          title: "Missing Information",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
          variant: "destructive"
        });
        return false;
      }
    }

    if (!sameAsShipping) {
      for (const field of requiredFields) {
        if (!billingAddress[field as keyof ShippingAddress]) {
          toast({
            title: "Missing Billing Information",
            description: `Please fill in the billing ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`,
            variant: "destructive"
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
      localStorage.setItem('billingAddress', JSON.stringify(sameAsShipping ? shippingAddress : billingAddress));
      localStorage.setItem('selectedShipping', selectedShipping);
      
      toast({
        title: "Shipping Information Saved",
        description: "Proceeding to checkout...",
      });
      
      setIsSubmitting(false);
      navigate('/checkout');
    }, 1500);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Items in Cart</h1>
          <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to shipping.</p>
          <Button asChild className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping)!;
  const subtotal = state.total;
  const shippingCost = selectedShippingOption.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/cart">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Shipping Information</h1>
            <div className="w-20"></div> {/* Spacer */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center text-luxury-gold">
              <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <span className="ml-2 font-medium">Cart</span>
            </div>
            <div className="w-16 h-1 bg-luxury-gold"></div>
            <div className="flex items-center text-luxury-gold">
              <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center text-gray-400">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
              <span className="ml-2 font-medium">Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                <h2 className="text-xl font-semibold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.firstName}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={shippingAddress.lastName}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={shippingAddress.email}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={shippingAddress.phone}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    value={shippingAddress.address}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apartment, suite, etc.</label>
                  <input
                    type="text"
                    value={shippingAddress.apartment}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'apartment', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    value={shippingAddress.city}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    value={shippingAddress.state}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    value={shippingAddress.zipCode}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => handleAddressChange(shippingAddress, setShippingAddress, 'country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                    required
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Same as shipping address</span>
                </label>
              </div>

              {!sameAsShipping && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Billing form fields - same structure as shipping */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={billingAddress.firstName}
                      onChange={(e) => handleAddressChange(billingAddress, setBillingAddress, 'firstName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={billingAddress.lastName}
                      onChange={(e) => handleAddressChange(billingAddress, setBillingAddress, 'lastName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold"
                      required
                    />
                  </div>
                  {/* Add remaining billing fields as needed */}
                </div>
              )}
            </div>

            {/* Shipping Options */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-6">
                <Truck className="h-5 w-5 text-luxury-gold" />
                <h2 className="text-xl font-semibold">Shipping Options</h2>
              </div>

              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={cn(
                      "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                      selectedShipping === option.id
                        ? "border-luxury-gold bg-luxury-gold/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping === option.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="w-4 h-4 text-luxury-gold focus:ring-luxury-gold"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{option.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{option.name}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            {option.price === 0 ? 'FREE' : `$${option.price}`}
                          </div>
                          <div className="text-sm text-gray-500">{option.delivery}</div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping ({selectedShippingOption.name})</span>
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
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-luxury-black mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    Continue to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              {/* Security Features */}
              <div className="mt-6 pt-6 border-t">
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-600 mr-2" />
                    <span>SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Express delivery available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
