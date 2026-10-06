import React from 'react';
import { Calendar, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const DateSelectorBar = ({ startDate, endDate, totalDays, onOpenDateModal }) => {
  const { selectedCity } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-2xl p-4 sm:p-5 text-white shadow-xl border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Left Info */}
        <div className="flex items-center gap-3.5 z-10">
          <div className="p-3 bg-teal-500/20 border border-teal-400/30 rounded-2xl text-teal-300 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal-300 mb-0.5">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>Select Your Rental Dates</span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>When do you need the gaming gadgets in {selectedCity}?</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">
              Currently selected: <span className="font-extrabold text-teal-300">{startDate}</span> to <span className="font-extrabold text-teal-300">{endDate}</span> ({totalDays} {totalDays === 1 ? 'Day' : 'Days'})
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3 z-10 w-full md:w-auto">
          <div className="hidden lg:flex items-center gap-2 text-xs text-teal-200 font-semibold bg-teal-950/60 border border-teal-800/80 px-3 py-2 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Zero Security Deposit</span>
          </div>

          <button
            onClick={onOpenDateModal}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-teal-500/30 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Change Rental Dates ({totalDays} Days)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DateSelectorBar;
