export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  detailedDescription: string;
  category: 'lifestyle' | 'basketball' | 'running' | 'casual' | 'limited-edition';
  sizes: string[];
  colors: string[];
  featured: boolean;
  newArrival: boolean;
  onSale: boolean;
  rating: number;
  reviews: number;
  stock: number;
  material: string;
  releaseDate: string;
  sku: string;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Lace UP Elite Red Thunder',
    brand: 'Lace UP',
    price: 299,
    originalPrice: 349,
    image: 'https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg',
    images: [
      'https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg',
      'https://images.pexels.com/photos/9287210/pexels-photo-9287210.jpeg',
      'https://images.pexels.com/photos/27127413/pexels-photo-27127413.jpeg'
    ],
    description: 'Premium red and white sneakers with a modern design that commands attention.',
    detailedDescription: 'The Elite Red Thunder represents the pinnacle of streetwear luxury. Featuring a bold red and white colorway, these sneakers are crafted with premium leather and advanced cushioning technology. The high-contrast design makes a statement while delivering all-day comfort.',
    category: 'lifestyle',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    colors: ['Red', 'White'],
    featured: true,
    newArrival: true,
    onSale: true,
    rating: 4.8,
    reviews: 124,
    stock: 15,
    material: 'Premium Leather, Rubber Sole',
    releaseDate: '2024-01-15',
    sku: 'LU-ERT-001'
  },
  {
    id: '2',
    name: 'Jordan Legacy Multi-Color',
    brand: 'Jordan',
    price: 450,
    image: 'https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg',
    images: [
      'https://images.pexels.com/photos/10853637/pexels-photo-10853637.jpeg',
      'https://images.pexels.com/photos/2364580/pexels-photo-2364580.jpeg'
    ],
    description: 'Iconic Jordan silhouette with unique multi-color design and premium branding.',
    detailedDescription: 'This Jordan Legacy model features a stunning multi-color design that pays homage to the brand\'s rich basketball heritage. With Air Jordan 1 DNA and modern comfort innovations, these sneakers bridge the gap between performance and style.',
    category: 'basketball',
    sizes: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'],
    colors: ['Multi-Color', 'Black', 'White'],
    featured: true,
    newArrival: true,
    onSale: false,
    rating: 4.9,
    reviews: 89,
    stock: 8,
    material: 'Leather, Synthetic, Air Cushioning',
    releaseDate: '2024-02-01',
    sku: 'JD-LMC-002'
  },
  {
    id: '3',
    name: 'Puma Thunder Orange Blast',
    brand: 'Puma',
    price: 179,
    image: 'https://images.pexels.com/photos/1879101/pexels-photo-1879101.jpeg',
    images: [
      'https://images.pexels.com/photos/1879101/pexels-photo-1879101.jpeg',
      'https://images.pexels.com/photos/19882424/pexels-photo-19882424.jpeg'
    ],
    description: 'Bold orange and metallic sneakers that make a vibrant statement.',
    detailedDescription: 'The Thunder Orange Blast embodies Puma\'s commitment to bold design and athletic performance. Featuring a striking orange colorway with metallic accents, these sneakers deliver both style and comfort for the fashion-forward athlete.',
    category: 'casual',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Orange', 'Metallic', 'White'],
    featured: false,
    newArrival: true,
    onSale: false,
    rating: 4.6,
    reviews: 156,
    stock: 22,
    material: 'Textile, Synthetic Leather, Rubber',
    releaseDate: '2024-01-20',
    sku: 'PM-TOB-003'
  },
  {
    id: '4',
    name: 'Nike Dunk Low Cacao',
    brand: 'Nike',
    price: 289,
    originalPrice: 329,
    image: 'https://images.pexels.com/photos/20298291/pexels-photo-20298291.png',
    images: [
      'https://images.pexels.com/photos/20298291/pexels-photo-20298291.png',
      'https://images.pexels.com/photos/20298286/pexels-photo-20298286.png'
    ],
    description: 'Classic Nike Dunk Low in sophisticated cacao colorway.',
    detailedDescription: 'The Nike Dunk Low Cacao brings timeless basketball style to the streets. This premium iteration features rich cacao tones with crisp white accents, delivering the perfect balance of heritage design and modern appeal.',
    category: 'lifestyle',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5'],
    colors: ['Cacao', 'White'],
    featured: true,
    newArrival: false,
    onSale: true,
    rating: 4.7,
    reviews: 203,
    stock: 12,
    material: 'Leather, Rubber Sole',
    releaseDate: '2023-11-10',
    sku: 'NK-DLC-004'
  },
  {
    id: '5',
    name: 'Lace UP Metallic Elite',
    brand: 'Lace UP',
    price: 389,
    image: 'https://images.pexels.com/photos/27008324/pexels-photo-27008324.jpeg',
    images: [
      'https://images.pexels.com/photos/27008324/pexels-photo-27008324.jpeg',
      'https://images.pexels.com/photos/20350042/pexels-photo-20350042.jpeg'
    ],
    description: 'Luxury metallic sneakers with premium satin finish.',
    detailedDescription: 'The Metallic Elite represents the pinnacle of luxury streetwear. Featuring a stunning metallic finish and displayed on luxurious satin fabric, these sneakers are designed for those who appreciate the finer things in life.',
    category: 'limited-edition',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'],
    colors: ['Metallic', 'Silver', 'Gold'],
    featured: true,
    newArrival: true,
    onSale: false,
    rating: 4.9,
    reviews: 78,
    stock: 5,
    material: 'Premium Metallic Leather, Satin Lining',
    releaseDate: '2024-02-15',
    sku: 'LU-ME-005'
  },
  {
    id: '6',
    name: 'Nike Dunk Low Medium Olive',
    brand: 'Nike',
    price: 259,
    image: 'https://images.pexels.com/photos/20298292/pexels-photo-20298292.png',
    images: [
      'https://images.pexels.com/photos/20298292/pexels-photo-20298292.png',
      'https://images.pexels.com/photos/2404959/pexels-photo-2404959.png'
    ],
    description: 'Stylish Nike Dunk Low in medium olive and white colorway.',
    detailedDescription: 'The Nike Dunk Low Medium Olive offers a fresh take on the classic silhouette. Perfect for casual wear, this colorway combines earthy olive tones with clean white accents for a versatile and stylish look.',
    category: 'casual',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['Olive', 'White', 'Green'],
    featured: false,
    newArrival: false,
    onSale: false,
    rating: 4.5,
    reviews: 341,
    stock: 18,
    material: 'Leather, Canvas, Rubber',
    releaseDate: '2023-09-15',
    sku: 'NK-DLMO-006'
  },
  {
    id: '7',
    name: 'Premium White Minimalist',
    brand: 'Lace UP',
    price: 229,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    images: [
      'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg'
    ],
    description: 'Clean, minimalist white sneakers with modern lace design.',
    detailedDescription: 'These minimalist white sneakers embody clean design principles and premium craftsmanship. Perfect for those who appreciate understated elegance and versatile styling options.',
    category: 'lifestyle',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['White', 'Off-White'],
    featured: false,
    newArrival: true,
    onSale: false,
    rating: 4.6,
    reviews: 92,
    stock: 25,
    material: 'Premium Leather, Cotton Laces',
    releaseDate: '2024-01-30',
    sku: 'LU-PWM-007'
  },
  {
    id: '8',
    name: 'Vibrant Coral Collection',
    brand: 'Lace UP',
    price: 259,
    image: 'https://images.pexels.com/photos/26861953/pexels-photo-26861953.jpeg',
    images: [
      'https://images.pexels.com/photos/26861953/pexels-photo-26861953.jpeg'
    ],
    description: 'Elegant moccasins in vibrant coral and lilac with modern design.',
    detailedDescription: 'The Vibrant Coral Collection features a unique blend of coral and lilac tones. These elegant moccasin-inspired sneakers offer a modern twist on classic design with premium materials and exceptional comfort.',
    category: 'limited-edition',
    sizes: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5'],
    colors: ['Coral', 'Lilac', 'Pink'],
    featured: true,
    newArrival: true,
    onSale: false,
    rating: 4.4,
    reviews: 67,
    stock: 10,
    material: 'Suede, Premium Leather',
    releaseDate: '2024-02-10',
    sku: 'LU-VCC-008'
  },
  {
    id: '9',
    name: 'Yellow Streetwear Collection',
    brand: 'Lace UP',
    price: 199,
    image: 'https://images.pexels.com/photos/19882426/pexels-photo-19882426.jpeg',
    images: [
      'https://images.pexels.com/photos/19882426/pexels-photo-19882426.jpeg',
      'https://images.pexels.com/photos/19882424/pexels-photo-19882424.jpeg'
    ],
    description: 'Colorful skateboard-inspired sneakers reflecting vibrant style.',
    detailedDescription: 'Part of our vibrant streetwear collection, these yellow-accented sneakers capture the spirit of skateboarding culture. Designed for comfort and style, perfect for expressing your creative side.',
    category: 'casual',
    sizes: ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Yellow', 'Blue', 'Multi-Color'],
    featured: false,
    newArrival: true,
    onSale: false,
    rating: 4.3,
    reviews: 134,
    stock: 20,
    material: 'Canvas, Rubber, Synthetic',
    releaseDate: '2024-01-25',
    sku: 'LU-YSC-009'
  },
  {
    id: '10',
    name: 'Sneaker Collection Box Set',
    brand: 'Lace UP',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/2364582/pexels-photo-2364582.jpeg',
    images: [
      'https://images.pexels.com/photos/2364582/pexels-photo-2364582.jpeg'
    ],
    description: 'Exclusive collection box featuring multiple premium sneaker styles.',
    detailedDescription: 'This exclusive collection box features multiple premium sneaker styles in one comprehensive package. Perfect for the serious collector or as the ultimate gift for sneaker enthusiasts.',
    category: 'limited-edition',
    sizes: ['8', '9', '10', '11'],
    colors: ['Various'],
    featured: true,
    newArrival: false,
    onSale: true,
    rating: 4.9,
    reviews: 23,
    stock: 3,
    material: 'Various Premium Materials',
    releaseDate: '2023-12-01',
    sku: 'LU-SCB-010'
  },
  {
    id: '11',
    name: 'Classic Black & White Elite',
    brand: 'Nike',
    price: 199,
    image: 'https://images.pexels.com/photos/20298286/pexels-photo-20298286.png',
    images: [
      'https://images.pexels.com/photos/20298286/pexels-photo-20298286.png'
    ],
    description: 'Timeless black and white sneakers on premium fabric surface.',
    detailedDescription: 'These classic black and white sneakers represent timeless design and quality craftsmanship. Displayed on premium white fabric, they showcase the perfect balance of simplicity and sophistication.',
    category: 'lifestyle',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White'],
    featured: false,
    newArrival: false,
    onSale: false,
    rating: 4.5,
    reviews: 298,
    stock: 30,
    material: 'Leather, Textile, Rubber',
    releaseDate: '2023-08-20',
    sku: 'NK-CBWE-011'
  },
  {
    id: '12',
    name: 'Retro Red Vintage',
    brand: 'Lace UP',
    price: 279,
    image: 'https://images.pexels.com/photos/9287210/pexels-photo-9287210.jpeg',
    images: [
      'https://images.pexels.com/photos/9287210/pexels-photo-9287210.jpeg'
    ],
    description: 'Vibrant retro sneaker with striking red background aesthetic.',
    detailedDescription: 'This retro-inspired sneaker captures the essence of vintage streetwear culture. The vibrant design and bold red aesthetic make it a standout piece for any collection.',
    category: 'lifestyle',
    sizes: ['6', '7', '8', '9', '10', '11'],
    colors: ['Red', 'Vintage', 'Multi-Color'],
    featured: true,
    newArrival: false,
    onSale: false,
    rating: 4.6,
    reviews: 87,
    stock: 14,
    material: 'Canvas, Leather Accents, Rubber',
    releaseDate: '2023-10-15',
    sku: 'LU-RRV-012'
  },
  {
    id: '13',
    name: 'Desert Tan Premium',
    brand: 'Lace UP',
    price: 329,
    image: 'https://images.pexels.com/photos/27608950/pexels-photo-27608950.jpeg',
    images: [
      'https://images.pexels.com/photos/27608950/pexels-photo-27608950.jpeg'
    ],
    description: 'Trendy black leather boots with lace ties and fashion elegance.',
    detailedDescription: 'These trendy leather boots combine classic lace-up design with modern elegance. Set against a distinctive cyan background, they represent the perfect fusion of fashion and functionality.',
    category: 'lifestyle',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    colors: ['Black', 'Tan', 'Brown'],
    featured: false,
    newArrival: true,
    onSale: false,
    rating: 4.7,
    reviews: 156,
    stock: 16,
    material: 'Premium Leather, Cotton Laces',
    releaseDate: '2024-01-10',
    sku: 'LU-DTP-013'
  },
  {
    id: '14',
    name: 'Championship Edition',
    brand: 'Jordan',
    price: 549,
    image: 'https://images.pexels.com/photos/2364580/pexels-photo-2364580.jpeg',
    images: [
      'https://images.pexels.com/photos/2364580/pexels-photo-2364580.jpeg'
    ],
    description: 'Limited championship edition featuring multiple premium styles.',
    detailedDescription: 'This championship edition represents the pinnacle of basketball-inspired luxury. Featuring multiple premium styles and collector-grade presentation, it\'s designed for serious enthusiasts.',
    category: 'limited-edition',
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Various Championship Colors'],
    featured: true,
    newArrival: true,
    onSale: false,
    rating: 4.8,
    reviews: 45,
    stock: 7,
    material: 'Premium Leather, Air Technology',
    releaseDate: '2024-02-20',
    sku: 'JD-CE-014'
  },
  {
    id: '15',
    name: 'Luxury Designer Edition',
    brand: 'Lace UP',
    price: 759,
    image: 'https://images.pexels.com/photos/4276653/pexels-photo-4276653.jpeg',
    images: [
      'https://images.pexels.com/photos/4276653/pexels-photo-4276653.jpeg'
    ],
    description: 'High-end designer collection with luxury monogram pattern.',
    detailedDescription: 'This luxury designer edition features an exclusive monogram pattern and premium leather construction. Representing the absolute pinnacle of luxury sneaker design and craftsmanship.',
    category: 'limited-edition',
    sizes: ['7', '7.5', '8', '8.5', '9', '9.5', '10'],
    colors: ['Luxury Brown', 'Gold Monogram'],
    featured: true,
    newArrival: true,
    onSale: false,
    rating: 5.0,
    reviews: 12,
    stock: 4,
    material: 'Luxury Leather, Gold Hardware',
    releaseDate: '2024-03-01',
    sku: 'LU-LDE-015'
  }
];

export const getProductsByCategory = (category: string) => {
  return mockProducts.filter(product => product.category === category);
};

export const getFeaturedProducts = () => {
  return mockProducts.filter(product => product.featured);
};

export const getNewArrivals = () => {
  return mockProducts.filter(product => product.newArrival);
};

export const getOnSaleProducts = () => {
  return mockProducts.filter(product => product.onSale);
};

export const getProductById = (id: string) => {
  return mockProducts.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.colors.some(color => color.toLowerCase().includes(lowercaseQuery))
  );
};
