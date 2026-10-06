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
  Phone,
  Mail,
  AlertCircle
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

  // Customer delivery details state
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: '560001'
  });
  const [formErrors, setFormErrors] = useState({});

  if (!isCartDrawerOpen) return null;

  // Strict Phone input handler (allows only digits up to 10 characters)
  const handlePhoneChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // strip non-digits
    const cleanPhone = rawVal.slice(0, 10); // cap at 10 digits
    setUserInfo(prev => ({ ...prev, phone: cleanPhone }));

    if (formErrors.phone) {
      setFormErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  // Strict Pincode input handler
  const handlePincodeChange = (e) => {
    const cleanPin = e.target.value.replace(/\D/g, '').slice(0, 6);
    setUserInfo(prev => ({ ...prev, pincode: cleanPin }));
  };

  // Validation function
  const validateForm = () => {
    const errors = {};

    // 1. Name validation
    if (!userInfo.name.trim() || userInfo.name.trim().length < 2) {
      errors.name = 'Please enter your full name.';
    }

    // 2. Strict 10-digit Phone validation (Indian mobile format starting with 6,7,8,9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!userInfo.phone) {
      errors.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(userInfo.phone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
    }

    // 3. Strict Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userInfo.email.trim() && !emailRegex.test(userInfo.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 4. Address validation
    if (!userInfo.address.trim() || userInfo.address.trim().length < 5) {
      errors.address = 'Please enter complete delivery street address (at least 5 characters).';
    }

    // 5. Pincode validation
    if (userInfo.pincode && userInfo.pincode.length !== 6) {
      errors.pincode = 'Pincode must be exactly 6 digits.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200"
          >
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl text-slate-950 shadow-md">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-white">Your Rental Bag</h2>
                  <p className="text-xs text-slate-300">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} for <span className="text-teal-400 font-bold">{selectedCity}</span>
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
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              
              {cartItems.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="inline-flex p-4 bg-teal-50 text-teal-600 rounded-full mb-3">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">Your Rental Bag is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse our high-end gaming consoles, VR headsets, and controllers to start renting.
                  </p>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="mt-5 px-5 py-2.5 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-full text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    Explore Gaming Gadgets
                  </button>
                </div>
              ) : !isCheckoutStep ? (
                /* Step 1: Items List & Coupons */
                <>
                  <div className="space-y-3.5">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 flex gap-3 relative hover:border-teal-300 transition-all">
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
                              className="text-slate-400 hover:text-red-500 absolute top-3.5 right-3.5 cursor-pointer"
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
                  <div className="bg-gradient-to-br from-teal-50/70 to-cyan-50/70 border border-teal-200/80 p-4 rounded-2xl">
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
                          className="text-[10px] font-bold bg-white text-teal-700 border border-teal-200 px-2 py-1 rounded-lg shrink-0 cursor-pointer hover:bg-teal-50"
                        >
                          🏷️ EARLYBIRD15 (15% OFF)
                        </button>
                        <button
                          type="button"
                          onClick={() => { setCouponInput('SHAREPAL'); applyCoupon('SHAREPAL'); }}
                          className="text-[10px] font-bold bg-white text-teal-700 border border-teal-200 px-2 py-1 rounded-lg shrink-0 cursor-pointer hover:bg-teal-50"
                        >
                          🏷️ SHAREPAL (₹300 OFF)
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Step 2: Customer Delivery Details Form with Strict Validations */
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Delivery Details ({selectedCity})
                    </h3>
                    <button
                      onClick={() => setIsCheckoutStep(false)}
                      className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      ← Back to Bag
                    </button>
                  </div>

                  <div className="space-y-3.5 text-xs">
                    
                    {/* Full Name */}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-teal-600" /> Full Name *
                        </span>
                        {userInfo.name.length >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </label>
                      <input
                        type="text"
                        required
                        value={userInfo.name}
                        onChange={(e) => {
                          setUserInfo({ ...userInfo, name: e.target.value });
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-semibold focus:bg-white focus:outline-none ${
                          formErrors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[10.5px] text-red-500 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Strict 10-Digit Phone & Email */}
                    <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-teal-600" /> Mobile Number *
                          </span>
                          {userInfo.phone.length === 10 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            required
                            value={userInfo.phone}
                            onChange={handlePhoneChange}
                            placeholder="9876543210"
                            className={`w-full pl-11 pr-3 py-2.5 bg-slate-50 border rounded-xl font-bold tracking-wide focus:bg-white focus:outline-none ${
                              formErrors.phone ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-teal-500'
                            }`}
                          />
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5 flex justify-between">
                          <span>Strict 10 digits required</span>
                          <span className={userInfo.phone.length === 10 ? 'text-emerald-600 font-bold' : ''}>
                            {userInfo.phone.length}/10
                          </span>
                        </div>
                        {formErrors.phone && (
                          <p className="text-[10.5px] text-red-500 font-bold mt-1 flex items-start gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" /> {formErrors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Address
                          </span>
                        </label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => {
                            setUserInfo({ ...userInfo, email: e.target.value });
                            if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                          }}
                          placeholder="rahul@example.com"
                          className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-medium focus:bg-white focus:outline-none ${
                            formErrors.email ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-teal-500'
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-[10.5px] text-red-500 font-bold mt-1 flex items-start gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" /> {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Street Address */}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" /> Street Address / Flat / Landmark *
                        </span>
                        {userInfo.address.trim().length >= 5 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={userInfo.address}
                        onChange={(e) => {
                          setUserInfo({ ...userInfo, address: e.target.value });
                          if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                        }}
                        placeholder={`House/Flat No, Building Name, Indiranagar, ${selectedCity}`}
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 font-medium focus:bg-white focus:outline-none ${
                          formErrors.address ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[10.5px] text-red-500 font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.address}
                        </p>
                      )}
                    </div>

                    {/* Pincode */}
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Pincode (6 digits)</label>
                      <input
                        type="text"
                        maxLength={6}
                        value={userInfo.pincode}
                        onChange={handlePincodeChange}
                        placeholder="560001"
                        className={`w-full bg-slate-50 border rounded-xl px-3 py-2 font-bold focus:bg-white focus:outline-none ${
                          formErrors.pincode ? 'border-red-500 ring-2 ring-red-100' : 'border-slate-200 focus:border-teal-500'
                        }`}
                      />
                      {formErrors.pincode && (
                        <p className="text-[10.5px] text-red-500 font-bold mt-1">
                          {formErrors.pincode}
                        </p>
                      )}
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
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
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
