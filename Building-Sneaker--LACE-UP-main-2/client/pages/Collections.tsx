import { Link } from 'react-router-dom';
import { ArrowRight, Star, Calendar, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductsByCategory, getFeaturedProducts, getNewArrivals, getOnSaleProducts } from '@shared/products';

export default function Collections() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const newArrivals = getNewArrivals().slice(0, 4);
  const saleProducts = getOnSaleProducts().slice(0, 4);
  const lifestyleProducts = getProductsByCategory('lifestyle').slice(0, 3);
  const limitedEdition = getProductsByCategory('limited-edition').slice(0, 3);

  const collections = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Latest drops from premium brands',
      description: 'Be the first to experience the newest additions to our curated collection of luxury sneakers.',
      image: newArrivals[0]?.image,
      products: newArrivals,
      icon: Calendar,
      color: 'bg-gradient-to-br from-luxury-gold to-luxury-gold-light'
    },
    {
      id: 'limited-edition',
      title: 'Limited Edition',
      subtitle: 'Exclusive & rare finds',
      description: 'Discover one-of-a-kind pieces that represent the pinnacle of luxury sneaker design.',
      image: limitedEdition[0]?.image,
      products: limitedEdition,
      icon: Zap,
      color: 'bg-gradient-to-br from-luxury-deep-red to-red-600'
    },
    {
      id: 'featured',
      title: 'Featured Collection',
      subtitle: 'Editor\'s choice',
      description: 'Our hand-picked selection of the most coveted sneakers from leading luxury brands.',
      image: featuredProducts[0]?.image,
      products: featuredProducts,
      icon: Star,
      color: 'bg-gradient-to-br from-gray-800 to-luxury-black'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-luxury-black text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0">
          <img
            src={featuredProducts[0]?.image}
            alt="Collections"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">Curated</span>
            <span className="text-luxury-gold"> Collections</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Explore our carefully curated selections of premium sneakers from the world's most coveted brands
          </p>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">Our</span>
              <span className="text-luxury-gold"> Collections</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each collection tells a story of craftsmanship, innovation, and style
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {collections.map((collection, index) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 ${collection.color} opacity-90 group-hover:opacity-80 transition-opacity duration-300`}></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-96 flex flex-col justify-between text-white">
                  <div>
                    <div className="flex items-center mb-4">
                      <collection.icon className="h-8 w-8 mr-3" />
                      <span className="text-sm font-semibold uppercase tracking-wide opacity-90">
                        {collection.subtitle}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{collection.title}</h3>
                    <p className="text-lg opacity-90 leading-relaxed">
                      {collection.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-sm opacity-75">
                      {collection.products.length} items available
                    </div>
                    <Link to={`/shop?category=${collection.id}`}>
                      <Button
                        size="lg"
                        className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold"
                      >
                        Explore Collection
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Collection */}
      <section className="py-20 bg-gradient-to-r from-luxury-deep-red to-red-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Sale Collection
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Limited time offers on premium sneakers. Don't miss out on these exclusive deals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-luxury-gold transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-luxury-gold font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-white/60 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-xs bg-luxury-gold text-luxury-black px-2 py-1 rounded-full font-semibold">
                      SALE
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop?filter=sale">
              <Button
                size="lg"
                className="bg-white text-luxury-deep-red hover:bg-gray-100 font-semibold px-8 py-4"
              >
                View All Sale Items
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lifestyle Collection */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-luxury-black">Lifestyle</span>
                  <span className="text-luxury-gold"> Collection</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Where luxury meets everyday comfort. Our lifestyle collection features sneakers 
                  that seamlessly transition from street to sophisticated settings.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Each piece is carefully selected for its exceptional craftsmanship, 
                  premium materials, and timeless design that transcends seasonal trends.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop?category=lifestyle">
                  <Button
                    size="lg"
                    className="bg-luxury-black hover:bg-gray-800 text-white px-8 py-4"
                  >
                    Shop Lifestyle
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-white px-8 py-4"
                  >
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {lifestyleProducts.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group flex items-center space-x-4 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-luxury-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-luxury-gold font-bold">${product.price}</span>
                      <div className="flex text-luxury-gold">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Start Your
            <span className="text-luxury-gold"> Collection</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of sneaker enthusiasts who trust Lace UP for their premium footwear needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold px-8 py-4"
              >
                Browse All Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-luxury-black px-8 py-4"
              >
                Get Styling Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
