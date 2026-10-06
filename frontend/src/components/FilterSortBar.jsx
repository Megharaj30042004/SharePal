import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Calendar, 
  ArrowUpDown, 
  Gamepad2, 
  Tv, 
  Box, 
  Glasses, 
  Joystick, 
  Laptop, 
  Projector,
  Flame
} from 'lucide-react';

const FilterSortBar = ({ activeCategory, setActiveCategory, sortBy, setSortBy, totalResults, onOpenDateModal }) => {
  const { globalTenure, setGlobalTenure } = useCart();

  const categories = [
    { id: 'all', name: 'All Gadgets', icon: Gamepad2 },
    { id: 'gta-vi', name: 'GTA VI', icon: Flame, badge: 'HOT' },
    { id: 'ps5', name: 'PS5 Console', icon: Tv },
    { id: 'xbox', name: 'Xbox Console', icon: Box },
    { id: 'vr', name: 'VR', icon: Glasses },
    { id: 'controllers', name: 'Racing Wheel', icon: Joystick },
    { id: 'laptops', name: 'Gaming Laptops', icon: Laptop },
    { id: 'big-screen', name: 'Big Screen Gaming', icon: Projector }
  ];

  const tenures = [
    { id: '1day', label: '1 Day', badge: 'Quick' },
    { id: '2days', label: '2 Days', badge: 'Weekend' },
    { id: '3days', label: '3 Days', badge: 'Short' },
    { id: '7days', label: '7 Days', badge: '1 Wk' },
    { id: '15days', label: '15 Days', badge: '2 Wks' },
    { id: '30days', label: '30 Days', badge: '1 Mo' }
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        
        {/* Subcategory Pills Row (Matching SharePal's exact catalog sub-nav) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-1 border-b border-slate-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id === 'gta-vi' ? 'ps5' : cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20 ring-2 ring-teal-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{cat.name}</span>
                {cat.badge && (
                  <span className="text-[9px] bg-red-500 text-white font-extrabold px-1.5 py-0.2 rounded uppercase">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Duration Plan Selector & Calendar Date Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2.5">
          
          {/* Duration Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              Duration:
            </span>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {tenures.map((t) => {
                const isSelected = globalTenure === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setGlobalTenure(t.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      isSelected
                        ? 'bg-white text-teal-700 shadow-xs border border-teal-200 font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{t.label}</span>
                    <span className={`text-[9.5px] px-1 py-0.2 rounded font-extrabold ${isSelected ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-500'}`}>
                      {t.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Calendar Date Trigger */}
            <button
              onClick={onOpenDateModal}
              className="flex items-center gap-1 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-extrabold transition-all shrink-0 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              <span>Select Calendar Dates 📅</span>
            </button>
          </div>

          {/* Sort By & Results Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <div className="text-slate-500 font-medium">
              Showing <span className="font-black text-slate-900">{totalResults}</span> gadgets
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FilterSortBar;
