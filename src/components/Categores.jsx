import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../API/categories';

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="text-white text-center py-12">Loading categories...</p>;

  return (
    <section className="bg-[#0b101d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
            Shop by Category
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            Explore our curated collections and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
         {categories.map((category) => (
  <Link
    to={"/category/" + category.id}
    state={{ categoryId: category.id, categoryName: category.name }}
    key={category.id}
    className="relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.01] h-[240px] sm:h-[260px] lg:h-[230px]"
  >
    <img
      src={category.image || '/photo-1638247025967-b4e38f787b76.jpg'}
      alt={category.name}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-start justify-end">
      <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
        {category.name}
      </h3>
      {category.description && (
        <p className="text-xs sm:text-sm text-slate-300 font-normal">
          {category.description}
        </p>
      )}
    </div>
  </Link>
))}
        </div>
      </div>
    </section>
  );
}