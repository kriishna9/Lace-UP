import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HeadphonesIcon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      details: ['123 Luxury Avenue', 'Fashion District, NY 10001', 'United States'],
      color: 'text-luxury-gold'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568', 'Toll-free: 1-800-LACE-UP'],
      color: 'text-luxury-deep-red'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['info@laceup.com', 'support@laceup.com', 'vip@laceup.com'],
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: 12:00 PM - 5:00 PM'],
      color: 'text-green-600'
    }
  ];

  const departments = [
    {
      icon: MessageCircle,
      title: 'General Inquiries',
      description: 'Questions about products, orders, or our services',
      email: 'info@laceup.com'
    },
    {
      icon: HeadphonesIcon,
      title: 'Customer Support',
      description: 'Help with orders, returns, or technical issues',
      email: 'support@laceup.com'
    },
    {
      icon: User,
      title: 'VIP Services',
      description: 'Exclusive services for our premium customers',
      email: 'vip@laceup.com'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-luxury-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Get In</span>
            <span className="text-luxury-gold"> Touch</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're here to help with any questions about our products, services, or your shopping experience.
            Our team is committed to providing exceptional customer service.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  <span className="text-luxury-black">Send Us A</span>
                  <span className="text-luxury-gold"> Message</span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="product">Product Question</option>
                      <option value="return">Returns & Exchanges</option>
                      <option value="vip">VIP Services</option>
                      <option value="partnership">Business Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-luxury-gold transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold py-4 text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-luxury-black mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-luxury-black">Contact</span>
                  <span className="text-luxury-gold"> Information</span>
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We're committed to providing exceptional customer service. Whether you need help with a purchase, 
                  have questions about our products, or want to learn more about our VIP services, we're here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${info.color} bg-gray-50 p-3 rounded-xl`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-luxury-black">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">Choose Your</span>
              <span className="text-luxury-gold"> Department</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Direct your inquiry to the right team for faster, more specialized assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="group text-center bg-gray-50 hover:bg-luxury-black hover:text-white p-8 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:scale-105"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-luxury-gold text-luxury-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-luxury-black transition-colors duration-300">
                  <dept.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{dept.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300 mb-6 transition-colors duration-300">
                  {dept.description}
                </p>
                <a
                  href={`mailto:${dept.email}`}
                  className="inline-flex items-center text-luxury-gold group-hover:text-luxury-gold font-medium hover:underline"
                >
                  {dept.email}
                  <Send className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-luxury-black">Visit Our</span>
              <span className="text-luxury-gold"> Showroom</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience our curated collection in person at our flagship showroom in the heart of the Fashion District
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-luxury-black">Flagship Showroom</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-luxury-gold mr-3" />
                      <span>123 Luxury Avenue, Fashion District, NY 10001</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-luxury-gold mr-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-luxury-gold mr-3" />
                      <span>Mon - Fri: 9 AM - 8 PM</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-luxury-black">What to Expect:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Personal styling consultations</li>
                    <li>• Exclusive in-store only products</li>
                    <li>• Authentication services</li>
                    <li>• VIP private shopping experiences</li>
                  </ul>
                </div>

                <Button className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold">
                  Book a Visit
                </Button>
              </div>

              <div className="h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-luxury-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">Have Questions?</span>
            <span className="text-luxury-gold"> We Have Answers</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Check out our comprehensive FAQ section for instant answers to common questions.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-luxury-gold hover:bg-luxury-gold-light text-luxury-black font-semibold px-8 py-4"
          >
            <a href="/faq">View FAQ</a>
          </Button>
        </div>
      </section>
    </div>
  );
}
