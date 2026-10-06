import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Gamepad2, 
  Camera, 
  Compass, 
  Tv, 
  ChevronDown,
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSearchChange, searchTerm, products = [] }) => {
  const { totalItemCount, setIsCartDrawerOpen, selectedCity, setSelectedCity } = useCart();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cities = [
    { name: 'Bangalore', active: true, tag: 'Hub' },
    { name: 'Mumbai', active: true },
    { name: 'Delhi NCR', active: true },
    { name: 'Hyderabad', active: true },
    { name: 'Pune', active: true },
    { name: 'Chennai', active: true },
    { name: 'Kolkata', active: true }
  ];

  const mainCategoryTabs = [
    { name: 'Photography', icon: Camera, active: false, href: '#' },
    { name: 'Gaming', icon: Gamepad2, active: true, href: '#' },
    { name: 'Outdoor', icon: Compass, active: false, href: '#' },
    { name: 'Entertainment', icon: Tv, active: false, href: '#' }
  ];

  const searchResults = searchTerm ? products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs backdrop-blur-md bg-white/95">
      {/* Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
        <span>Rent Gaming Gadgets in Bangalore • <span className="text-teal-400 font-bold">Zero Security Deposit</span> • Free Express Doorstep Delivery</span>
        <span className="hidden sm:inline bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold">EARLYBIRD15</span>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* SharePal Logo & City Selector */}
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  Share<span className="text-teal-600">Pal</span>
                  <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-1.5 py-0.2 rounded border border-teal-200">IN</span>
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Lifestyle Gear Rentals</span>
              </div>
            </a>

            {/* City Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{selectedCity}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isCityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50"
                  >
                    <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Select Rental City</div>
                    {cities.map((city) => (
                      <button
                        key={city.name}
                        onClick={() => {
                          setSelectedCity(city.name);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium hover:bg-teal-50/60 transition-colors ${
                          selectedCity === city.name ? 'text-teal-700 bg-teal-50/80 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {city.name}
                          {city.tag && (
                            <span className="text-[9px] bg-teal-100 text-teal-700 px-1.5 py-0.2 rounded font-bold">{city.tag}</span>
                          )}
                        </span>
                        {selectedCity === city.name && <Check className="w-3.5 h-3.5 text-teal-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Main Top Navigation Categories (SharePal Header Style) */}
          <div className="hidden lg:flex items-center gap-1 border-x border-slate-200 px-4">
            {mainCategoryTabs.map((cat) => {
              const Icon = cat.icon;
              return (
                <a
                  key={cat.name}
                  href={cat.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    cat.active 
                      ? 'bg-teal-600 text-white shadow-xs' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.name}</span>
                </a>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs md:max-w-sm relative">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                placeholder="Search PS5, Xbox, VR Headsets..."
                className="w-full pl-10 pr-9 py-2 bg-slate-100/80 border border-slate-200 focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-3 focus:ring-teal-100 rounded-full text-xs text-slate-800 placeholder:text-slate-400 font-medium transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Auto-Suggest Dropdown */}
            {isSearchFocused && searchTerm && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 flex justify-between">
                  <span>Matching Gadgets ({searchResults.length})</span>
                  <span>Bangalore Delivery</span>
                </div>
                {searchResults.length > 0 ? (
                  searchResults.map((prod) => (
                    <a
                      key={prod.slug}
                      href={`#product-${prod.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-teal-50/50 transition-colors border-b border-slate-50 last:border-none"
                    >
                      <img src={prod.images[0]} alt={prod.title} className="w-10 h-10 object-contain rounded bg-slate-100 p-1" />
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-800">{prod.title}</div>
                        <div className="text-[10px] text-teal-600 font-semibold">{prod.categoryLabel}</div>
                      </div>
                      <div className="text-xs font-bold text-slate-900">₹{prod.pricing.sevenDays} <span className="text-[10px] font-normal text-slate-500">/wk</span></div>
                    </a>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-slate-500 font-medium">
                    No gaming gadgets found for "{searchTerm}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart / Rental Bag Button */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Rental Bag</span>
            {totalItemCount > 0 && (
              <span className="bg-teal-400 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-xs animate-bounce">
                {totalItemCount}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
