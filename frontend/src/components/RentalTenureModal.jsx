import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Calendar, ShieldCheck, ArrowRight, Info, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RentalTenureModal = ({ product, initialTenure = '2days', isOpen, onClose }) => {
  const { addToCart, getProductPrice, getPerDayRate, selectedCity } = useCart();
  const [selectedTenure, setSelectedTenure] = useState(initialTenure);
  
  // Date calculation defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const defaultEnd = new Date(tomorrow);
  defaultEnd.setDate(defaultEnd.getDate() + 2); // default 2 days

  const [startDate, setStartDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(defaultEnd.toISOString().split('T')[0]);
  const [isCustomDateMode, setIsCustomDateMode] = useState(false);

  useEffect(() => {
    if (initialTenure) {
      setSelectedTenure(initialTenure);
    }
  }, [initialTenure]);

  if (!isOpen || !product) return null;

  // Compute difference in days from calendar dates
  const calculateDaysFromDates = (startStr, endStr) => {
    const s = new Date(startStr);
    const e = new Date(endStr);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return 1;
    const diffTime = Math.max(0, e.getTime() - s.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const getDaysCountForTenureKey = (tenure) => {
    switch (tenure) {
      case '1day': return 1;
      case '2days': return 2;
      case '3days': return 3;
      case '7days': return 7;
      case '15days': return 15;
      case '30days': return 30;
      default: return 2;
    }
  };

  const handleTenureClick = (key) => {
    setSelectedTenure(key);
    setIsCustomDateMode(false);
    const d = getDaysCountForTenureKey(key);
    const sObj = new Date(startDate);
    const eObj = new Date(sObj);
    eObj.setDate(eObj.getDate() + d);
    setEndDate(eObj.toISOString().split('T')[0]);
  };

  const handleStartDateChange = (val) => {
    setStartDate(val);
    const d = isCustomDateMode ? calculateDaysFromDates(val, endDate) : getDaysCountForTenureKey(selectedTenure);
    const sObj = new Date(val);
    const eObj = new Date(sObj);
    eObj.setDate(eObj.getDate() + d);
    setEndDate(eObj.toISOString().split('T')[0]);
  };

  const handleEndDateChange = (val) => {
    setEndDate(val);
    setIsCustomDateMode(true);
  };

  const currentDays = isCustomDateMode
    ? calculateDaysFromDates(startDate, endDate)
    : getDaysCountForTenureKey(selectedTenure);

  const rentalFee = getProductPrice(product, selectedTenure, isCustomDateMode ? currentDays : null);
  const perDayAvg = getPerDayRate(product, selectedTenure, isCustomDateMode ? currentDays : null);

  const handleConfirm = () => {
    addToCart(product, selectedTenure, startDate, endDate, currentDays);
    onClose();
  };

  const tenureOptions = [
    { id: '1day', title: '1 Day', badge: 'Quick Rent' },
    { id: '2days', title: '2 Days', badge: 'Weekend Pass' },
    { id: '3days', title: '3 Days', badge: 'Short Trip' },
    { id: '7days', title: '7 Days', badge: '1 Week' },
    { id: '15days', title: '15 Days', badge: '2 Weeks' },
    { id: '30days', title: '30 Days', badge: '1 Month' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-600/30 border border-teal-500/30 rounded-xl">
                <Calendar className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <h3 className="text-base font-extrabold flex items-center gap-1.5">
                  Select Rental Duration & Dates
                  <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                </h3>
                <p className="text-xs text-slate-300 line-clamp-1">{product.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Tenure Options */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5 block">
                1. Select Popular Duration Plan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tenureOptions.map((t) => {
                  const isSelected = !isCustomDateMode && selectedTenure === t.id;
                  const priceForTenure = getProductPrice(product, t.id);
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTenureClick(t.id)}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-600/20 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-900">{t.title}</span>
                        <span className={`text-[9px] px-1 py-0.2 rounded font-extrabold ${isSelected ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {t.badge}
                        </span>
                      </div>
                      <div className="text-xs font-black text-teal-600 mt-1">₹{priceForTenure}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Date Range Picker */}
            <div>
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2 block flex items-center justify-between">
                <span>2. Pick Custom Dates Range</span>
                {isCustomDateMode && (
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    Custom Range Active
                  </span>
                )}
              </label>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Start Date (Delivery)</span>
                  <input
                    type="date"
                    min={tomorrow.toISOString().split('T')[0]}
                    value={startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer mt-1"
                  />
                </div>

                <div className="bg-teal-50/70 p-3 rounded-2xl border border-teal-200">
                  <span className="text-[10px] font-bold text-teal-600 uppercase block">End Date (Pickup)</span>
                  <input
                    type="date"
                    min={startDate}
                    value={endDate}
                    onChange={(e) => handleEndDateChange(e.target.value)}
                    className="w-full bg-transparent text-xs font-extrabold text-slate-900 focus:outline-none cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Summary Breakdown Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Selected Duration</span>
                <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {currentDays} {currentDays === 1 ? 'Day' : 'Days'} ({startDate} to {endDate})
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Effective Daily Rate</span>
                <span className="font-bold text-emerald-600">~₹{perDayAvg}/day</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Security Deposit</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ₹0 (Zero Deposit)
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-black text-sm text-slate-900">
                <span>Calculated Rental Fee</span>
                <span className="text-base text-teal-600">₹{rentalFee.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Trust Note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Free doorstep delivery & return pickup in {selectedCity}!</span>
            </div>

          </div>

          {/* Modal Footer Action */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-3 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl text-xs shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Confirm {currentDays} {currentDays === 1 ? 'Day' : 'Days'} & Add to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default RentalTenureModal;
