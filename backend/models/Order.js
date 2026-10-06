const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false
  },
  title: String,
  slug: String,
  image: String,
  tenureDays: Number,
  tenureLabel: String,
  unitPrice: Number,
  securityDeposit: Number,
  startDate: String,
  endDate: String
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: false, default: '' },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: 'Bangalore' },
    pincode: { type: String, default: '560001' }
  },
  items: [orderItemSchema],
  rentalPeriod: {
    startDate: String,
    endDate: String,
    totalDays: Number
  },
  pricing: {
    subtotal: { type: Number, required: true },
    securityDeposit: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true }
  },
  couponCode: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Processing', 'Delivered', 'Completed', 'Cancelled'],
    default: 'Confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid (Pay on Delivery)', 'Prepaid'],
    default: 'Paid (Pay on Delivery)'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
