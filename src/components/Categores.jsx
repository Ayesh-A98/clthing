import React from 'react';
import { Link } from 'react-router-dom'

const categories = [
  {
    id: 1,
    title: 'Clothing',
    count: '124 Products',
    image: '/photo-1638247025967-b4e38f787b76.jpg',
    gridSpan: 'lg:row-span-2 h-[280px] sm:h-[300px] lg:h-auto',
    showShopNow: false,
    path: '/jel',
  },
  {
    id: 2,
    title: 'Accessories',
    count: '86 Products',
    image: '/photo-1606760227091-3dd870d97f1d.jpg',
    gridSpan: 'h-[240px] sm:h-[260px] lg:h-[230px]',
    showShopNow: true,
    path: '/jel',
  },
  {
    id: 3,
    title: 'Footwear',
    count: '52 Products',
    image: '/photo-1594938298603-c8148c4dae35.jpg',
    gridSpan: 'h-[240px] sm:h-[260px] lg:h-[230px]',
    showShopNow: false,
    path: '/jel',
  },
  {
    id: 4,
    title: 'Bags',
    count: '38 Products',
    image: '/redwatch.jpg',
    gridSpan: 'h-[240px] sm:h-[260px] lg:h-[230px]',
    showShopNow: true,
    path: '/jel',
  },
  {
    id: 5,
    title: 'Jewelry',
    count: '64 Products',
    image: '/photo-1591047139829-d91aecb6caea.jpg',
    gridSpan: 'h-[240px] sm:h-[260px] lg:h-[230px]',
    showShopNow: false,
    path: '/jel',
  },
  {
    id: 6,
    title: 'Watches',
    count: '28 Products',
    image: '/photo-1591047139829-d91aecb6caea.jpg',
    gridSpan: 'h-[240px] sm:h-[260px] lg:h-[230px]',
    showShopNow: false,
    path: '/jel',
  },
]

export default function ShopByCategory() {
  return (
    <section className="bg-[#0b101d] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3">
            Shop by Category
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
            Explore our curated collections and find exactly what you're looking for
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {categories.map((category) => (
            <Link
              to={category.path}
              key={category.id}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-lg transition-transform duration-300 hover:scale-[1.01] ${category.gridSpan}`}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col items-start justify-end">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">
                  {category.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal">
                  {category.count}
                </p>

                {/* Conditional "Shop Now" Link */}
                {category.showShopNow && (
                  <span className="mt-2 sm:mt-3 inline-flex items-center text-xs sm:text-sm font-medium text-white hover:underline transition-all">
                    Shop Now
                    <span className="ml-1.5 transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}