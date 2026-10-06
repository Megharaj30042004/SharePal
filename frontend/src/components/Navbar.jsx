import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  Calendar, 
  User, 
  Edit3, 
  ChevronDown, 
  X, 
  Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onSearchChange, searchTerm, products = [], startDate, endDate, onOpenDateModal }) => {
  const { totalItemCount, setIsCartDrawerOpen, selectedCity, setSelectedCity } = useCart();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const cities = [
    { name: 'Bangalore', active: true },
    { name: 'Mumbai', active: true },
    { name: 'Delhi NCR', active: true },
    { name: 'Hyderabad', active: true },
    { name: 'Pune', active: true },
    { name: 'Chennai', active: true },
    { name: 'Kolkata', active: true }
  ];

  const mainCategories = [
    { name: 'Photography', active: false },
    { name: 'Gaming', active: true },
    { name: 'Outdoor', active: false },
    { name: 'Entertainment', active: false }
  ];

  const formatDateDisplay = (dateStr) => {
    if (!dateStr) return '17th Oct';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
    return `${day}${suffix} ${months[d.getMonth()]}`;
  };

  const searchResults = searchTerm ? products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <header className="sticky top-0 z-40 w-full">
      
      {/* Top Main Header (Deep Purple #3F0E40) */}
      <div className="bg-[#3F0E40] text-white px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* SharePal Brand Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0">
            <div className="bg-[#0052CC] text-white px-3 py-1.5 rounded-xl font-black italic text-base sm:text-lg tracking-wider flex items-center gap-1 shadow-md">
              <span>Share</span><span className="text-teal-300">Pal</span>
            </div>
          </a>

          {/* Desktop Center Integrated Date & Location Bar Pill */}
          <div className="hidden md:flex items-center bg-white text-slate-800 rounded-full px-4 py-1.5 text-xs font-bold shadow-md border border-slate-200 gap-3">
            
            {/* City Dropdown */}
            <div className="relative border-r border-slate-200 pr-3">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-1 hover:text-purple-900 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isCityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-44 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 text-slate-800"
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rental City</div>
                    {cities.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => {
                          setSelectedCity(c.name);
                          setIsCityDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium hover:bg-purple-50 transition-colors ${
                          selectedCity === c.name ? 'text-purple-800 bg-purple-50 font-bold' : 'text-slate-700'
                        }`}
                      >
                        <span>{c.name}</span>
                        {selectedCity === c.name && <Check className="w-3.5 h-3.5 text-purple-700" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Delivery Date */}
            <div className="flex items-center gap-1.5 border-r border-slate-200 pr-3 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Delivery: <strong className="text-slate-900">{formatDateDisplay(startDate)}</strong></span>
            </div>

            {/* Pickup Date */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Pickup: <strong className="text-slate-900">{formatDateDisplay(endDate)}</strong></span>
            </div>

            {/* Edit Button */}
            <button
              onClick={onOpenDateModal}
              className="flex items-center gap-1 bg-[#1E0720] hover:bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ml-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          {/* Mobile Center Date/City Pill (< md) */}
          <button
            onClick={onOpenDateModal}
            className="flex md:hidden items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white cursor-pointer transition-colors"
          >
            <MapPin className="w-3 h-3 text-teal-300 shrink-0" />
            <span className="truncate max-w-[70px]">{selectedCity}</span>
            <span className="opacity-40">•</span>
            <span className="text-teal-200 font-bold">{formatDateDisplay(startDate)}</span>
            <Edit3 className="w-3 h-3 ml-0.5 text-white/80" />
          </button>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            
            {/* Search Input Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchFocused(!isSearchFocused)}
                className="text-white hover:text-teal-300 transition-colors p-1 cursor-pointer"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Live Search Modal */}
              {isSearchFocused && (
                <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-slate-800">
                  <div className="p-2 border-b border-slate-100 flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400 ml-2" />
                    <input
                      type="text"
                      autoFocus
                      value={searchTerm}
                      onChange={(e) => onSearchChange(e.target.value)}
                      placeholder="Search PS5, Xbox, VR..."
                      className="w-full text-xs font-medium focus:outline-none py-1.5"
                    />
                    <button onClick={() => setIsSearchFocused(false)} className="text-slate-400 p-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {searchTerm && (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map(p => (
                          <a key={p.slug} href={`#product-${p.slug}`} onClick={() => setIsSearchFocused(false)} className="flex items-center gap-3 p-3 hover:bg-purple-50 border-b border-slate-50">
                            <img src={p.images[0]} alt={p.title} className="w-8 h-8 object-contain" />
                            <div className="text-xs font-bold truncate flex-1">{p.title}</div>
                            <div className="text-xs font-black text-purple-900">₹{p.pricing.sevenDays}</div>
                          </a>
                        ))
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-400">No gadgets found</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative text-white hover:text-teal-300 transition-colors p-1 cursor-pointer"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-teal-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {totalItemCount}
                </span>
              )}
            </button>

            {/* User Login Profile Pill */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white cursor-pointer transition-colors">
              <div className="w-6 h-6 bg-white text-purple-900 rounded-full flex items-center justify-center font-black">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>Hi, Login</span>
            </div>

          </div>

        </div>
      </div>

      {/* Sub Header Category Tabs (White Bar) */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-16 h-11 text-xs font-bold text-slate-600 overflow-x-auto no-scrollbar whitespace-nowrap">
            {mainCategories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className={`relative py-3 hover:text-purple-900 transition-colors shrink-0 ${
                  cat.active ? 'text-slate-900 font-extrabold' : ''
                }`}
              >
                {cat.name}
                {cat.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5E17EB] rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;
