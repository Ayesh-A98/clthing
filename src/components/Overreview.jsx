import React, { useState, useEffect, useMemo } from 'react';
import { Bell, ShoppingBag, Layers, Star, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getAllProducts } from '../API/products';
import axiosInstance from '../API/axiosInstance';

const LOW_STOCK_THRESHOLD = 10;

// Inlined here instead of a separate api/categories.js file
const getAllCategories = async (params = {}) => {
  const response = await axiosInstance.get('/categories', { params });
  return {
    categories: response.data.data,
    meta: response.data.meta,
  };
};

export default function FashionDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getAllProducts({ limit: 200 }), 
      getAllCategories(),
    ])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.products || []);
        setCategories(categoriesRes.categories || []);
      })
      .catch((err) => {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load dashboard data.');
      })
      .finally(() => setLoading(false));
  }, []);

  // ---- Derived metrics (all computed from real product/category data) ----

  const metrics = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const featuredCount = products.filter((p) => p.is_featured).length;
    const lowStockCount = products.filter((p) => p.stock < LOW_STOCK_THRESHOLD).length;

    return [
      { title: 'Total Products', value: totalProducts, icon: ShoppingBag },
      { title: 'Categories', value: totalCategories, icon: Layers },
      { title: 'Featured Items', value: featuredCount, icon: Star },
      { title: 'Low Stock (<' + LOW_STOCK_THRESHOLD + ')', value: lowStockCount, icon: AlertTriangle },
    ];
  }, [products, categories]);

  // Group products by category, counting products + price range per category
  const categoryBreakdown = useMemo(() => {
    const map = new Map();

    products.forEach((product) => {
      const cats = product.product_categories || [];
      cats.forEach((pc) => {
        const cat = pc.categories;
        if (!cat) return;
        const key = cat.id;
        if (!map.has(key)) {
          map.set(key, { name: cat.name, count: 0, minPrice: Infinity, maxPrice: 0 });
        }
        const entry = map.get(key);
        entry.count += 1;
        entry.minPrice = Math.min(entry.minPrice, product.price);
        entry.maxPrice = Math.max(entry.maxPrice, product.price);
      });
    });

    return Array.from(map.values())
      .map((c) => ({
        ...c,
        minPrice: c.minPrice === Infinity ? 0 : c.minPrice,
      }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const chartData = categoryBreakdown.map((c) => ({ name: c.name, products: c.count }));

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-[#111111] p-4 sm:p-6 md:p-8 font-sans">

    
    

      {/* Loading / Error states */}
      {loading && <p className="text-gray-500 mb-6">Loading dashboard...</p>}
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!loading && !error && (
        <>
          {/* 2. KEY METRICS (real data) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
            {metrics.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-medium tracking-wider uppercase text-gray-400">{card.title}</span>
                    <div className="p-2 bg-[#F9F8F6] rounded-lg text-[#111111]">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-serif font-medium text-[#111111]">{card.value}</p>
                </div>
              );
            })}
          </div>

          {/* 3. LOWER ANALYTICS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Products per Category chart */}
            <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-serif font-medium text-[#111111]">Products by Category</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Live count from your catalog</p>
                </div>
                <span className="text-xs font-medium uppercase tracking-wider bg-[#F9F8F6] px-3 py-1.5 rounded-full border border-gray-200">
                  {categoryBreakdown.length} categories
                </span>
              </div>

              <div className="h-[260px] sm:h-[300px] w-full text-xs">
                {chartData.length === 0 ? (
                  <p className="text-gray-400 text-sm">No category data available.</p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#888888', fontSize: 11 }}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#888888', fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111111',
                          borderRadius: '8px',
                          color: '#FFF',
                          border: 'none',
                          fontSize: '12px'
                        }}
                        itemStyle={{ color: '#D4AF37' }}
                        formatter={(value) => [value, 'Products']}
                      />
                      <Bar dataKey="products" fill="#111111" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Top Categories by product count */}
            <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-medium text-[#111111]">Top Categories</h3>
                <span className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">View All</span>
              </div>

              <div className="flex flex-col gap-4">
                {categoryBreakdown.length === 0 && (
                  <p className="text-sm text-gray-400">No categories found.</p>
                )}
                {categoryBreakdown.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F9F8F6] transition-colors border border-transparent hover:border-gray-200/60">
                    <div className="flex flex-col pr-2">
                      <span className="text-sm font-medium text-[#111111]">{item.name}</span>
                      <span className="text-xs text-gray-400 mt-0.5">{item.count} products</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#111111] block">
                        ${item.minPrice} – ${item.maxPrice}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] mt-0.5 inline-block">
                        Price Range
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}