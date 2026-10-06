import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Truck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does Zero Security Deposit rental work on SharePal?",
      answer: "SharePal offers Zero Security Deposit on eligible orders in Bangalore! During checkout, we run a quick 2-minute online KYC check (Aadhaar / Govt ID verification). Once verified, you pay only the rental fee with zero upfront security deposit deposit."
    },
    {
      question: "What is the delivery timeline for Bangalore gaming gadget rentals?",
      answer: "We offer Express Doorstep Delivery! Orders placed before 2 PM are delivered on the same day. Standard delivery takes 24 hours to any locality in Bangalore (Indiranagar, Koramangala, HSR Layout, Whitefield, Electronic City, Yelahanka, etc.)."
    },
    {
      question: "Are the gaming consoles, controllers, and VR headsets sanitized & tested?",
      answer: "Absolutely! Every device undergoes a rigorous 15-point quality test including HDMI output checks, thermal stress testing, battery health, and controller drift inspection. Controllers and VR face cushions are sanitized and sealed before delivery."
    },
    {
      question: "What happens if a device suffers accidental damage during rental?",
      answer: "Normal wear & tear is 100% covered by SharePal. For minor accidental damages, we offer CarePal Protection (optional add-on at ₹99) which waives up to 80% of repair expenses."
    },
    {
      question: "Can I extend my rental period mid-way through my booking?",
      answer: "Yes! You can extend your rental duration anytime before your pickup date through your account or by WhatsApping our support line. The extension rates will automatically adjust to the cheaper long-term pricing tier."
    },
    {
      question: "What documents are required for verification (KYC)?",
      answer: "You only need a valid Govt-issued Photo ID (Aadhaar Card, Passport, or Driving License) and a current address proof in Bangalore. The verification takes less than 2 minutes online."
    }
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          Got Questions?
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
          Everything you need to know about renting PS5, Xbox, VR, and laptops in Bangalore.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-blue-200 shadow-md shadow-blue-500/5' 
                  : 'bg-white/80 border-slate-200 hover:border-slate-300'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
              >
                <span className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                  <span className="text-xs text-blue-600 font-mono">0{idx + 1}.</span>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-5 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FaqAccordion;
