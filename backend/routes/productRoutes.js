const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { initialProducts } = require('../seed');

// Helper for filtering & sorting in memory if DB connection is unavailable
const filterAndSortInMemory = (products, { category, sort, search }) => {
  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    );
  }

  if (sort) {
    if (sort === 'price-asc') {
      result.sort((a, b) => a.pricing.sevenDays - b.pricing.sevenDays);
    } else if (sort === 'price-desc') {
      result.sort((a, b) => b.pricing.sevenDays - a.pricing.sevenDays);
    } else if (sort === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else {
      // popularity (default)
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
  }

  return result;
};

// @route   GET /api/products
// @desc    Fetch all gaming rental products with filters and sorting
router.get('/', async (req, res) => {
  try {
    const { category, sort, search } = req.query;

    let filter = {};
    if (category && category !== 'all') {
      filter.category = category;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { categoryLabel: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOptions = {};
    if (sort === 'price-asc') sortOptions['pricing.sevenDays'] = 1;
    else if (sort === 'price-desc') sortOptions['pricing.sevenDays'] = -1;
    else if (sort === 'rating') sortOptions.rating = -1;
    else if (sort === 'newest') sortOptions.createdAt = -1;
    else sortOptions.reviewsCount = -1; // popularity

    let products = [];
    try {
      products = await Product.find(filter).sort(sortOptions);
    } catch (err) {
      products = [];
    }

    // Fallback to initial dataset if DB returned empty or offline
    if (!products || products.length === 0) {
      products = filterAndSortInMemory(initialProducts, { category, sort, search });
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/products/:slug
// @desc    Fetch single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    let product = null;

    try {
      product = await Product.findOne({ slug });
    } catch (e) {
      product = null;
    }

    if (!product) {
      product = initialProducts.find(p => p.slug === slug);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/categories
// @desc    Get categories summary
router.get('/meta/categories', (req, res) => {
  const categories = [
    { id: 'all', name: 'All Gadgets', icon: 'Gamepad2' },
    { id: 'ps5', name: 'PS5 Consoles', icon: 'Tv' },
    { id: 'xbox', name: 'Xbox Consoles', icon: 'Box' },
    { id: 'vr', name: 'VR Headsets', icon: 'Glasses' },
    { id: 'controllers', name: 'Controllers & Wheels', icon: 'Joystick' },
    { id: 'laptops', name: 'Gaming Laptops', icon: 'Laptop' },
    { id: 'big-screen', name: 'Big Screen Gaming', icon: 'Projector' }
  ];

  res.json({ success: true, data: categories });
});

module.exports = router;
