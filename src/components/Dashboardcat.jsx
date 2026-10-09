import React, { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Grid,
  List,
  Layers,
} from 'lucide-react';
import axiosInstance from '../API/axiosInstance';
import { getAllProducts } from '../API/products';


export default function CategoriesDashboard() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
// Add Category Modal
const [showAddModal, setShowAddModal] = useState(false);

const [addForm, setAddForm] = useState({
  name: "",
  description: "",
  image: "",
  isActive: true,
});

const [adding, setAdding] = useState(false);
const [addError, setAddError] = useState(null);
  // Edit modal state
  const [editingCategory, setEditingCategory] = useState(null); // holds the category being edited, or null when closed
  const [editForm, setEditForm] = useState({ name: '', description: '', image: '', isActive: true });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    Promise.all([
      axiosInstance.get('/categories'),
      getAllProducts({ limit: 200 }), // needed to compute real item counts per category
    ])
      .then(([categoriesRes, productsRes]) => {
        setCategories(categoriesRes.data.data || []);
        setProducts(productsRes.products || []);
      })
      .catch((err) => {
        console.error('Failed to load categories:', err);
        setError('Failed to load categories.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Real item count + price range per category, computed from live products
  const categoryStats = useMemo(() => {
    const map = new Map();

    products.forEach((product) => {
      (product.product_categories || []).forEach((pc) => {
        const cat = pc.categories;
        if (!cat) return;
        if (!map.has(cat.id)) {
          map.set(cat.id, { itemCount: 0, minPrice: Infinity, maxPrice: 0 });
        }
        const entry = map.get(cat.id);
        entry.itemCount += 1;
        entry.minPrice = Math.min(entry.minPrice, product.price);
        entry.maxPrice = Math.max(entry.maxPrice, product.price);
      });
    });

    return map;
  }, [products]);

  const enrichedCategories = useMemo(() => {
    return categories.map((cat) => {
      const stats = categoryStats.get(cat.id) || { itemCount: 0, minPrice: 0, maxPrice: 0 };
      return {
        ...cat,
        itemCount: stats.itemCount,
        minPrice: stats.minPrice === Infinity ? 0 : stats.minPrice,
        maxPrice: stats.maxPrice,
      };
    });
  }, [categories, categoryStats]);

  const filteredCategories = enrichedCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;

    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      // API returns 409 if the category is still attached to existing products
      if (err.response?.status === 409) {
        alert(`Can't delete "${name}" — it's still assigned to existing products.`);
      } else if (err.response?.status === 403) {
        alert('You need admin access to delete categories.');
      } else {
        alert('Failed to delete category.');
      }
      console.error('Delete category failed:', err);
    }
  };
  const handleAddCategory = async (e) => {
  e.preventDefault();

  setAdding(true);
  setAddError(null);

  try {
    const response = await axiosInstance.post("/categories", {
      name: addForm.name,
      description: addForm.description,
      image: addForm.image,
      isActive: addForm.isActive,
    });

    const newCategory = response.data.data;

    setCategories((prev) => [...prev, newCategory]);

    setShowAddModal(false);

    setAddForm({
      name: "",
      description: "",
      image: "",
      isActive: true,
    });
  } catch (err) {
    console.log(err);

    setAddError(
      err.response?.data?.message || "Failed to create category."
    );
  } finally {
    setAdding(false);
  }
};

  // Opens the edit modal, pre-filling the form with this category's current data
  const openEditModal = (cat) => {
    setSaveError(null);
    setEditingCategory(cat);
    setEditForm({
      name: cat.name || '',
      description: cat.description || '',
      image: cat.image || '',
      isActive: cat.is_active,
    });
  };

  const closeEditModal = () => {
    setEditingCategory(null);
    setSaveError(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingCategory) return;

    setSaving(true);
    setSaveError(null);

    try {
      const response = await axiosInstance.put(`/categories/${editingCategory.id}`, {
        name: editForm.name,
        description: editForm.description,
        image: editForm.image,
        isActive: editForm.isActive,
      });

      const updated = response.data.data;

      // Merge the server's response into local state so the card/table reflects it immediately
      setCategories((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? { ...c, ...updated } : c))
      );

      closeEditModal();
    } catch (err) {
      console.error('Update category failed:', err);
      if (err.response?.status === 403) {
        setSaveError('You need admin access to edit categories.');
      } else if (err.response?.status === 400) {
        setSaveError(err.response?.data?.message || 'Validation error.');
      } else if (err.response?.status === 404) {
        setSaveError('Category not found — it may have been deleted.');
      } else {
        setSaveError('Failed to update category.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-[#111111] p-4 sm:p-6 md:p-8 font-sans">

      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Catalog Architecture</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#111111]">Product Categories</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
  onClick={() => {
    setAddError(null);
    setShowAddModal(true);
  }}
  className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all shadow-sm"
>
  <Plus size={16} />
  <span>Add Category</span>
</button>
        </div>
      </div>

      {/* 2. CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#111111] transition-colors"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs text-gray-600 hover:text-[#111111] hover:border-gray-300 transition-all">
            <Filter size={14} />
            <span>Filter</span>
          </button>

          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-[#111111] text-white' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-[#111111] text-white' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading / Error / Empty states */}
      {loading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredCategories.length === 0 && (
        <p className="text-gray-500">No categories found.</p>
      )}

      {/* 3. GRID VIEW */}
      {!loading && !error && filteredCategories.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all group"
            >
              {/* Category Banner Image */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <Layers size={32} className="text-gray-300" />
                )}
                <div className="absolute inset-0 bg-black/20" />

                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                    cat.is_active ? 'bg-white/90 text-[#111111]' : 'bg-amber-100/90 text-amber-800'
                  }`}>
                    {cat.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white text-gray-700 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100">
                  <MoreVertical size={16} />
                </button>
              </div>

              {/* Category Details */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-serif font-medium text-[#111111]">{cat.name}</h3>
                    <p className="text-[11px] text-gray-400 font-mono">/{cat.slug}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#111111] bg-[#F9F8F6] px-2.5 py-1 rounded-md border border-gray-200/60">
                    {cat.itemCount} Items
                  </span>
                </div>

                {cat.description && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{cat.description}</p>
                )}

                {/* Footer Info & Actions */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  {/* <div>
                    <span className="text-[10px] uppercase text-gray-400 font-medium block">Price Range</span>
                    <span className="text-sm font-semibold text-[#111111]">
                      {cat.itemCount > 0 ? `$${cat.minPrice} – $${cat.maxPrice}` : '—'}
                    </span>
                  </div> */}

                  <div className="flex items-center gap-2">
                    {/* <button className="p-2 text-gray-400 hover:text-[#111111] hover:bg-gray-50 rounded-lg transition-colors">
                      <Eye size={15} />
                    </button> */}
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-2 text-gray-400 hover:text-[#111111] hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id, cat.name)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. LIST VIEW */}
      {!loading && !error && filteredCategories.length > 0 && viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F9F8F6] text-[11px] uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 font-medium">Category</th>
                <th className="py-3.5 px-4 font-medium">Items</th>
                <th className="py-3.5 px-4 font-medium">Price Range</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#F9F8F6]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                        ) : (
                          <Layers size={16} className="text-gray-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-serif font-medium text-sm text-[#111111]">{cat.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">/{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#111111]">
                    {cat.itemCount}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#111111]">
                    {cat.itemCount > 0 ? `$${cat.minPrice} – $${cat.maxPrice}` : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      cat.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {cat.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-gray-400 hover:text-[#111111] rounded-md transition-colors"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-md transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeEditModal} />

          <form
            onSubmit={handleEditSubmit}
            className="relative bg-white rounded-xl border border-gray-100 shadow-xl w-full max-w-md p-6"
          >
            <h2 className="text-lg font-serif font-medium text-[#111111] mb-4">
              Edit "{editingCategory.name}"
            </h2>

            {saveError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
                {saveError}
              </p>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#111111] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#111111] transition-colors"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editForm.isActive}
                  onChange={(e) => setEditForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="w-4 h-4 accent-[#111111]"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 py-2 text-xs font-medium uppercase tracking-wide text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-xs font-medium uppercase tracking-wide rounded-lg transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}
      {showAddModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setShowAddModal(false)}
    />

    <form
      onSubmit={handleAddCategory}
      className="relative bg-white rounded-xl p-6 w-full max-w-md shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-5">
        Add New Category
      </h2>

      {addError && (
        <p className="text-red-600 text-sm mb-4">
          {addError}
        </p>
      )}

      <div className="space-y-4">

        <div>
          <label className="block text-sm mb-1">
            Category Name *
          </label>

          <input
            type="text"
            required
            value={addForm.name}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Description
          </label>

          <textarea
            rows="3"
            value={addForm.description}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                description: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">
            Image URL
          </label>

          <input
            type="text"
            value={addForm.image}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                image: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={addForm.isActive}
            onChange={(e) =>
              setAddForm({
                ...addForm,
                isActive: e.target.checked,
              })
            }
          />

          Active
        </label>

      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={() => setShowAddModal(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={adding}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          {adding ? "Creating..." : "Create Category"}
        </button>
      </div>
    </form>
  </div>
)}
    </div>
  );
}