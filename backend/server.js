const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { initialProducts } = require('./seed');
const Product = require('./models/Product');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'SharePal Gaming Rentals Backend API',
    timestamp: new Date().toISOString()
  });
});

// Root API Welcome route
app.get('/', (req, res) => {
  res.send('SharePal Gaming Rentals Backend REST API is running.');
});

const PORT = process.env.PORT || 5000;

// Initialize Database & Start Server
connectDB().then(async (connected) => {
  if (connected) {
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log("No products found in DB. Automatically seeding initial products...");
        await Product.insertMany(initialProducts);
        console.log(`Seeded ${initialProducts.length} products to MongoDB.`);
      }
    } catch (e) {
      console.warn("Could not check/seed DB automatically:", e.message);
    }
  }
  
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
});
