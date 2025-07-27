const mongoose = require('mongoose');
const { Product }= require('./models/product'); // Adjust this path if needed
const MONGO_URI = 'mongodb+srv://sudarshan138:2310303@cluster0.o6thrxf.mongodb.net/'; // Include DB name at the end

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany(); // Optional: clears existing products

    const categories = ["Electronics", "Wearable", "Home", "Other"];
    const userId = '6884f7d9556bb1655dc9d536';

    const moreProducts = [
  {
    name: 'LED Monitor 24"',
    description: 'Full HD 24-inch LED monitor with HDMI and VGA support.',
    price: 8999,
    discount: 12,
    category: 'Electronics',
    brand: 'ViewPro',
    sizes: [],
    quantity: 35,
    images: ['https://picsum.photos/seed/p6/600/400'],
    user: userId,
  },
  {
    name: 'Smartwatch Alpha',
    description: 'Stylish smartwatch with heart rate and sleep tracking.',
    price: 3499,
    discount: 8,
    category: 'Wearable',
    brand: 'ChronoTech',
    sizes: ['M', 'L'],
    quantity: 60,
    images: ['https://picsum.photos/seed/p7/600/400'],
    user: userId,
  },
  {
    name: 'Air Purifier Plus',
    description: 'Cleans air and removes allergens and dust particles.',
    price: 5999,
    discount: 10,
    category: 'Home',
    brand: 'PureAir',
    sizes: [],
    quantity: 20,
    images: ['https://picsum.photos/seed/p8/600/400'],
    user: userId,
  },
  {
    name: 'Bluetooth Speaker BassBoom',
    description: 'Portable speaker with deep bass and long battery life.',
    price: 2499,
    discount: 15,
    category: 'Electronics',
    brand: 'BoomSound',
    sizes: [],
    quantity: 100,
    images: ['https://picsum.photos/seed/p9/600/400'],
    user: userId,
  },
  {
    name: 'Yoga Mat Pro',
    description: 'High-density anti-slip mat for yoga and workouts.',
    price: 999,
    discount: 5,
    category: 'Other',
    brand: 'ZenFlex',
    sizes: ['M', 'L'],
    quantity: 80,
    images: ['https://picsum.photos/seed/p10/600/400'],
    user: userId,
  },
  {
    name: 'Laptop Sleeve 15.6"',
    description: 'Protective and lightweight sleeve for laptops.',
    price: 649,
    discount: 10,
    category: 'Other',
    brand: 'SafeGuard',
    sizes: [],
    quantity: 90,
    images: ['https://picsum.photos/seed/p11/600/400'],
    user: userId,
  },
  {
    name: 'Hair Dryer IonicPro',
    description: 'Fast drying and frizz control with ionic technology.',
    price: 2199,
    discount: 18,
    category: 'Home',
    brand: 'StyleEase',
    sizes: [],
    quantity: 55,
    images: ['https://picsum.photos/seed/p12/600/400'],
    user: userId,
  },
  {
    name: 'Smart Glasses Lite',
    description: 'Audio-enabled smart glasses with touch controls.',
    price: 6999,
    discount: 12,
    category: 'Wearable',
    brand: 'VisionX',
    sizes: ['S', 'M'],
    quantity: 30,
    images: ['https://picsum.photos/seed/p13/600/400'],
    user: userId,
  },
  {
    name: 'Robot Vacuum Cleaner',
    description: 'Automatic smart cleaning with app control.',
    price: 15999,
    discount: 20,
    category: 'Home',
    brand: 'CleanBot',
    sizes: [],
    quantity: 15,
    images: ['https://picsum.photos/seed/p14/600/400'],
    user: userId,
  },
  {
    name: 'Neon Gaming Keyboard',
    description: 'Mechanical RGB keyboard with customizable lighting.',
    price: 2999,
    discount: 25,
    category: 'Electronics',
    brand: 'KeyMaster',
    sizes: [],
    quantity: 70,
    images: ['https://picsum.photos/seed/p15/600/400'],
    user: userId,
  },
  {
    name: 'Analog Watch Classic',
    description: 'Timeless analog watch with leather strap.',
    price: 1799,
    discount: 5,
    category: 'Wearable',
    brand: 'TimeCraft',
    sizes: ['S', 'M', 'L'],
    quantity: 85,
    images: ['https://picsum.photos/seed/p16/600/400'],
    user: userId,
  },
  {
    name: 'Microwave Oven 20L',
    description: 'Compact and powerful microwave for daily use.',
    price: 6499,
    discount: 10,
    category: 'Home',
    brand: 'HeatMaster',
    sizes: [],
    quantity: 25,
    images: ['https://picsum.photos/seed/p17/600/400'],
    user: userId,
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Comfortable mesh chair with lumbar support.',
    price: 8499,
    discount: 18,
    category: 'Home',
    brand: 'SitWell',
    sizes: [],
    quantity: 40,
    images: ['https://picsum.photos/seed/p18/600/400'],
    user: userId,
  },
  {
    name: 'Tablet Z10',
    description: '10-inch Android tablet with high-res display.',
    price: 11999,
    discount: 12,
    category: 'Electronics',
    brand: 'TabCore',
    sizes: [],
    quantity: 20,
    images: ['https://picsum.photos/seed/p19/600/400'],
    user: userId,
  },
  {
    name: 'Wireless Mouse Swift',
    description: 'Ergonomic mouse with silent click and fast response.',
    price: 699,
    discount: 10,
    category: 'Electronics',
    brand: 'ClickPro',
    sizes: [],
    quantity: 150,
    images: ['https://picsum.photos/seed/p20/600/400'],
    user: userId,
  }
];

    await Product.insertMany(moreProducts);
    console.log('✅ Seeder completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeder error:', error);
    process.exit(1);
  }
};

seedProducts();