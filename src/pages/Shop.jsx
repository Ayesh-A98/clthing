import React, { useState, useEffect, useMemo, useContext } from 'react';
import {
  ShoppingBag,
  Heart,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
  ShoppingCart,
  Trash2,
  Check,
} from 'lucide-react';
import { CartContext } from '../components/Cartcontext';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../API/products';

export default function StoreFront() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRanges, setPriceRanges] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

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
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Fetch the current page from the server whenever the page changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllProducts({ page: currentPage })
      .then(({ products, meta }) => {
        setProducts(products || []);
        setTotalPages(meta?.totalPages || 1);
        setTotalItems(meta?.totalItems || (products ? products.length : 0));
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const handlePriceChange = (range) => {
    setPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // NOTE: category/price filters and sorting below only apply to the products
  // already loaded for the CURRENT page, since pagination now happens on the
  // server. If you want filters to apply across the full catalog (not just
  // the current page), the /products endpoint needs to accept gender/price
  // params too, and we'd pass selectedCategory/priceRanges into
  // getAllProducts() instead of filtering client-side.
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        if (
          selectedCategory !== 'All Products' &&
          product.gender !== selectedCategory
        ) {
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
        if (sortBy === 'rating') return (b.ratings_average || 0) - (a.ratings_average || 0);
        return 0;
      });
  }, [products, selectedCategory, sortBy, priceRanges]);

  // Reset to page 1 whenever filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, priceRanges]);

  const goToPage = (page) => {
    const clamped = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(clamped);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FilterContent = () => (
    <>
      <div className="mb-8">
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

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#151c2e] border border-gray-700 text-gray-300 hover:border-pink-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-gray-500 select-none"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                currentPage === page
                  ? 'bg-fuchsia-600 text-white'
                  : 'bg-[#151c2e] border border-gray-700 text-gray-300 hover:border-pink-500 hover:text-white'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#151c2e] border border-gray-700 text-gray-300 hover:border-pink-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

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
                        <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
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
              <p className="text-sm text-gray-400 mt-1">{totalItems} products</p>
            </div>

            <div className="flex items-center gap-2">
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

          {/* Loading / Error / Empty states */}
          {loading && <p className="text-gray-400">Loading products...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && !error && filteredProducts.length === 0 && (
            <p className="text-gray-400">No products found.</p>
          )}

          {/* Product Cards */}
          {!loading && !error && filteredProducts.length > 0 && (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-900 mb-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {product.is_featured && (
                        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-500 text-white">
                          Featured
                        </span>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => {
                            if (!isAuthenticated) return navigate('/login')
                            addToCart(product)
                          }}
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
                      <span>{product.gender}</span>
                      {product.ratings_average > 0 && (
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{product.ratings_average}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-sm text-gray-100 mb-1">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-white text-base">${product.price}</span>
                      {product.discount_price && (
                        <span className="text-xs text-gray-500 line-through">${product.discount_price}</span>
                      )}
                    </div>

                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-1.5 mt-auto">
                        {product.colors.map((color, i) => (
                          <span
                            key={i}
                            title={color}
                            className="w-3.5 h-3.5 rounded-full border border-gray-600"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Pagination />
            </>
          )}
        </main>
      </div>
    </div>
  );
}