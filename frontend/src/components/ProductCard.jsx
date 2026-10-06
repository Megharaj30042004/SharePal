import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, ShoppingBag, Calendar, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onSelectDates }) => {
  const { globalTenure, getProductPrice, getPerDayRate, addToCart } = useCart();
  const [selectedTenure, setSelectedTenure] = useState(globalTenure);
  const [isAdded, setIsAdded] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Sync selected tenure if global tenure changes
  React.useEffect(() => {
    setSelectedTenure(globalTenure);
  }, [globalTenure]);

  const price = getProductPrice(product, selectedTenure);
  const perDayRate = getPerDayRate(product, selectedTenure);

  const handleAddToCart = () => {
    addToCart(product, selectedTenure);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const tenurePills = [
    { id: '1day', label: '1 Day' },
    { id: '2days', label: '2 Days' },
    { id: '3days', label: '3 Days' },
    { id: '7days', label: '7 Days' },
    { id: '30days', label: '30 Days' }
  ];

  const getTenureText = (t) => {
    switch (t) {
      case '1day': return '1 day';
      case '2days': return '2 days';
      case '3days': return '3 days';
      case '7days': return '7 days (1 wk)';
      case '15days': return '15 days (2 wks)';
      case '30days': return '30 days (1 mo)';
      case '90days': return '90 days (3 mos)';
      default: return 'period';
    }
  };

  return (
    <motion.div
      id={`product-${product.slug}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden group"
    >
      {/* Top Image Container */}
      <div className="relative bg-slate-50 p-4 h-56 flex items-center justify-center overflow-hidden border-b border-slate-100">
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.tag && (
            <span className="bg-slate-900 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-teal-400" />
              {product.tag}
            </span>
          )}
          {product.isZeroDeposit && (
            <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Zero Deposit
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-xs border border-slate-200 px-2 py-1 rounded-lg shadow-xs flex items-center gap-1 text-xs font-bold text-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
          <span className="text-[10px] text-slate-400 font-normal">({product.reviewsCount})</span>
        </div>

        {/* Main Product Image */}
        <img
          src={product.images[activeImageIdx] || product.images[0]}
          alt={product.title}
          className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Multi Image dots preview */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${activeImageIdx === idx ? 'bg-teal-600 w-4' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-bold text-teal-600 uppercase tracking-wider mb-1">
            {product.categoryLabel}
          </div>
          <h3 className="text-base font-extrabold text-slate-900 leading-snug line-clamp-2 group-hover:text-teal-600 transition-colors">
            {product.title}
          </h3>

          {/* Key Bullet Features */}
          <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
            {product.features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tenure Selection & Real-Time Price */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          
          {/* Radio Pills for Duration */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl mb-3 overflow-x-auto no-scrollbar">
            {tenurePills.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTenure(t.id)}
                className={`flex-1 py-1 px-1 text-[10.5px] font-bold rounded-lg transition-all text-center whitespace-nowrap cursor-pointer ${
                  selectedTenure === t.id
                    ? 'bg-white text-teal-700 shadow-xs border border-teal-200 font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Pricing Display Box (Explicit Total & Per-Day Rate) */}
          <div className="flex flex-col gap-1 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Rental Fee</span>
                <span className="text-2xl font-black text-slate-900 tracking-tight">₹{price.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-[11px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                ~₹{perDayRate}/day
              </div>
            </div>
            <div className="text-[10.5px] text-slate-500 font-medium">
              Total for <strong className="text-slate-800">{getTenureText(selectedTenure)}</strong>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-2">
            
            {/* Custom Calendar Dates Button */}
            <button
              onClick={() => onSelectDates(product, selectedTenure)}
              className="col-span-2 flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 hover:border-teal-200 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
              title="Select Exact Rental Dates"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Dates</span>
            </button>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddToCart}
              className={`col-span-3 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                isAdded 
                  ? 'bg-emerald-600 shadow-emerald-500/20' 
                  : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 animate-scale" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Book Now</span>
                </>
              )}
            </button>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default ProductCard;
