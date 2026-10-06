import React from 'react';
import { ChevronRight, ShieldCheck, Truck, Clock, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BreadcrumbHero = () => {
  const { selectedCity } = useCart();

  const trustBadges = [
    { icon: ShieldCheck, title: 'Zero Security Deposit', desc: 'No heavy deposit upfront', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { icon: Truck, title: 'Free Express Delivery', desc: `Doorstep delivery in ${selectedCity}`, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { icon: CheckCircle2, title: '100% Tested Quality', desc: 'Sanitized & sanitized consoles', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { icon: Clock, title: 'Flexible Rentals', desc: 'Rent for 1 day, 2 days, 1 wk or more', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-6 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-slate-800">
      
      {/* Background Glow effects */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-slate-300">{selectedCity}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-teal-400 font-semibold">Gaming Gadgets on Rent</span>
        </nav>

        {/* Hero Content Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>India's Most Trusted Lifestyle Gear Rental Platform</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Rent Gaming Gadgets in <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-sky-300 bg-clip-text text-transparent">{selectedCity}</span>
            </h1>
            
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
              Play top PlayStation 5, Xbox Series X, Meta Quest 3 VR, and Gaming Laptops in {selectedCity} without buying. Enjoy zero security deposit, instant doorstep delivery, and 24/7 support.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-lg flex items-center gap-4 self-stretch sm:self-auto">
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
              <img className="inline-block h-9 w-9 rounded-full ring-2 ring-slate-800 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="User" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                ★★★★★ <span className="text-white font-extrabold ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Over 50,000+ happy rentals in {selectedCity}</p>
            </div>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 p-3.5 rounded-xl flex items-start gap-3 transition-all duration-200"
              >
                <div className={`p-2 rounded-lg border ${badge.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{badge.title}</h4>
                  <p className="text-[10.5px] text-slate-400 mt-0.5 leading-snug">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BreadcrumbHero;
