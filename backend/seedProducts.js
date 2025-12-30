const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Electronics - Mobile
  {
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Mobile",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description: "The latest iPhone with advanced camera system and A17 Pro chip.",
    specifications: "6.1-inch display, A17 Pro chip, 128GB storage, Triple camera system",
    rating: 4.8
  },
  {
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "Mobile",
    price: 899,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    description: "Premium Android smartphone with AI-powered features.",
    specifications: "6.2-inch display, Snapdragon 8 Gen 3, 256GB storage, 50MP camera",
    rating: 4.7
  },
  {
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Mobile",
    price: 799,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description: "Flagship killer with fast charging and smooth performance.",
    specifications: "6.82-inch AMOLED, Snapdragon 8 Gen 3, 100W charging",
    rating: 4.6
  },
  {
    name: "Google Pixel 8",
    brand: "Google",
    category: "Mobile",
    price: 699,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
    description: "Pure Android experience with AI photography features.",
    specifications: "6.2-inch OLED, Google Tensor G3, Magic Eraser",
    rating: 4.5
  },
  {
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    category: "Mobile",
    price: 649,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400",
    description: "Photography-focused smartphone with Leica cameras.",
    specifications: "6.73-inch LTPO AMOLED, Snapdragon 8 Gen 3, 50MP quad camera",
    rating: 4.4
  },
  
  // Electronics - Laptop
  {
    name: "MacBook Air M3",
    brand: "Apple",
    category: "Laptop",
    price: 1299,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    description: "Ultra-thin laptop with M3 chip for exceptional performance.",
    specifications: "13.6-inch Liquid Retina display, M3 chip, 8GB RAM, 256GB SSD",
    rating: 4.9
  },
  {
    name: "Dell XPS 13",
    brand: "Dell",
    category: "Laptop",
    price: 1099,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    description: "Premium Windows laptop with InfinityEdge display.",
    specifications: "13.4-inch FHD+ display, Intel Core i7, 16GB RAM, 512GB SSD",
    rating: 4.6
  },
  {
    name: "ThinkPad X1 Carbon",
    brand: "Lenovo",
    category: "Laptop",
    price: 1399,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400",
    description: "Business laptop with military-grade durability.",
    specifications: "14-inch 2.8K display, Intel Core i7, 16GB RAM, 1TB SSD",
    rating: 4.7
  },
  {
    name: "HP Spectre x360",
    brand: "HP",
    category: "Laptop",
    price: 1199,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    description: "2-in-1 convertible laptop with OLED display.",
    specifications: "13.5-inch OLED touchscreen, Intel Core i7, 16GB RAM",
    rating: 4.5
  },
  {
    name: "ASUS ROG Zephyrus",
    brand: "ASUS",
    category: "Laptop",
    price: 1799,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    description: "Gaming laptop with RTX graphics and high refresh display.",
    specifications: "15.6-inch 165Hz display, AMD Ryzen 9, RTX 4070, 32GB RAM",
    rating: 4.8
  },

  // Electronics - Audio
  {
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "Audio",
    price: 249,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
    description: "Wireless earbuds with active noise cancellation.",
    specifications: "H2 chip, Active Noise Cancellation, 6 hours battery life",
    rating: 4.5
  },
  {
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "Audio",
    price: 399,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    description: "Industry-leading noise canceling headphones.",
    specifications: "30-hour battery, Quick Charge, Multipoint connection",
    rating: 4.8
  },
  {
    name: "Bose QuietComfort 45",
    brand: "Bose",
    category: "Audio",
    price: 329,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400",
    description: "Premium noise-canceling headphones with balanced sound.",
    specifications: "24-hour battery, TriPort technology, Lightweight design",
    rating: 4.6
  },
  {
    name: "JBL Charge 5",
    brand: "JBL",
    category: "Audio",
    price: 179,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    description: "Portable Bluetooth speaker with powerbank feature.",
    specifications: "20-hour playtime, IP67 waterproof, PartyBoost compatible",
    rating: 4.4
  },
  {
    name: "Sennheiser HD 660S2",
    brand: "Sennheiser",
    category: "Audio",
    price: 599,
    image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=400",
    description: "Audiophile open-back headphones for critical listening.",
    specifications: "Open-back design, 150-ohm impedance, Detachable cable",
    rating: 4.9
  },

  // Fashion - Dress
  {
    name: "Summer Floral Dress",
    brand: "Zara",
    category: "Dress",
    price: 89,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    description: "Elegant floral print dress perfect for summer occasions.",
    specifications: "100% Cotton, Machine washable, Available in S-XL sizes",
    rating: 4.3
  },
  {
    name: "Business Formal Dress",
    brand: "H&M",
    category: "Dress",
    price: 129,
    image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=400",
    description: "Professional black dress suitable for office wear.",
    specifications: "Polyester blend, Dry clean only, Tailored fit",
    rating: 4.4
  },
  {
    name: "Cocktail Party Dress",
    brand: "Forever 21",
    category: "Dress",
    price: 79,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    description: "Glamorous sequined dress for evening events.",
    specifications: "Sequin embellishment, Bodycon fit, Available in multiple colors",
    rating: 4.2
  },
  {
    name: "Casual Maxi Dress",
    brand: "Uniqlo",
    category: "Dress",
    price: 59,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    description: "Comfortable long dress for everyday wear.",
    specifications: "Jersey fabric, Relaxed fit, Machine washable",
    rating: 4.1
  },
  {
    name: "Wedding Guest Dress",
    brand: "ASOS",
    category: "Dress",
    price: 149,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    description: "Elegant midi dress perfect for special occasions.",
    specifications: "Chiffon fabric, A-line silhouette, Lined bodice",
    rating: 4.5
  },

  // Fitness & Training
  {
    name: "Adjustable Dumbbells Set",
    brand: "Bowflex",
    category: "Fitness & Training",
    price: 349,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Space-saving adjustable dumbbells for home workouts.",
    specifications: "5-52.5 lbs per dumbbell, Quick weight adjustment, Compact design",
    rating: 4.6
  },
  {
    name: "Yoga Mat Premium",
    brand: "Manduka",
    category: "Fitness & Training",
    price: 89,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
    description: "High-quality yoga mat with superior grip and cushioning.",
    specifications: "6mm thickness, Non-slip surface, Eco-friendly materials",
    rating: 4.7
  },
  {
    name: "Resistance Bands Set",
    brand: "TRX",
    category: "Fitness & Training",
    price: 49,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Complete resistance training system for full-body workouts.",
    specifications: "5 resistance levels, Door anchor included, Exercise guide",
    rating: 4.5
  },
  {
    name: "Treadmill Pro",
    brand: "NordicTrack",
    category: "Fitness & Training",
    price: 1299,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Commercial-grade treadmill with interactive training.",
    specifications: "3.6 CHP motor, 22-inch HD touchscreen, iFit compatible",
    rating: 4.8
  },
  {
    name: "Kettlebell Set",
    brand: "CAP Barbell",
    category: "Fitness & Training",
    price: 199,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    description: "Cast iron kettlebell set for strength training.",
    specifications: "15, 25, 35 lb kettlebells, Wide handle grip, Flat bottom",
    rating: 4.3
  },

  // Home & Kitchen
  {
    name: "Smart Coffee Maker",
    brand: "Keurig",
    category: "Home & Kitchen",
    price: 199,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
    description: "WiFi-enabled coffee maker with app control.",
    specifications: "12-cup capacity, Programmable, Auto shut-off, Multiple brew sizes",
    rating: 4.4
  },
  {
    name: "Air Fryer Deluxe",
    brand: "Ninja",
    category: "Home & Kitchen",
    price: 149,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Multi-function air fryer for healthy cooking.",
    specifications: "8-quart capacity, 8 cooking functions, Digital display",
    rating: 4.6
  },
  {
    name: "Stand Mixer Professional",
    brand: "KitchenAid",
    category: "Home & Kitchen",
    price: 399,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Heavy-duty stand mixer for baking enthusiasts.",
    specifications: "6-quart bowl, 10 speeds, Multiple attachments included",
    rating: 4.9
  },
  {
    name: "Instant Pot Duo",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    price: 99,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "7-in-1 electric pressure cooker for quick meals.",
    specifications: "6-quart capacity, 13 programs, Stainless steel inner pot",
    rating: 4.7
  },
  {
    name: "Blender High Performance",
    brand: "Vitamix",
    category: "Home & Kitchen",
    price: 449,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Professional-grade blender for smoothies and more.",
    specifications: "2.2 HP motor, 64-oz container, Variable speed control",
    rating: 4.8
  },

  // Books
  {
    name: "The Psychology of Money",
    brand: "Penguin",
    category: "Books",
    price: 24,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    description: "Bestselling book about financial psychology and decision making.",
    specifications: "Paperback, 256 pages, English language",
    rating: 4.8
  },
  {
    name: "Atomic Habits",
    brand: "Random House",
    category: "Books",
    price: 18,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    description: "Guide to building good habits and breaking bad ones.",
    specifications: "Hardcover, 320 pages, Self-help category",
    rating: 4.9
  },
  {
    name: "Think and Grow Rich",
    brand: "Ballantine Books",
    category: "Books",
    price: 16,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    description: "Classic personal development and success philosophy.",
    specifications: "Paperback, 320 pages, Business & Economics",
    rating: 4.6
  },
  {
    name: "The 7 Habits",
    brand: "Free Press",
    category: "Books",
    price: 22,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description: "Powerful lessons in personal change and effectiveness.",
    specifications: "Paperback, 384 pages, Self-improvement",
    rating: 4.7
  },
  {
    name: "Rich Dad Poor Dad",
    brand: "Plata Publishing",
    category: "Books",
    price: 20,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
    description: "Financial education and investment strategies.",
    specifications: "Paperback, 336 pages, Personal Finance",
    rating: 4.5
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    await Product.insertMany(products);
    console.log('Products seeded successfully with categories:');
    
    // Show categories summary
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
      const count = products.filter(p => p.category === cat).length;
      console.log(`- ${cat}: ${count} products`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();