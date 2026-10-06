import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppBubble = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hi%20SharePal,%20I%20want%20to%20rent%20gaming%20gadgets"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer ring-4 ring-emerald-400/30"
      title="Chat with SharePal Support"
    >
      <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
    </a>
  );
};

export default WhatsAppBubble;
