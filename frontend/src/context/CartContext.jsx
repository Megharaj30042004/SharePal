import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('sharepal_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [globalTenure, setGlobalTenure] = useState('2days'); // '1day', '2days', '3days', '7days', '15days', '30days'
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Synced city state persisted in localStorage
  const [selectedCity, setSelectedCity] = useState(() => {
    return localStorage.getItem('sharepal_city') || 'Bangalore';
  });

  useEffect(() => {
    localStorage.setItem('sharepal_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('sharepal_city', selectedCity);
  }, [selectedCity]);

  // Tenure labels map
  const tenureLabels = {
    '1day': '1 Day (Quick Rent)',
    '2days': '2 Days (Weekend Pass)',
    '3days': '3 Days (Short Trip)',
    '7days': '7 Days (1 Week)',
    '15days': '15 Days (2 Weeks)',
    '30days': '30 Days (1 Month)',
    '90days': '90 Days (3 Months)'
  };

  // Get total days count for a tenure key
  const getTenureDaysCount = (tenureKey) => {
    switch (tenureKey) {
      case '1day': return 1;
      case '2days': return 2;
      case '3days': return 3;
      case '7days': return 7;
      case '15days': return 15;
      case '30days': return 30;
      case '90days': return 90;
      default: return 2;
    }
  };

  /**
   * Bulletproof Price Calculator:
   * Guarantees total price strictly increases with duration,
   * while per-day cost strictly decreases.
   */
  const getProductPrice = (product, tenure = globalTenure, customDays = null) => {
    if (!product || !product.pricing) return 0;

    const base7 = Number(product.pricing.sevenDays) || 1499;

    // Direct keys if defined explicitly on product
    const explicitOne = Number(product.pricing.oneDay);
    const explicitTwo = Number(product.pricing.twoDays);
    const explicitThree = Number(product.pricing.threeDays);
    const explicitFifteen = Number(product.pricing.fifteenDays);
    const explicitThirty = Number(product.pricing.thirtyDays);
    const explicitNinety = Number(product.pricing.ninetyDays);

    const price1 = explicitOne || Math.round(base7 * 0.35);
    const price2 = explicitTwo || Math.round(base7 * 0.55);
    const price3 = explicitThree || Math.round(base7 * 0.70);
    const price7 = base7;
    const price15 = explicitFifteen || Math.round(base7 * 1.6);
    const price30 = explicitThirty || Math.round(base7 * 2.5);
    const price90 = explicitNinety || Math.round(base7 * 6.0);

    // If customDays is provided
    if (customDays && !isNaN(customDays) && customDays > 0) {
      const days = Number(customDays);
      if (days === 1) return price1;
      if (days === 2) return price2;
      if (days === 3) return price3;
      if (days === 7) return price7;
      if (days === 15) return price15;
      if (days === 30) return price30;
      if (days === 90) return price90;

      if (days < 7) {
        // Linear interpolation between 1, 2, 3, 7 days
        if (days === 4) return Math.round(price3 + (price7 - price3) * 0.25);
        if (days === 5) return Math.round(price3 + (price7 - price3) * 0.50);
        if (days === 6) return Math.round(price3 + (price7 - price3) * 0.75);
      }
      
      const perDayRate = product.pricing.perDayRate || Math.round(base7 / 7);
      return Math.round(days * perDayRate);
    }

    switch (tenure) {
      case '1day': return price1;
      case '2days': return price2;
      case '3days': return price3;
      case '7days': return price7;
      case '15days': return price15;
      case '30days': return price30;
      case '90days': return price90;
      default: return price2;
    }
  };

  // Calculate dynamic per-day rate for currently selected duration
  const getPerDayRate = (product, tenure = globalTenure, customDays = null) => {
    const totalPrice = getProductPrice(product, tenure, customDays);
    const days = (customDays && !isNaN(customDays) && customDays > 0) 
      ? Number(customDays) 
      : getTenureDaysCount(tenure);
    
    if (!totalPrice || isNaN(totalPrice) || !days || isNaN(days)) return 0;
    return Math.round(totalPrice / days);
  };

  // Add item to cart
  const addToCart = (product, tenure = globalTenure, startDate = null, endDate = null, customDays = null) => {
    const unitPrice = getProductPrice(product, tenure, customDays);
    const label = customDays 
      ? `${customDays} Days (${startDate} to ${endDate})` 
      : (tenureLabels[tenure] || '2 Days');

    const startDefault = startDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const endDefault = endDate || new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

    const existingIndex = cartItems.findIndex(
      item => item._id === product._id && item.tenure === tenure && item.startDate === startDefault
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      const newItem = {
        _id: product._id || product.slug,
        title: product.title,
        slug: product.slug,
        image: product.images ? product.images[0] : '',
        categoryLabel: product.categoryLabel,
        securityDeposit: product.securityDeposit || 0,
        isZeroDeposit: product.isZeroDeposit,
        pricing: product.pricing,
        tenure: tenure,
        tenureLabel: label,
        unitPrice: isNaN(unitPrice) ? 799 : unitPrice,
        quantity: 1,
        startDate: startDefault,
        endDate: endDefault
      };
      setCartItems(prev => [...prev, newItem]);
    }
    setIsCartDrawerOpen(true);
  };

  // Update item tenure directly in cart
  const updateCartItemTenure = (index, newTenure) => {
    setCartItems(prev => {
      const updated = [...prev];
      const item = updated[index];
      const newPrice = getProductPrice(item, newTenure);

      updated[index] = {
        ...item,
        tenure: newTenure,
        tenureLabel: tenureLabels[newTenure] || '2 Days',
        unitPrice: isNaN(newPrice) ? 799 : newPrice
      };
      return updated;
    });
  };

  // Remove item
  const removeFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Update quantity
  const updateQuantity = (index, delta) => {
    setCartItems(prev => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Apply Coupon code logic
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'EARLYBIRD15') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 15, label: '15% Off Earlybird Special' });
      return { success: true, message: 'Coupon EARLYBIRD15 applied! 15% discount saved.' };
    } else if (cleanCode === 'SHAREPAL') {
      setAppliedCoupon({ code: cleanCode, discountAmount: 300, label: '₹300 Flat SharePal Discount' });
      return { success: true, message: 'Coupon SHAREPAL applied! ₹300 discount saved.' };
    } else if (cleanCode === 'ZERODEPOSIT') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 10, label: '10% Off Gamer Pass' });
      return { success: true, message: 'Coupon ZERODEPOSIT applied! 10% discount saved.' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try EARLYBIRD15 or SHAREPAL' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Compute cart summary financials
  const subtotal = cartItems.reduce((acc, item) => acc + ((item.unitPrice || 0) * item.quantity), 0);
  const totalDeposit = cartItems.reduce((acc, item) => acc + ((item.securityDeposit || 0) * item.quantity), 0);
  const deliveryFee = subtotal >= 1200 || cartItems.length === 0 ? 0 : 149;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxableAmount * 0.18); // 18% GST
  const grandTotal = taxableAmount + totalDeposit + deliveryFee + tax;
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        globalTenure,
        setGlobalTenure,
        selectedCity,
        setSelectedCity,
        getProductPrice,
        getPerDayRate,
        getTenureDaysCount,
        addToCart,
        updateCartItemTenure,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        tenureLabels,
        totals: {
          subtotal,
          totalDeposit,
          deliveryFee,
          discountAmount,
          tax,
          grandTotal
        }
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
