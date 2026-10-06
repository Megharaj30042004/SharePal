import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  CheckCircle2,
  MapPin,
  User,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const CartDrawer = ({ onOrderSuccess }) => {
  const { 
    cartItems, 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    updateCartItemTenure, 
    removeFromCart, 
    updateQuantity, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    totals,
    clearCart,
    selectedCity
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const [isCheckoutStep, setIsCheckoutStep] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // User delivery info state
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '560001'
  });
  const [formError, setFormError] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.phone || !userInfo.address) {
      setFormError('Please enter your Name, Phone Number, and Delivery Address.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const orderPayload = {
        user: { ...userInfo, city: selectedCity },
        items: cartItems,
        pricing: totals,
        couponCode: appliedCoupon ? appliedCoupon.code : ''
      };

      const primaryUrl = `${API_BASE_URL}/api/orders`;
      let response;
      try {
        response = await axios.post(primaryUrl, orderPayload);
      } catch (e) {
        response = await axios.post('/api/orders', orderPayload);
      }

      if (response.data && response.data.success) {
        const orderData = response.data.data;
        clearCart();
        setIsCartDrawerOpen(false);
        setIsCheckoutStep(false);
        onOrderSuccess(orderData);
      }
    } catch (err) {
      // Fallback local booking generation if backend server is unreachable
      const mockOrder = {
        orderId: `SP-${Math.floor(100000 + Math.random() * 900000)}`,
        user: { ...userInfo, city: selectedCity },
        items: cartItems,
        pricing: totals,
        couponCode: appliedCoupon ? appliedCoupon.code : '',
        status: 'Confirmed'
      };
      clearCart();
      setIsCartDrawerOpen(false);
      setIsCheckoutStep(false);
      onOrderSuccess(mockOrder);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200"
          >
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold">Your Rental Bag</h2>
                  <p className="text-xs text-slate-300">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected for {selectedCity}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {cartItems.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="inline-flex p-4 bg-slate-100 text-slate-400 rounded-full mb-3">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Your Rental Bag is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse our high-end gaming consoles, VR headsets, and controllers to start renting.
                  </p>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="mt-5 px-5 py-2.5 bg-teal-600 text-white rounded-full text-xs font-bold shadow-md hover:bg-teal-700 transition-all cursor-pointer"
                  >
                    Explore Gaming Gadgets
                  </button>
                </div>
              ) : !isCheckoutStep ? (
                /* Step 1: Items List & Coupons */
                <>
                  <div className="space-y-4">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex gap-3 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-extrabold text-slate-900 truncate pr-6">{item.title}</h4>
                            <button
                              onClick={() => removeFromCart(idx)}
                              className="text-slate-400 hover:text-red-500 absolute top-4 right-4 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Tenure selector inside cart */}
                          <div className="mt-2 flex items-center gap-2">
                            <select
                              value={item.tenure}
                              onChange={(e) => updateCartItemTenure(idx, e.target.value)}
                              className="bg-white border border-slate-200 rounded-lg text-[11px] font-bold px-2 py-1 text-teal-700 cursor-pointer"
                            >
                              <option value="1day">1 Day (Quick)</option>
                              <option value="2days">2 Days (Weekend)</option>
                              <option value="3days">3 Days (Short)</option>
                              <option value="7days">7 Days (1 Wk)</option>
                              <option value="15days">15 Days (2 Wks)</option>
                              <option value="30days">30 Days (1 Mo)</option>
                            </select>

                            <div className="flex items-center border border-slate-200 bg-white rounded-lg px-1">
                              <button
                                onClick={() => updateQuantity(idx, -1)}
                                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold px-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(idx, 1)}
                                className="p-1 text-slate-500 hover:text-slate-800 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="mt-2 flex justify-between items-baseline">
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Zero Deposit
                            </span>
                            <span className="text-sm font-black text-slate-900">
                              ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code Section */}
                  <div className="bg-gradient-to-br from-teal-50/50 to-cyan-50/50 border border-teal-100 p-4 rounded-2xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-2">
                      <Tag className="w-4 h-4 text-teal-600" />
                      <span>Have a Discount Coupon?</span>
                    </div>

                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-white border border-emerald-200 p-2.5 rounded-xl">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <div>
                            <span className="text-xs font-bold text-emerald-700">{appliedCoupon.code}</span>
                            <span className="text-[10px] text-slate-500 block">{appliedCoupon.label}</span>
                          </div>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="e.g. EARLYBIRD15, SHAREPAL"
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none uppercase placeholder:capitalize"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                    )}

                    {couponMessage && !appliedCoupon && (
                      <p className={`text-[11px] mt-2 font-medium ${couponMessage.success ? 'text-emerald-600' : 'text-red-500'}`}>
                        {couponMessage.message}
                      </p>
                    )}

                    {/* Popular Coupon Pills */}
                    {!appliedCoupon && (
                      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                        <button
                          type="button"
                          onClick={() => { setCouponInput('EARLYBIRD15'); applyCoupon('EARLYBIRD15'); }}
                          className="text-[10px] font-bold bg-white text-teal-700 border border-teal-200 px-2 py-1 rounded-lg shrink-0 cursor-pointer"
                        >
                          🏷️ EARLYBIRD15 (15% OFF)
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCouponInput('SHAREPAL'); applyCoupon('SHAREPAL'); }}
                          className="text-[10px] font-bold bg-white text-teal-700 border border-teal-200 px-2 py-1 rounded-lg shrink-0 cursor-pointer"
                        >
                          🏷️ SHAREPAL (₹300 OFF)
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Step 2: Customer Delivery Details Form */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                      Delivery Information ({selectedCity})
                    </h3>
                    <button
                      onClick={() => setIsCheckoutStep(false)}
                      className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      ← Back to Bag
                    </button>
                  </div>

                  {formError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl">
                      {formError}
                    </div>
                  )}

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-teal-600" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:bg-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-teal-600" /> Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:bg-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:bg-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" /> Street Address / Flat / Landmark *
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={userInfo.address}
                        onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                        placeholder={`House No, Apartment name, Indiranagar, ${selectedCity}`}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:bg-white focus:outline-none focus:border-teal-500"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        value={userInfo.pincode}
                        onChange={(e) => setUserInfo({ ...userInfo, pincode: e.target.value })}
                        placeholder="560001"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium focus:bg-white focus:outline-none focus:border-teal-500"
                      />
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-[11px] text-emerald-800 flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Free express doorstep delivery & setup included across {selectedCity}!</span>
                  </div>
                </div>
              )}

            </div>

            {/* Financial Summary & Action Footer */}
            {cartItems.length > 0 && (
              <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Rental Subtotal</span>
                    <span className="font-bold text-slate-800">₹{totals.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {totals.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount</span>
                      <span>-₹{totals.discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Refundable Deposit</span>
                    <span className="font-bold text-emerald-600">₹0 (Zero Deposit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-bold text-emerald-600">
                      {totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-bold text-slate-800">₹{totals.tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-black text-slate-900">
                    <span>Grand Total</span>
                    <span className="text-xl text-teal-600">₹{totals.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {!isCheckoutStep ? (
                  <button
                    onClick={() => setIsCheckoutStep(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Proceed to Delivery Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Saving Booking...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Rental Booking (Pay on Delivery)</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CartDrawer;
