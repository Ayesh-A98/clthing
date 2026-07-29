import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

// Mock category data tailored for a luxury apparel brand
const initialCategories = [
  {
    id: 1,
    name: 'Outerwear & Coats',
    slug: 'outerwear-coats',
    itemCount: 142,
    subcategories: ['Trench Coats', 'Tailored Blazers', 'Wool Overcoats', 'Leather Jackets'],
    revenue: '$148,200',
    status: 'Active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Knitwear & Sweaters',
    slug: 'knitwear-sweaters',
    itemCount: 98,
    subcategories: ['Cashmere Crewnecks', 'Cardigans', 'Turtlenecks'],
    revenue: '$92,400',
    status: 'Active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Tailored Trousers',
    slug: 'tailored-trousers',
    itemCount: 76,
    subcategories: ['Wide-Leg Pants', 'Pleated Trousers', 'Chinos'],
    revenue: '$64,100',
    status: 'Active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    name: 'Silk & Tops',
    slug: 'silk-tops',
    itemCount: 112,
    subcategories: ['Silk Blouses', 'Sparse Shirts', 'Camisoles'],
    revenue: '$88,900',
    status: 'Active',
    featured: true,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 5,
    name: 'Footwear & Boots',
    slug: 'footwear-boots',
    itemCount: 54,
    subcategories: ['Leather Loafers', 'Ankle Boots', 'Derby Shoes'],
    revenue: '$110,500',
    status: 'Active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 6,
    name: 'Resort & Swimwear',
    slug: 'resort-swimwear',
    itemCount: 38,
    subcategories: ['Linen Coverups', 'One-Piece Swimsuits', 'Sarongs'],
    revenue: '$21,300',
    status: 'Draft',
    featured: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
  }
];

export default function CategoriesDashboard() {
  const [categories, setCategories] = useState(initialCategories);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-[#111111] p-4 sm:p-6 md:p-8 font-sans">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Catalog Architecture</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#111111]">Product Categories</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all shadow-sm">
            <Plus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* 2. CONTROLS BAR (SEARCH, FILTERS, VIEW TOGGLE) */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories or subcategories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#111111] transition-colors"
          />
        </div>

        {/* View Switches & Filters */}
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

      {/* 3. CATEGORIES CONTENT (GRID VIEW) */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div 
              key={cat.id} 
              className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all group"
            >
              {/* Category Banner Image */}
              <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                    cat.status === 'Active' ? 'bg-white/90 text-[#111111]' : 'bg-amber-100/90 text-amber-800'
                  }`}>
                    {cat.status}
                  </span>
                  {cat.featured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37] text-white flex items-center gap-1">
                      <Sparkles size={10} /> Featured
                    </span>
                  )}
                </div>

                {/* Quick Action Button */}
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

                {/* Subcategories Tags */}
                <div className="my-4">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-2">Subcategories</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub, i) => (
                      <span key={i} className="text-[11px] text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Info & Actions */}
                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 font-medium block">Revenue Generated</span>
                    <span className="text-sm font-semibold text-[#111111]">{cat.revenue}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#111111] hover:bg-gray-50 rounded-lg transition-colors">
                      <Eye size={15} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#111111] hover:bg-gray-50 rounded-lg transition-colors">
                      <Edit3 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 4. CATEGORIES CONTENT (LIST VIEW) */
        <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-[#F9F8F6] text-[11px] uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 font-medium">Category</th>
                <th className="py-3.5 px-4 font-medium">Subcategories</th>
                <th className="py-3.5 px-4 font-medium">Items</th>
                <th className="py-3.5 px-4 font-medium">Revenue</th>
                <th className="py-3.5 px-4 font-medium">Status</th>
                <th className="py-3.5 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-[#F9F8F6]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-serif font-medium text-sm text-[#111111]">{cat.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">/{cat.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">
                    {cat.subcategories.join(', ')}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#111111]">
                    {cat.itemCount}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#111111]">
                    {cat.revenue}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      cat.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-[#111111] rounded-md transition-colors">
                        <Edit3 size={15} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 rounded-md transition-colors">
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
    </div>
  );
}