import React from 'react';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingDateBar = ({ onOpenDateModal }) => {
  const { globalTenure, tenureLabels } = useCart();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto">
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-teal-500/40 p-3 sm:px-6 rounded-full shadow-2xl flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-teal-500/20 text-teal-400 rounded-full shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Selected Plan:</span>
              <span className="text-teal-400 font-extrabold">{tenureLabels[globalTenure] || '2 Days'}</span>
            </div>
            <div className="text-[10px] text-slate-400 hidden sm:block">Zero Security Deposit • Free Delivery</div>
          </div>
        </div>

        <button
          onClick={onOpenDateModal}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-full text-xs transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Select Dates 📅</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};

export default FloatingDateBar;
