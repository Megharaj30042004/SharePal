import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';

const HeroBannerCard = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#5E17EB] via-[#4800C6] to-[#3B00B9] text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-purple-400/30 mb-8">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Console Showcase Image */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=400&q=80"
            alt="Xbox Series X"
            className="w-36 h-36 object-contain drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform"
          />
        </div>

        {/* Center Content Text */}
        <div className="text-center flex-1 max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-300 text-xs font-black uppercase tracking-widest border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>Official SharePal Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white drop-shadow-md">
            Gaming Consoles
          </h1>

          <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed max-w-lg mx-auto">
            Rent the latest gaming gadgets from <span className="font-bold text-white underline decoration-teal-400 underline-offset-4">SharePal</span> PS5, Xbox, Oculus VR, Racing Wheel on rent.
          </p>

          {/* Brand Partner Badges */}
          <div className="pt-3 flex items-center justify-center gap-6 text-xs font-black tracking-widest text-white/90 uppercase border-t border-white/15">
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              <span className="text-emerald-400 text-sm font-black">🎮</span> XBOX
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              <span className="text-blue-400 text-sm font-black">⚡</span> PS5
            </span>
            <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-lg border border-white/20">
              <span className="text-cyan-300 text-sm font-black">🥽</span> Meta
            </span>
          </div>
        </div>

        {/* Right Console Showcase Image */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <img
            src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80"
            alt="PS5 Console"
            className="w-36 h-36 object-contain drop-shadow-2xl rounded-2xl hover:scale-105 transition-transform"
          />
        </div>

      </div>
    </div>
  );
};

export default HeroBannerCard;
