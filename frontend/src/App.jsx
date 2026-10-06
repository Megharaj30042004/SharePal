import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import SidebarCategoryNav from './components/SidebarCategoryNav';
import HeroBannerCard from './components/HeroBannerCard';
import ProductGrid from './components/ProductGrid';
import RentalTenureModal from './components/RentalTenureModal';
import CartDrawer from './components/CartDrawer';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import TrustStatsSection from './components/TrustStatsSection';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';
import WhatsAppBubble from './components/WhatsAppBubble';
import { API_BASE_URL } from './config/api';

function App() {
  const { globalTenure, selectedCity } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Dates State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultEnd = new Date(tomorrow);
  defaultEnd.setDate(defaultEnd.getDate() + 7); // 7 days default

  const [selectedStartDate, setSelectedStartDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [selectedEndDate, setSelectedEndDate] = useState(defaultEnd.toISOString().split('T')[0]);

  // Modal states
  const [tenureModalData, setTenureModalData] = useState({ isOpen: false, product: null, initialTenure: globalTenure });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Fetch products from REST API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const primaryUrl = `${API_BASE_URL}/api/products`;
        const response = await axios.get(primaryUrl, {
          params: {
            category: activeCategory,
            sort: sortBy,
            search: searchTerm
          }
        });
        if (response.data && response.data.data) {
          setProducts(response.data.data);
        }
      } catch (error) {
        try {
          const fallbackRes = await axios.get('/api/products', {
            params: { category: activeCategory, sort: sortBy, search: searchTerm }
          });
          if (fallbackRes.data && fallbackRes.data.data) {
            setProducts(fallbackRes.data.data);
          }
        } catch (fbErr) {
          console.warn("Backend API fetching notice:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, sortBy, searchTerm]);

  const handleOpenDatesModal = (product = null, tenure = globalTenure) => {
    setTenureModalData({
      isOpen: true,
      product: product || products[0] || null,
      initialTenure: tenure || globalTenure
    });
  };

  const handleOrderSuccess = (orderData) => {
    setConfirmedOrder(orderData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      
      {/* Top Header Navbar & Date Edit Pill */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        products={products}
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onOpenDateModal={() => handleOpenDatesModal()}
      />

      {/* Main Page Layout: Left Category Sidebar + Right Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          {/* Left Vertical Category Navigation Card */}
          <SidebarCategoryNav
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Right Main Catalog Content Area */}
          <main className="flex-1 w-full min-w-0">
            
            {/* SharePal Purple Hero Banner Card */}
            <HeroBannerCard />

            {/* Catalog Section Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Gaming Gadgets On Rent
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Total items: <strong className="text-slate-900">{products.length * 5} items</strong>
              </span>
            </div>

            {/* Product Catalog Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              onSelectDates={(prod, tenure) => handleOpenDatesModal(prod, tenure)}
            />

            {/* Trust & Sustainability Metrics */}
            <TrustStatsSection />

            {/* FAQ Accordion Section */}
            <FaqAccordion />

          </main>

        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Chat Bubble (Bottom Right) */}
      <WhatsAppBubble />

      {/* Interactive Modals & Drawers */}
      <RentalTenureModal
        product={tenureModalData.product}
        initialTenure={tenureModalData.initialTenure}
        isOpen={tenureModalData.isOpen}
        onClose={() => setTenureModalData({ ...tenureModalData, isOpen: false })}
      />

      <CartDrawer
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

    </div>
  );
}

export default App;
