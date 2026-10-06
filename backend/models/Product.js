const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['ps5', 'xbox', 'vr', 'controllers', 'laptops', 'big-screen'],
    default: 'ps5'
  },
  categoryLabel: {
    type: String,
    default: 'Gaming Console'
  },
  images: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  pricing: {
    oneDay: { type: Number, default: 499 },
    twoDays: { type: Number, default: 799 },
    threeDays: { type: Number, default: 999 },
    sevenDays: { type: Number, required: true },
    fifteenDays: { type: Number, required: true },
    thirtyDays: { type: Number, required: true },
    ninetyDays: { type: Number, required: true },
    perDayRate: { type: Number, required: true }
  },
  securityDeposit: {
    type: Number,
    default: 0
  },
  isZeroDeposit: {
    type: Boolean,
    default: true
  },
  stockCount: {
    type: Number,
    default: 10
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 4.8
  },
  reviewsCount: {
    type: Number,
    default: 124
  },
  tag: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
