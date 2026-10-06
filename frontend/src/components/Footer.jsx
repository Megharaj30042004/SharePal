import React from 'react';
import { Gamepad2, Mail, Phone, MapPin, Heart, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const cities = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata'];

  const categoryLinks = [
    { title: 'Gaming Consoles', links: ['PS5 Console on Rent', 'Xbox Series X on Rent', 'Xbox Series S on Rent', 'Nintendo Switch on Rent'] },
    { title: 'VR & Big Screen', links: ['Meta Quest 3 VR on Rent', 'Meta Quest 2 VR on Rent', 'PS VR2 Headset on Rent', 'BenQ 4K Gaming Projector'] },
    { title: 'Accessories & Laptops', links: ['PS5 DualSense Controller', 'Thrustmaster Racing Wheel', 'Asus ROG Gaming Laptop', 'MSI Gaming Laptop'] },
    { title: 'Other Categories', links: ['Action Cameras on Rent', 'DSLR & Mirrorless Cameras', 'Trekking Gear on Rent', 'Riding Jackets & Luggage'] }
  ];

  const policyLinks = [
    'How it works?', 'Verification (KYC)', 'Zero Deposit Policy', 'Cancellation Policy', 
    'Damage Waiver Policy', 'Terms & Conditions', 'Privacy Policy'
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">SharePal Promise</h4>
              <p className="text-xs text-slate-400">Zero Security Deposit • 100% Tested Gear • Pay on Delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-slate-300 font-semibold text-xs">
            <a href="mailto:care@sharepal.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-blue-400" /> care@sharepal.in
            </a>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              ⚡ 24/7 Whatsapp Support
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-sky-500 text-white p-2 rounded-xl">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Share<span className="text-blue-500">Pal</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs pr-6">
              India's most trusted lifestyle gear rental platform. Rent top gaming gadgets, PS5 consoles, VR headsets, action cameras, and laptops in Bangalore with Zero Security Deposit.
            </p>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Popular Rental Hubs</h5>
              <div className="flex flex-wrap gap-1.5">
                {cities.map((city) => (
                  <span key={city} className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] font-medium text-slate-300">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {categoryLinks.slice(0, 2).map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</h5>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-blue-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Information & Policies */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Information</h5>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-400 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 SWNAC E-Kiraya Services Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for Bangalore & India</span>
          </div>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
