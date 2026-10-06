const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// In-memory order fallback store if DB is offline
const inMemoryOrders = [];

// @route   POST /api/orders
// @desc    Create new rental booking order
router.post('/', async (req, res) => {
  try {
    const {
      user,
      items,
      rentalPeriod,
      pricing,
      couponCode
    } = req.body;

    if (!user || !user.name || !user.phone || !user.address) {
      return res.status(400).json({ success: false, message: 'Please provide required contact details (Name, Phone, Address).' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty. Please add items to book.' });
    }

    const generateOrderId = () => `SP-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = generateOrderId();

    const newOrderData = {
      orderId,
      user,
      items,
      rentalPeriod: rentalPeriod || {},
      pricing: pricing || { subtotal: 0, grandTotal: 0 },
      couponCode: couponCode || '',
      status: 'Confirmed',
      paymentStatus: 'Paid (Pay on Delivery)'
    };

    let savedOrder = null;
    try {
      const order = new Order(newOrderData);
      savedOrder = await order.save();
    } catch (dbErr) {
      console.warn("DB save order warning, saving to in-memory fallback:", dbErr.message);
      inMemoryOrders.unshift(newOrderData);
      savedOrder = newOrderData;
    }

    res.status(201).json({
      success: true,
      message: 'Rental booking placed successfully!',
      data: savedOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders
router.get('/', async (req, res) => {
  try {
    let orders = [];
    try {
      orders = await Order.find().sort({ createdAt: -1 });
    } catch (e) {
      orders = inMemoryOrders;
    }

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/orders/:orderId
// @desc    Get order details by order ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    let order = null;

    try {
      order = await Order.findOne({ orderId });
    } catch (e) {
      order = inMemoryOrders.find(o => o.orderId === orderId);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
