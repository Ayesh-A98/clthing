import React, { useState, useMemo, useContext } from 'react';
import { ShoppingBag, Heart, Star, ChevronDown, SlidersHorizontal, X, ShoppingCart, Trash2, Check } from 'lucide-react';
import { CartContext } from '../components/Cartcontext';

const initialProducts = [
  { id: 1, name: 'Minimal Leather Jacket', category: 'Clothing', price: 299, originalPrice: 399, rating: 4.8, badge: '-25%', badgeType: 'sale', image: '/whitetjacket.jpg', colors: ['#000', '#5c3a21', '#d4a373'] },
  { id: 2, name: 'Cashmere Crewneck Sweater', category: 'Clothing', price: 189, rating: 4.9, badge: 'New', badgeType: 'new', image: '/wallet.jpg', colors: ['#fefae0', '#1d3557', '#f4a261', '#e76f51'] },
  { id: 3, name: 'Aviator Sunglasses', category: 'Accessories', price: 145, rating: 4.7, image: '/smartwatch.jpg', colors: ['#e9c46a', '#2a9d8f', '#e76f51'] },
  { id: 4, name: 'Leather Crossbody Bag', category: 'Bags', price: 225, originalPrice: 275, rating: 4.6, badge: '-18%', badgeType: 'sale', image: '/schoolbag2.jpg', colors: ['#000', '#8b0000', '#5c3a21'] },
  { id: 5, name: 'Minimalist Leather Sneakers', category: 'Footwear', price: 165, rating: 4.8, badge: 'New', badgeType: 'new', image: '/schoolbag.jpg', colors: ['#fff', '#000', '#1d3557'] },
  { id: 6, name: 'Gold Vermeil Hoop Earrings', category: 'Jewelry', price: 78, rating: 4.9, image: '/redwatch.jpg', colors: ['#e9c46a', '#e0e1dd', '#e76f51'] },
  { id: 7, name: 'Tech Laptop Backpack', category: 'Bags', price: 149, rating: 4.5, image: '/photo-1638247025967-b4e38f787b76.jpg', colors: ['#000', '#6c757d', '#1d3557'] },
  { id: 8, name: 'Pearl Drop Earrings', category: 'Jewelry', price: 145, rating: 4.9, image: '/photo-1606760227091-3dd870d97f1d.jpg', colors: ['#fff', '#fefae0', '#f4a261'] },
  { id: 9, name: 'Minimalist Steel Watch', category: 'Watches', price: 275, originalPrice: 325, rating: 4.8, image: '/photo-1601370690183-1c7796ecec61.jpg', colors: ['#000', '#e76f51', '#e0e1dd'] },
  { id: 10, name: 'Aviator Sunglasses', category: 'Accessories', price: 145, rating: 4.7, image: '/smartwatch.jpg', colors: ['#e9c46a', '#2a9d8f', '#e76f51'] },
  { id: 11, name: 'Leather Crossbody Bag', category: 'Bags', price: 225, originalPrice: 275, rating: 4.6, badge: '-18%', badgeType: 'sale', image: '/schoolbag2.jpg', colors: ['#000', '#8b0000', '#5c3a21'] },
  { id: 12, name: 'Minimalist Leather Sneakers', category: 'Footwear', price: 165, rating: 4.8, badge: 'New', badgeType: 'new', image: '/schoolbag.jpg', colors: ['#fff', '#000', '#1d3557'] },
  { id: 13, name: 'Gold Vermeil Hoop Earrings', category: 'Jewelry', price: 78, rating: 4.9, image: '/redwatch.jpg', colors: ['#e9c46a', '#e0e1dd', '#e76f51'] },
  { id: 14, name: 'Tech Laptop Backpack', category: 'Bags', price: 149, rating: 4.5, image: '/photo-1638247025967-b4e38f787b76.jpg', colors: ['#000', '#6c757d', '#1d3557'] },
  { id: 15, name: 'Pearl Drop Earrings', category: 'Jewelry', price: 145, rating: 4.9, image: '/photo-1606760227091-3dd870d97f1d.jpg', colors: ['#fff', '#fefae0', '#f4a261'] },
  { id: 16, name: 'Minimalist Steel Watch', category: 'Watches', price: 275, originalPrice: 325, rating: 4.8, image: '/photo-1601370690183-1c7796ecec61.jpg', colors: ['#000', '#e76f51', '#e0e1dd'] },
  { id: 17, name: 'Aviator Sunglasses', category: 'Accessories', price: 145, rating: 4.7, image: '/photo-1542291026-7eec264c27ff.jpg', colors: ['#e9c46a', '#2a9d8f', '#e76f51'] },
  { id: 18, name: 'Leather Crossbody Bag', category: 'Bags', price: 225, originalPrice: 275, rating: 4.6, badge: '-18%', badgeType: 'sale', image: '/photo-1542291026-7eec264c27ff.jpg', colors: ['#000', '#8b0000', '#5c3a21'] },
  { id: 19, name: 'Minimalist Leather Sneakers', category: 'Footwear', price: 165, rating: 4.8, badge: 'New', badgeType: 'new', image: '/photo-1548036328-c9fa89d128fa.jpg', colors: ['#fff', '#000', '#1d3557'] },
  { id: 20, name: 'Gold Vermeil Hoop Earrings', category: 'Jewelry', price: 78, rating: 4.9, image: '/photo-1549298916-b41d501d3772.jpg', colors: ['#e9c46a', '#e0e1dd', '#e76f51'] },
  { id: 21, name: 'Tech Laptop Backpack', category: 'Bags', price: 149, rating: 4.5, image: '/photo-1638247025967-b4e38f787b76.jpg', colors: ['#000', '#6c757d', '#1d3557'] },
  { id: 22, name: 'Pearl Drop Earrings', category: 'Jewelry', price: 145, rating: 4.9, image: '/photo-1606760227091-3dd870d97f1d.jpg', colors: ['#fff', '#fefae0', '#f4a261'] },
  { id: 23, name: 'Minimalist Steel Watch', category: 'Watches', price: 275, originalPrice: 325, rating: 4.8, image: '/photo-1601370690183-1c7796ecec61.jpg', colors: ['#000', '#e76f51', '#e0e1dd'] },
  { id: 24, name: 'Minimalist Steel Watch', category: 'Watches', price: 275, originalPrice: 325, rating: 4.8, image: '/photo-1520975954732-35dd22299614.jpg', colors: ['#000', '#e76f51', '#e0e1dd'] },
];

export default function StoreFront() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
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

  const categories = [
    { name: 'All Products', count: initialProducts.length },
    { name: 'Clothing', count: 124 },
    { name: 'Accessories', count: 86 },
    { name: 'Footwear', count: 52 },
    { name: 'Bags', count: 38 },
    { name: 'Jewelry', count: 64 },
    { name: 'Watches', count: 28 },
  ];

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
          const matchesPrice = priceRanges.some((range) => {
            if (range === 'under50') return p < 50;
            if (range === '50-100') return p >= 50 && p <= 100;
            if (range === '100-200') return p >= 100 && p <= 200;
            if (range === 'over200') return p > 200;
            return false;
          });

          if (!matchesPrice) return false;
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
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-3 text-sm">
          {categories.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setFiltersOpen(false);
                }}
                className={`w-full text-left transition ${
                  selectedCategory === cat.name ? 'text-pink-500 font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            </li>
          ))}
        </ul>
      </div>

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
      {/* Breadcrumb + Cart trigger */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="text-xs text-gray-400">
          Home &gt; <span className="text-gray-200">Products</span>
        </div>

      
      </div>

      {/* Cart Drawer */}
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
      <div className="px-4 sm:px-6 lg:px-8 pb-12 flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Sidebar Filters — desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <FilterContent />
        </aside>

        {/* Mobile filter drawer */}
        {filtersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setFiltersOpen(false)}
            />
            <div className="absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-[#0b0f19] border-r border-gray-800 p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-800"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{selectedCategory}</h1>
              <p className="text-sm text-gray-400 mt-1">{filteredProducts.length} products</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#151c2e] text-sm text-gray-200 border border-gray-700 rounded-lg px-4 py-2 hover:border-pink-500 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto bg-[#151c2e] text-sm text-gray-200 border border-gray-700 rounded-lg px-4 py-2 pr-8 appearance-none focus:outline-none focus:border-pink-500 cursor-pointer"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-900 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {product.badge && (
                    <span
                      className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md ${
                        product.badgeType === 'sale' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Hover / tap buttons */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-200 transition-colors text-black font-semibold text-sm px-4 py-2.5 rounded-lg"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                    <button className="bg-white hover:bg-gray-200 transition-colors text-black h-10 w-10 flex items-center justify-center rounded-lg shrink-0">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-start text-xs text-gray-400 mb-1">
                  <span>{product.category}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-gray-100 mb-1">{product.name}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white text-base">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {product.colors && (
                  <div className="flex gap-1.5 mt-auto">
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-gray-600"
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
    </div>
  );
}