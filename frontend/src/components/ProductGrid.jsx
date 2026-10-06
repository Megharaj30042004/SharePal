import React from 'react';
import ProductCard from './ProductCard';
import { Gamepad2, AlertCircle } from 'lucide-react';

const ProductGrid = ({ products, isLoading, onSelectDates }) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 animate-pulse flex flex-col justify-between h-96">
              <div className="bg-slate-200 h-40 rounded-xl mb-4" />
              <div className="space-y-3">
                <div className="bg-slate-200 h-4 w-1/3 rounded" />
                <div className="bg-slate-200 h-6 w-3/4 rounded" />
                <div className="bg-slate-200 h-3 w-full rounded" />
                <div className="bg-slate-200 h-3 w-5/6 rounded" />
              </div>
              <div className="bg-slate-200 h-10 w-full rounded-xl mt-4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-blue-50 text-blue-600 rounded-full mb-4 border border-blue-100">
          <Gamepad2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Gaming Gadgets Found</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
          We couldn't find any products matching your current category filter or search query. Try clearing filters or searching for "PS5" or "VR".
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id || product.slug}
            product={product}
            onSelectDates={onSelectDates}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
