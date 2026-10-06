import React from 'react';
import { ShieldCheck, Leaf, Coins, Repeat, Star, Quote } from 'lucide-react';

const TrustStatsSection = () => {
  const stats = [
    {
      icon: Coins,
      value: "250Cr+",
      label: "Saved Together",
      desc: "By renting instead of buying expensive gaming hardware upfront",
      color: "text-amber-500 bg-amber-50 border-amber-200"
    },
    {
      icon: Leaf,
      value: "4.5M Kg",
      label: "CO₂e Emissions Saved",
      desc: "Promoting circular economy & sustainable tech consumption",
      color: "text-emerald-500 bg-emerald-50 border-emerald-200"
    },
    {
      icon: Repeat,
      value: "100K+",
      label: "Products in Circulation",
      desc: "High-grade consoles, VR headsets & laptops delivered safely",
      color: "text-blue-500 bg-blue-50 border-blue-200"
    }
  ];

  const testimonials = [
    {
      name: "Afrana",
      city: "Bangalore",
      gadget: "PS5 Dual Controller Bundle",
      comment: "Rented the PS5 for a FIFA tournament weekend with friends in Koramangala. Delivery was super fast, zero security deposit, and controllers were spotless!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Kanthikiran",
      city: "Bangalore",
      gadget: "Meta Quest 3 VR Headset",
      comment: "Wanted to experience VR before buying. SharePal delivered Meta Quest 3 within 6 hours. Zero hassle, clear instructions, and easy return pickup!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Amal",
      city: "Bangalore",
      gadget: "Asus ROG Strix Laptop",
      comment: "Rented a high-end gaming laptop for a week during LAN party. Smooth performance, pre-loaded games, and unbelievable rental pricing. SharePal is unmatched!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-slate-800">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold mb-3 uppercase tracking-wider">
            Why Rent From SharePal?
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            The Smarter Way to Play & Own Less
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
            Join thousands of gamers in Bangalore saving money, space, and reducing electronic waste.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-800/60 border border-slate-700/70 rounded-3xl p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl border ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-sm font-extrabold text-blue-400 mt-1">{stat.label}</div>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">{stat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-slate-200">Loved by Gamers Across Bangalore</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      {"★".repeat(t.rating)}
                    </div>
                    <Quote className="w-5 h-5 text-slate-600" />
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-slate-600" />
                  <div>
                    <div className="text-xs font-bold text-white">{t.name}</div>
                    <div className="text-[10px] text-blue-400 font-semibold">{t.city} • {t.gadget}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustStatsSection;
