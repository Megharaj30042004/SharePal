import React from 'react';
import { Gamepad2, Tv, Box, Glasses, Joystick, Projector, Smile, Flame } from 'lucide-react';

const SidebarCategoryNav = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', name: 'All', icon: Smile },
    { id: 'gta-vi', name: 'GTA VI', icon: Flame, badge: 'NEW' },
    { id: 'ps5', name: 'PS5 Console', icon: Tv },
    { id: 'xbox', name: 'Xbox Console', icon: Box },
    { id: 'vr', name: 'VR', icon: Glasses },
    { id: 'controllers', name: 'Racing Wheel', icon: Joystick },
    { id: 'big-screen', name: 'Big Screen', icon: Projector }
  ];

  return (
    <aside className="w-full md:w-32 bg-white rounded-2xl md:rounded-3xl p-2 md:p-3 border border-slate-200/80 shadow-xs flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible shrink-0 self-stretch md:self-start sticky top-20 md:top-32 z-30 no-scrollbar">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id || (cat.id === 'gta-vi' && activeCategory === 'ps5');
        
        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id === 'gta-vi' ? 'ps5' : cat.id)}
            className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl text-center transition-all duration-200 cursor-pointer relative group shrink-0 min-w-[72px] md:min-w-0 flex-1 md:flex-initial ${
              isActive
                ? 'bg-purple-50 text-[#5E17EB] font-extrabold border border-purple-200 shadow-2xs'
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            <div className={`p-1.5 md:p-2 rounded-xl mb-1 transition-transform group-hover:scale-110 ${
              isActive ? 'bg-[#5E17EB] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
            }`}>
              <Icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>

            <span className="text-[10px] md:text-[11px] leading-tight text-center whitespace-nowrap">{cat.name}</span>

            {/* Active Bottom Indicator */}
            {isActive && (
              <div className="w-5 md:w-6 h-1 bg-[#5E17EB] rounded-full mt-1 md:mt-1.5" />
            )}
          </button>
        );
      })}
    </aside>
  );
};

export default SidebarCategoryNav;
