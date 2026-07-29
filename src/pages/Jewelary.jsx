import React, { useState, useMemo, useContext } from 'react';
import { Star, ChevronDown, SlidersHorizontal, X, ShoppingBag, Heart, Search, User, Trash2 } from 'lucide-react';
import Footer from '../components/Footer';
import { CartContext } from '../components/Cartcontext';

const initialProducts = [
  { id: 1, name: 'Aviator Sunglasses', category: 'Accessories', price: 145, rating: 4.7, image: '/smartwatch.jpg', colors: ['#e9c46a', '#8d99ae', '#e76f51'] },
  { id: 2, name: 'Printed Silk Scarf', category: 'Accessories', price: 125, rating: 4.8, badge: 'New', badgeType: 'new', image: '/schoolbag.jpg', colors: ['#ff007f', '#3a86ff', '#8338ec'] },
  { id: 3, name: 'Italian Leather Belt', category: 'Accessories', price: 95, rating: 4.7, badge: 'Bestseller', badgeType: 'bestseller', image: '/photo-1638247025967-b4e38f787b76.jpg', colors: ['#000', '#5c3a21', '#d4a373'] },
  { id: 4, name: 'Bi-fold Leather Wallet', category: 'Accessories', price: 85, rating: 4.8, badge: 'Bestseller', badgeType: 'bestseller', image: '/wallet.jpg', colors: ['#000', '#5c3a21', '#1d3557'] },
];

export default function StoreFront() {
  const [selectedCategory, setSelectedCategory] = useState('Accessories');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRanges, setPriceRanges] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    cartCount,
    cartTotal,
    cartOpen,
    setCartOpen,
  } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handlePriceChange = (range) => {
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        if (selectedCategory !== 'All Products' && product.category !== selectedCategory) {
          return false;
        }

        if (priceRanges.length > 0) {
          const p = product.price;
          return priceRanges.some((range) => {
            if (range === 'under50') return p < 50;
            if (range === '50-100') return p >= 50 && p <= 100;
            if (range === '100-200') return p >= 100 && p <= 200;
            if (range === 'over200') return p > 200;
            return false;
          });
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'low-to-high') return a.price - b.price;
        if (sortBy === 'high-to-low') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, sortBy, priceRanges]);

  const FilterContent = () => (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-3 text-sm text-gray-300">
          {[
            { id: 'under50', label: 'Under $50' },
            { id: '50-100', label: '$50 - $100' },
            { id: '100-200', label: '$100 - $200' },
            { id: 'over200', label: 'Over $200' },
          ].map((range) => (
            <label key={range.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={priceRanges.includes(range.id)}
                onChange={() => handlePriceChange(range.id)}
                className="w-4 h-4 accent-pink-500 rounded bg-gray-800 border-gray-700"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans">
      {/* Hero Header */}
      <div
        className="relative bg-[#111625] border-b border-gray-800 py-12 px-4 sm:px-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/dimondearring.jpg')" }}
      >
        {/* Dark overlay so text stays readable over the image */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-xs text-gray-400 mb-2">
            Home &gt; Categories &gt; <span className="text-gray-200">{selectedCategory}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">{selectedCategory}</h1>
          <p className="text-sm text-gray-400 mt-2">Complete your look with our accessories</p>
          <p className="text-xs text-gray-500 mt-1">{filteredProducts.length} products</p>
        </div>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0b0f19] border-l border-gray-800 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Your Cart ({cartCount})</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-800"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400 mb-2">${item.price}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 text-sm"
                          >
                            −
                          </button>
                          <span className="text-sm w-4 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 rounded bg-gray-800 hover:bg-gray-700 text-sm"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto p-1 text-gray-400 hover:text-red-400"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-400">Total</span>
                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-pink-500 hover:bg-pink-600 transition text-white text-sm font-semibold py-3 rounded-lg">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterContent />
        </aside>

        {/* Mobile Filters Drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
            <div className="absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-[#0b0f19] border-r border-gray-800 p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setFiltersOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-800">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="flex-1 min-w-0">
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#151c2e] text-sm text-gray-200 border border-gray-700 rounded-lg px-4 py-2 hover:border-pink-500 transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="relative ml-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#151c2e] text-sm text-gray-200 border border-gray-700 rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-pink-500 cursor-pointer"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-900 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full ${
                        product.badgeType === 'new'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Add to Cart Overlay on Hover */}
                  <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-white text-gray-900 font-medium text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-100 transition shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button className="p-2.5 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition shadow-lg">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-gray-100 mb-1">{product.name}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white text-base">${product.price}</span>
                </div>

                {product.colors && (
                  <div className="flex gap-1.5 mt-auto">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-gray-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}