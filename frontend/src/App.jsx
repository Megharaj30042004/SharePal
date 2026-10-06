import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import BreadcrumbHero from './components/BreadcrumbHero';
import DateSelectorBar from './components/DateSelectorBar';
import FilterSortBar from './components/FilterSortBar';
import ProductGrid from './components/ProductGrid';
import RentalTenureModal from './components/RentalTenureModal';
import CartDrawer from './components/CartDrawer';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import TrustStatsSection from './components/TrustStatsSection';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';
import FloatingDateBar from './components/FloatingDateBar';

function App() {
  const { globalTenure } = useCart();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');

  // Selected Dates State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultEnd = new Date(tomorrow);
  defaultEnd.setDate(defaultEnd.getDate() + 2); // 2 days default

  const [selectedStartDate, setSelectedStartDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [selectedEndDate, setSelectedEndDate] = useState(defaultEnd.toISOString().split('T')[0]);

  // Modal states
  const [tenureModalData, setTenureModalData] = useState({ isOpen: false, product: null, initialTenure: globalTenure });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Fetch products from backend REST API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/products', {
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
        console.warn("Backend API unavailable, using initial product set:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, sortBy, searchTerm]);

  const calculateDays = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
    return diff;
  };

  const currentTotalDays = calculateDays(selectedStartDate, selectedEndDate);

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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navigation Bar */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        products={products}
      />

      {/* Hero Banner with Trust Badges */}
      <BreadcrumbHero />

      {/* Interactive Date Selector Bar ("Asking the dates") */}
      <DateSelectorBar
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        totalDays={currentTotalDays}
        onOpenDateModal={() => handleOpenDatesModal()}
      />

      {/* Sticky Subcategory & Sort Toolbar */}
      <FilterSortBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalResults={products.length}
        onOpenDateModal={() => handleOpenDatesModal()}
      />

      {/* Product Catalog Grid */}
      <main className="flex-1 pb-16">
        <ProductGrid
          products={products}
          isLoading={isLoading}
          onSelectDates={(prod, tenure) => handleOpenDatesModal(prod, tenure)}
        />

        {/* Platform Trust & Impact Stats */}
        <TrustStatsSection />

        {/* FAQ Accordion Section */}
        <FaqAccordion />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Date Prompt Bar */}
      <FloatingDateBar
        onOpenDateModal={() => handleOpenDatesModal()}
      />

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
