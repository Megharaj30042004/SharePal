import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, PackageCheck, Calendar, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderConfirmationModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 text-center relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white rounded-full bg-black/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 border border-white/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-black">Rental Booking Confirmed!</h3>
            <p className="text-xs text-emerald-100 mt-1">Thank you for renting with SharePal</p>
            
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-extrabold mt-3 border border-white/20">
              Order ID: #{order.orderId}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
            
            {/* Delivery Timeline Pill */}
            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
                <Truck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-extrabold text-slate-900">Express Delivery Scheduled</div>
                <div className="text-slate-500 font-medium mt-0.5">
                  Our delivery executive will contact <span className="font-bold text-slate-700">{order.user.phone}</span> within 24 hours.
                </div>
              </div>
            </div>

            {/* Rented Items Summary */}
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Rented Gadgets ({order.items.length})
              </div>
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.title} className="w-8 h-8 object-contain bg-white rounded p-0.5" />
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-1">{item.title}</div>
                        <div className="text-[10px] text-blue-600 font-semibold">{item.tenureLabel}</div>
                      </div>
                    </div>
                    <div className="font-black text-slate-900">₹{item.unitPrice * item.quantity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">{order.user.name}</div>
                  <div className="text-slate-500">{order.user.address}, {order.user.city} - {order.user.pincode}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                <span className="text-slate-500 font-medium">Payment Mode</span>
                <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Pay on Delivery (Zero Deposit)
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-1 font-black text-slate-900 text-sm">
                <span>Total Amount Payable</span>
                <span className="text-blue-600 text-base">₹{order.pricing.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold rounded-xl transition-all"
            >
              Continue Browsing
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OrderConfirmationModal;
