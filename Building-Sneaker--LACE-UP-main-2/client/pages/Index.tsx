import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts, getNewArrivals } from '@shared/products';
import { useState, useEffect } from 'react';

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivals().slice(0, 4);

  const heroSlides = [
    {
      title: "ELEVATE YOUR GAME",
      subtitle: "Luxury meets performance in our premium collection",
      image: "https://images.pexels.com/photos/233312/pexels-photo-233312.jpeg",
      cta: "Shop Now"
    },
    {
      title: "LIMITED EDITION",
      subtitle: "Exclusive designs for the discerning sneaker enthusiast",
      image: "https://images.pexels.com/photos/27008324/pexels-photo-27008324.jpeg",
      cta: "Explore Collection"
    },
    {
      title: "GOLDEN STANDARD",
      subtitle: "Where craftsmanship meets street culture",
      image: "https://images.pexels.com/photos/20350042/pexels-photo-20350042.jpeg",
      cta: "Discover More"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-luxury-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover opacity-40 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/80 via-luxury-black/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              <span className="block opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                {heroSlides[currentSlide].title.split(' ')[0]}
              </span>
              <span className="block text-luxury-gold opacity-0 animate-slide-up" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                {heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto opacity-0 animate-slide-up" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <Button 
                asChild 
                size="lg" 
                className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/shop">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-luxury-black font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/collections">
                  View Collections
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-luxury-gold scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-luxury-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                <Truck className="h-8 w-8 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free delivery on orders over $200</p>
            </div>
            <div className="text-center group">
              <div className="bg-luxury-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                <Shield className="h-8 w-8 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authenticity Guaranteed</h3>
              <p className="text-gray-600">100% authentic products with certificate</p>
            </div>
            <div className="text-center group">
              <div className="bg-luxury-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-luxury-gold/20 transition-colors duration-300">
                <RefreshCw className="h-8 w-8 text-luxury-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-luxury-black">Featured</span>
              <span className="text-luxury-gold"> Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most coveted designs that define luxury streetwear
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group relative overflow-hidden rounded-2xl bg-gray-50 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center mb-2">
                    <div className="flex text-luxury-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">({product.reviews})</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-luxury-gold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-luxury-black hover:bg-gray-800 text-white px-8 py-4"
            >
              <Link to="/shop">
                Shop All Featured
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">New</span>
              <span className="text-luxury-gold"> Arrivals</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Be the first to step into the future of luxury sneakers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div 
                key={product.id} 
                className="group relative overflow-hidden rounded-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {product.newArrival && (
                  <div className="absolute top-4 left-4 bg-luxury-deep-red text-white text-xs font-semibold px-3 py-1 rounded-full">
                    NEW
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-luxury-gold transition-colors duration-300">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-luxury-gold font-bold">${product.price}</span>
                    <Button size="sm" variant="ghost" className="text-white hover:text-luxury-gold hover:bg-luxury-gold/10">
                      Quick View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg"
              className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4"
            >
              <Link to="/shop?filter=new-arrivals">
                View All New Arrivals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-deep-red to-luxury-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            JOIN THE
            <span className="text-luxury-gold"> ELITE</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Subscribe to our exclusive membership for early access to limited drops, 
            personalized styling sessions, and VIP events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold"
            />
            <Button 
              size="lg"
              className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black px-8 py-4 font-semibold"
            >
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
