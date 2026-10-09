import React, { useState, useEffect, useMemo } from "react";
import axiosInstance from "../API/axiosInstance";
import {
  Plus, Search, Filter, MoreVertical,
  ArrowUpDown, Package, DollarSign, AlertTriangle, CheckCircle2
} from "lucide-react";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Load categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Re-fetch products whenever the selected category changes
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      // Adjust this based on your API response shape
      setCategories(response.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load categories");
    }
  };

  const fetchProducts = async (category = "All") => {
    try {
      setLoading(true);
      // Only send the category param when a specific category is selected
      const params = category !== "All" ? { category } : {};
      const response = await axiosInstance.get("/products", { params });
      // Adjust this based on your API response shape
      setProducts(response.data.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Adds a new product via the API and appends it to local state
  const addProduct = async (newProduct) => {
    try {
      const response = await axiosInstance.post("/products", newProduct);
      setProducts((prev) => [...prev, response.data.data]);
    } catch (err) {
      console.log(err);
      setError("Failed to add product");
    }
  };

  // Updates an existing product via the API and syncs local state
  const updateProduct = async (id, updates) => {
    try {
      const response = await axiosInstance.put(`/products/${id}`, updates);
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? response.data.data : product
        )
      );
    } catch (err) {
      console.log(err);
      setError("Failed to update product");
    }
  };

  // Simple placeholder trigger for "Add Product" — swap for a real modal/form
  const handleAddProductClick = () => {
    const name = window.prompt("Product name?");
    if (!name) return;
    const sku = window.prompt("SKU?") || "";
    const category_id = window.prompt("Category ID?") || "";
    const price = parseFloat(window.prompt("Price?") || "0");
    const stock = parseInt(window.prompt("Stock?") || "0", 10);

    addProduct({ name, sku, category_id, price, stock });
  };

  // Category filtering now happens via the API (see fetchProducts), so this
  // only needs to handle the search box on top of whatever the API returned.
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Stats derived from real product data
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalRevenue = products.reduce((sum, p) => sum + p.price * p.sales, 0);
    const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
    const activeListings = products.filter((p) => p.status !== "Out of Stock").length;
    const inStockPct = totalProducts > 0 ? (activeListings / totalProducts) * 100 : 0;

    return {
      totalProducts,
      totalRevenue,
      lowStockCount,
      activeListings,
      inStockPct,
    };
  }, [products]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
            <p className="text-sm text-slate-500">Manage catalog, inventory levels, and performance.</p>
          </div>
          <button
            onClick={handleAddProductClick}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors text-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Products"
            value={stats.totalProducts.toLocaleString()}
            icon={<Package className="text-indigo-600 w-5 h-5" />}
            change={`${filteredProducts.length} matching current filters`}
          />
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            icon={<DollarSign className="text-emerald-600 w-5 h-5" />}
            change="Based on units sold × price"
          />
          <StatCard
            title="Low Stock Items"
            value={String(stats.lowStockCount)}
            icon={<AlertTriangle className="text-amber-500 w-5 h-5" />}
            change={stats.lowStockCount > 0 ? "Requires attention" : "All good"}
            warning={stats.lowStockCount > 0}
          />
          <StatCard
            title="Active Listings"
            value={String(stats.activeListings)}
            icon={<CheckCircle2 className="text-blue-600 w-5 h-5" />}
            change={`${stats.inStockPct.toFixed(1)}% in stock`}
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-200 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                  <th className="p-4">Product</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">
                    <span className="flex items-center gap-1 cursor-pointer hover:text-slate-800">
                      Price <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="p-4">Stock</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No products match your search.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{product.name}</td>
                      <td className="p-4 text-slate-500 font-mono text-xs">{product.sku}</td>
                      <td className="p-4 text-slate-600">{product.category}</td>
                      <td className="p-4 font-semibold text-slate-900">${product.price.toFixed(2)}</td>
                      <td className="p-4 text-slate-600">{product.stock} units</td>
                      <td className="p-4">
                        <Badge status={product.status} />
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 cursor-pointer">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, icon, change, warning }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className={`text-xs ${warning ? "text-amber-600 font-medium" : "text-slate-500"}`}>{change}</div>
    </div>
  );
}

function Badge({ status }) {
  const styles = {
    "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
    "Out of Stock": "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
}