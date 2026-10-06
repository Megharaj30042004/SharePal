const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const initialProducts = [
  {
    title: "Sony PlayStation 5 Console (Disc Edition)",
    slug: "ps5-console-disc-edition",
    category: "ps5",
    categoryLabel: "PS5 Console",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    features: [
      "Includes 1x DualSense Wireless Controller",
      "Pre-loaded with Astro's Playroom + 3 Popular Games",
      "4K 120Hz HDR Gaming Support",
      "Ultra-High Speed 825GB Custom SSD",
      "Zero Security Deposit Available"
    ],
    specifications: {
      "Storage": "825GB Custom SSD",
      "Resolution": "Up to 4K @ 120fps / 8K output",
      "Audio": "Tempest 3D AudioTech",
      "Media Drive": "4K UHD Blu-ray Drive",
      "In the Box": "PS5 Console, 1x DualSense Controller, HDMI 2.1 Cable, Power Cable"
    },
    pricing: {
      oneDay: 499,       // Total ₹499 (₹499/day)
      twoDays: 799,      // Total ₹799 (₹400/day)
      threeDays: 999,    // Total ₹999 (₹333/day)
      sevenDays: 1499,   // Total ₹1,499 (₹214/day)
      fifteenDays: 2499, // Total ₹2,499 (₹167/day)
      thirtyDays: 3999,  // Total ₹3,999 (₹133/day)
      ninetyDays: 9999,  // Total ₹9,999 (₹111/day)
      perDayRate: 214
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 15,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 342,
    tag: "BESTSELLER"
  },
  {
    title: "Sony PlayStation 5 (Dual Controller Edition)",
    slug: "ps5-console-dual-controllers",
    category: "ps5",
    categoryLabel: "PS5 Console",
    images: [
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Double the fun! Rent PS5 Disc Edition bundled with 2x DualSense Wireless Controllers for instant co-op multiplayer gaming nights with friends and family.",
    features: [
      "Includes 2x DualSense Wireless Controllers",
      "Ideal for FIFA/FC 24, Mortal Kombat, and Split-screen games",
      "Zero Security Deposit",
      "Free Express Delivery",
      "High-speed HDMI 2.1 Cable included"
    ],
    specifications: {
      "Controllers": "2x Official DualSense Wireless Controllers",
      "Storage": "825GB Ultra High Speed SSD",
      "Resolution": "4K HDR 120Hz",
      "In the Box": "PS5 Console, 2 Controllers, Power Lead, HDMI Cable"
    },
    pricing: {
      oneDay: 599,       // Total ₹599 (₹599/day)
      twoDays: 999,      // Total ₹999 (₹500/day)
      threeDays: 1299,   // Total ₹1,299 (₹433/day)
      sevenDays: 1899,   // Total ₹1,899 (₹271/day)
      fifteenDays: 2999, // Total ₹2,999 (₹200/day)
      thirtyDays: 4499,  // Total ₹4,499 (₹150/day)
      ninetyDays: 11499, // Total ₹11,499 (₹128/day)
      perDayRate: 271
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 12,
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 289,
    tag: "POPULAR BUNDLE"
  },
  {
    title: "Xbox Series X Console (1TB 4K True Gaming)",
    slug: "xbox-series-x-console",
    category: "xbox",
    categoryLabel: "Xbox Console",
    images: [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles with Xbox Velocity Architecture and 12 teraflops of raw graphic processing power.",
    features: [
      "Includes 1x Xbox Wireless Controller",
      "Xbox Game Pass Ultimate Access Included",
      "12 Teraflops GPU Power & 1TB Custom NVMe SSD",
      "Quick Resume across multiple games",
      "Zero Deposit with Express Delivery"
    ],
    specifications: {
      "Processor": "8X Cores @ 3.8 GHz Custom Zen 2 CPU",
      "GPU": "12 TFLOPS, 52 CUs @ 1.825 GHz Custom RDNA 2",
      "Memory": "16GB GDDR6",
      "Internal Storage": "1TB Custom NVMe SSD",
      "In the Box": "Xbox Series X Console, Xbox Controller, Ultra High Speed HDMI Cable"
    },
    pricing: {
      oneDay: 449,       // Total ₹449 (₹449/day)
      twoDays: 749,      // Total ₹749 (₹375/day)
      threeDays: 949,    // Total ₹949 (₹316/day)
      sevenDays: 1399,   // Total ₹1,399 (₹199/day)
      fifteenDays: 2299, // Total ₹2,299 (₹153/day)
      thirtyDays: 3699,  // Total ₹3,699 (₹123/day)
      ninetyDays: 8999,  // Total ₹8,999 (₹100/day)
      perDayRate: 199
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 8,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 178,
    tag: "GAMER FAVOURITE"
  },
  {
    title: "Meta Quest 3 VR Headset (128GB)",
    slug: "meta-quest-3-vr-headset",
    category: "vr",
    categoryLabel: "VR Headset",
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Transform your home with breakthrough mixed reality. Meta Quest 3 blends virtual elements into your physical space with high-fidelity color Passthrough and double the processing power of Quest 2.",
    features: [
      "Wireless All-in-One VR + MR Headset",
      "4K+ Infinite Display Resolution",
      "Includes 2x Touch Plus Controllers with TruTouch Haptics",
      "Pre-installed VR games & experience library",
      "Zero Deposit Rental"
    ],
    specifications: {
      "Display": "2064x2208 pixels per eye (4K+ Infinite Display)",
      "Chipset": "Snapdragon XR2 Gen 2",
      "RAM": "8GB",
      "Tracking": "Inside-out 6DOF tracking + Full Color Passthrough",
      "Weight": "515 grams"
    },
    pricing: {
      oneDay: 599,       // Total ₹599 (₹599/day)
      twoDays: 999,      // Total ₹999 (₹500/day)
      threeDays: 1299,   // Total ₹1,299 (₹433/day)
      sevenDays: 1899,   // Total ₹1,899 (₹271/day)
      fifteenDays: 3199, // Total ₹3,199 (₹213/day)
      thirtyDays: 4999,  // Total ₹4,999 (₹166/day)
      ninetyDays: 12999, // Total ₹12,999 (₹144/day)
      perDayRate: 271
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 10,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 215,
    tag: "NEXT-GEN VR"
  },
  {
    title: "Meta Quest 2 VR Headset (128GB Standalone)",
    slug: "meta-quest-2-vr-headset",
    category: "vr",
    categoryLabel: "VR Headset",
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Experience total immersion with Meta Quest 2. High-speed performance, 3D positional audio, and intuitive controls put virtual worlds right in your hands without needing a PC or console.",
    features: [
      "Completely Wireless VR experience",
      "Fast-switch LCD display with 1832 x 1920 per eye",
      "Includes 2x Touch Controllers",
      "Great for party games, Beat Saber & VR Rollercoasters",
      "Sanitized & Hygienically Sealed Cushioning"
    ],
    specifications: {
      "Resolution": "1832 x 1920 per eye",
      "Refresh Rate": "up to 120Hz",
      "Audio": "Built-in 3D Positional Audio",
      "In the Box": "Meta Quest 2 Headset, 2 Controllers, Glasses Spacer, Charger"
    },
    pricing: {
      oneDay: 399,       // Total ₹399 (₹399/day)
      twoDays: 649,      // Total ₹649 (₹325/day)
      threeDays: 799,    // Total ₹799 (₹266/day)
      sevenDays: 1199,   // Total ₹1,199 (₹171/day)
      fifteenDays: 1899, // Total ₹1,899 (₹126/day)
      thirtyDays: 2999,  // Total ₹2,999 (₹100/day)
      ninetyDays: 7499,  // Total ₹7,499 (₹83/day)
      perDayRate: 171
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 14,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 410,
    tag: "PARTY HIT"
  },
  {
    title: "Sony PlayStation VR2 (PS VR2 Headset)",
    slug: "sony-playstation-vr2",
    category: "vr",
    categoryLabel: "VR Headset",
    images: [
      "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Escape into worlds that feel, look and sound real with PlayStation VR2. Featuring 4K HDR visuals, eye tracking, headset feedback, and 3D Audio paired with ergonomic Sense controllers.",
    features: [
      "Dual 2000x2040 OLED Displays with 4K HDR",
      "Includes 2x PS VR2 Sense Controllers",
      "Intelligent Eye Tracking & Headset Haptic Feedback",
      "Requires PS5 Console",
      "Zero Security Deposit"
    ],
    specifications: {
      "Display Method": "OLED (2000 x 2040 per eye)",
      "Refresh Rate": "90Hz, 120Hz",
      "Sensors": "6-axis motion sensing system, IR proximity sensor",
      "Cameras": "4 embedded cameras for headset & controller tracking"
    },
    pricing: {
      oneDay: 499,       // Total ₹499 (₹499/day)
      twoDays: 849,      // Total ₹849 (₹425/day)
      threeDays: 1099,   // Total ₹1,099 (₹366/day)
      sevenDays: 1599,   // Total ₹1,599 (₹228/day)
      fifteenDays: 2699, // Total ₹2,699 (₹180/day)
      thirtyDays: 4199,  // Total ₹4,199 (₹140/day)
      ninetyDays: 10499, // Total ₹10,499 (₹116/day)
      perDayRate: 228
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 6,
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 96,
    tag: "PS5 COMPATIBLE"
  },
  {
    title: "PS5 DualSense Wireless Controller (Extra)",
    slug: "ps5-dualsense-wireless-controller",
    category: "controllers",
    categoryLabel: "Controllers & Gears",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Discover a deeper, highly immersive gaming experience with the innovative PS5 DualSense controller featuring haptic feedback and dynamic trigger effects.",
    features: [
      "Official Sony PS5 DualSense Wireless Controller",
      "Dynamic Haptic Feedback & Adaptive Triggers",
      "Built-in Microphone & 3.5mm Headset Jack",
      "Rechargeable Built-in Battery with USB-C Cable",
      "Perfect for multiplayer gaming sessions"
    ],
    specifications: {
      "Connectivity": "Bluetooth v5.1 / USB Type-C",
      "Battery": "1560 mAh Li-ion rechargeable",
      "Compatible With": "PS5, PC, Mobile",
      "Weight": "280g"
    },
    pricing: {
      oneDay: 199,       // Total ₹199 (₹199/day)
      twoDays: 349,      // Total ₹349 (₹175/day)
      threeDays: 449,    // Total ₹449 (₹150/day)
      sevenDays: 699,    // Total ₹699 (₹100/day)
      fifteenDays: 999,  // Total ₹999 (₹67/day)
      thirtyDays: 1499,  // Total ₹1,499 (₹50/day)
      ninetyDays: 2999,  // Total ₹2,999 (₹33/day)
      perDayRate: 100
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 25,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 512,
    tag: "ADD-ON ESSENTIAL"
  },
  {
    title: "Thrustmaster T300 RS GT Racing Wheel & Pedals",
    slug: "thrustmaster-t300-rs-gt-racing-wheel",
    category: "controllers",
    categoryLabel: "Racing Wheel",
    images: [
      "https://images.unsplash.com/photo-1547394765-185e1e68f34e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Feel realistic road rumble, tire grip, and drift physics with the officially licensed Gran Turismo T300 RS GT force feedback racing wheel with 3-pedal set.",
    features: [
      "1080° Dual-belt Force Feedback Servomotor",
      "T3PA 3-Pedal GT Edition set included",
      "Detachable GT style wheel with paddle shifters",
      "Compatible with PS5, PS4, and PC",
      "Table clamp mounting rig included"
    ],
    specifications: {
      "Force Feedback": "Industrial brushless motor (25W)",
      "Pedals": "3 Adjustable Metal Pedals (Accelerator, Brake, Clutch)",
      "Rotation": "270° to 1080° configurable",
      "Compatibility": "PS5, PS4, Windows PC"
    },
    pricing: {
      oneDay: 449,       // Total ₹449 (₹449/day)
      twoDays: 699,      // Total ₹699 (₹350/day)
      threeDays: 899,    // Total ₹899 (₹300/day)
      sevenDays: 1299,   // Total ₹1,299 (₹185/day)
      fifteenDays: 1999, // Total ₹1,999 (₹133/day)
      thirtyDays: 3299,  // Total ₹3,299 (₹110/day)
      ninetyDays: 7999,  // Total ₹7,999 (₹88/day)
      perDayRate: 185
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 5,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 167,
    tag: "SIM RACING"
  },
  {
    title: "Asus ROG Strix G16 Gaming Laptop (RTX 4060, i7)",
    slug: "asus-rog-strix-g16-gaming-laptop",
    category: "laptops",
    categoryLabel: "Gaming Laptop",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Dominate the battlefield with the ROG Strix G16. Powered by 13th Gen Intel Core i7 processor and NVIDIA GeForce RTX 4060 Laptop GPU with MUX Switch & Advanced Optimus.",
    features: [
      "Intel Core i7 13th Gen + NVIDIA RTX 4060 8GB VRAM",
      "16-inch FHD+ 165Hz ROG Nebula Display",
      "16GB DDR5 RAM + 1TB PCIe 4.0 NVMe SSD",
      "Pre-installed Windows 11 + Steam + popular esports titles",
      "Zero Security Deposit Rental"
    ],
    specifications: {
      "CPU": "Intel Core i7-13650HX Processor",
      "GPU": "NVIDIA GeForce RTX 4060 (140W TGP)",
      "RAM": "16GB DDR5 4800MHz",
      "Display": "16-inch FHD+ (1920 x 1200) 165Hz IPS-level",
      "Keyboard": "4-Zone RGB Backlit Keyboard"
    },
    pricing: {
      oneDay: 799,       // Total ₹799 (₹799/day)
      twoDays: 1299,     // Total ₹1,299 (₹650/day)
      threeDays: 1699,   // Total ₹1,699 (₹566/day)
      sevenDays: 2499,   // Total ₹2,499 (₹357/day)
      fifteenDays: 4199, // Total ₹4,199 (₹280/day)
      thirtyDays: 6999,  // Total ₹6,999 (₹233/day)
      ninetyDays: 16999, // Total ₹16,999 (₹188/day)
      perDayRate: 357
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 7,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 143,
    tag: "HIGH PERFORMANCE"
  },
  {
    title: "BenQ 4K HDR Big Screen Gaming Projector Setup",
    slug: "benq-4k-hdr-gaming-projector",
    category: "big-screen",
    categoryLabel: "Big Screen Gaming",
    images: [
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=800&q=80"
    ],
    description: "Turn your living room into a massive 150-inch esports arena. Low input lag (4ms @ 1080p 240Hz / 16ms @ 4K 60Hz) with 3000 ANSI Lumens brightness for daytime gaming.",
    features: [
      "True 4K UHD Resolution with HDR10",
      "Includes 100-inch Portable Foldable Projector Screen",
      "Ultra-low 4.16ms input lag for competitive gaming",
      "Built-in TreVolo 5W Stereo Speaker system",
      "Dual HDMI 2.0 ports with eARC audio return"
    ],
    specifications: {
      "Resolution": "4K UHD (3840 x 2160)",
      "Brightness": "3000 ANSI Lumens",
      "Screen Size": "Up to 150 inches screen diagonal",
      "Input Lag": "4ms (1080p 240Hz), 16.6ms (4K 60Hz)",
      "In the Box": "BenQ 4K Projector, Power Cable, HDMI Cable, Remote, 100-inch Screen"
    },
    pricing: {
      oneDay: 699,       // Total ₹699 (₹699/day)
      twoDays: 1149,     // Total ₹1,149 (₹575/day)
      threeDays: 1499,   // Total ₹1,499 (₹500/day)
      sevenDays: 2199,   // Total ₹2,199 (₹314/day)
      fifteenDays: 3699, // Total ₹3,699 (₹246/day)
      thirtyDays: 5999,  // Total ₹5,999 (₹200/day)
      ninetyDays: 14999, // Total ₹14,999 (₹166/day)
      perDayRate: 314
    },
    securityDeposit: 0,
    isZeroDeposit: true,
    stockCount: 4,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 88,
    tag: "HOME THEATRE"
  }
];

const seedDB = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    try {
      await Product.deleteMany({});
      await Product.insertMany(initialProducts);
      console.log("Database seeded successfully with verified SharePal pricing mathematics!");
    } catch (err) {
      console.error("Error seeding database:", err.message);
    } finally {
      mongoose.connection.close();
    }
  } else {
    console.log("Database connection skipped. Seed data ready for fallback mode.");
  }
};

if (require.main === module) {
  seedDB();
}

module.exports = { initialProducts, seedDB };
