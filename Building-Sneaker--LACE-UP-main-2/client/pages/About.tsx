import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe, Heart, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@shared/products';

export default function About() {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every sneaker in our collection meets the highest standards of craftsmanship and luxury.',
      color: 'text-luxury-gold'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build meaningful relationships with sneaker enthusiasts and collectors worldwide.',
      color: 'text-luxury-deep-red'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Bringing the finest luxury sneakers to discerning customers across the globe.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Our love for sneaker culture drives everything we do, from curation to customer service.',
      color: 'text-red-500'
    }
  ];

  const team = [
    {
      name: 'Marcus Chen',
      role: 'Founder & CEO',
      bio: 'Former Nike executive with 15 years in luxury footwear',
      image: 'https://images.pexels.com/photos/2364580/pexels-photo-2364580.jpeg'
    },
    {
      name: 'Sofia Martinez',
      role: 'Head of Curation',
      bio: 'Fashion stylist and sneaker culture expert',
      image: 'https://images.pexels.com/photos/27008324/pexels-photo-27008324.jpeg'
    },
    {
      name: 'David Kim',
      role: 'Creative Director',
      bio: 'Award-winning designer from luxury fashion houses',
      image: 'https://images.pexels.com/photos/20350042/pexels-photo-20350042.jpeg'
    }
  ];

  const stats = [
    { number: '25,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Premium Brands' },
    { number: '50+', label: 'Countries Served' },
    { number: '99.8%', label: 'Customer Satisfaction' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredProducts[0]?.image}
            alt="About Lace UP"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black/90 via-luxury-black/70 to-luxury-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="text-white">Redefining</span>
            <span className="text-luxury-gold"> Luxury</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            At Lace UP, we believe that sneakers are more than footwear—they're a form of self-expression, 
            a statement of style, and a testament to craftsmanship.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold px-8 py-4"
          >
            <Link to="/collections">
              Explore Our Story
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-luxury-black">Our</span>
                  <span className="text-luxury-gold"> Story</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Founded in 2019 by a team of sneaker enthusiasts and luxury retail veterans, 
                  Lace UP was born from a simple vision: to create the world's most curated 
                  collection of premium sneakers.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  What started as a small boutique has evolved into a global destination for 
                  discerning sneaker collectors who demand authenticity, quality, and exclusivity. 
                  We partner directly with the world's most prestigious brands to bring you 
                  limited editions, collaborations, and timeless classics.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every sneaker in our collection is hand-selected by our curation team, 
                  ensuring that you receive only the finest examples of footwear artistry.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`${index === 0 ? 'col-span-2' : ''} relative overflow-hidden rounded-2xl shadow-lg group`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">Our</span>
              <span className="text-luxury-gold"> Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Lace UP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${value.color} bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <value.icon className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-luxury-black">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">By The</span>
              <span className="text-luxury-gold"> Numbers</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our commitment to excellence reflected in our achievements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-luxury-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">Meet Our</span>
              <span className="text-luxury-gold"> Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind Lace UP's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-luxury-black">{member.name}</h3>
                <p className="text-luxury-gold font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">The Lace UP</span>
              <span className="text-luxury-gold"> Promise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your satisfaction is our commitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Shield className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">100% Authentic</h3>
              <p className="text-gray-600">
                Every sneaker comes with a certificate of authenticity. We guarantee the legitimacy of every product.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Truck className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Global Shipping</h3>
              <p className="text-gray-600">
                Fast, secure, and insured shipping worldwide. White-glove delivery service available.
              </p>
            </div>
            
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Star className="h-16 w-16 text-luxury-gold mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-4">Premium Service</h3>
              <p className="text-gray-600">
                Dedicated customer service team and personal shopping consultations available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-luxury-deep-red to-luxury-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to
            <span className="text-luxury-gold"> Lace UP?</span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join our community of sneaker enthusiasts and discover your next favorite pair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button
                size="lg"
                className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold px-8 py-4"
              >
                Start Shopping
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-luxury-black px-8 py-4"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
