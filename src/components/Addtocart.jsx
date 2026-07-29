import React, { useContext } from 'react'
import { FaStar, FaShoppingBag, FaRegHeart } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa6"
import { CartContext } from '../components/Cartcontext'
import { Link } from 'react-router-dom'

const products = [
  {
    image: '/photo-1549298916-b41d501d3772.jpg',
    badges: [{ text: '-25%', color: 'bg-red-500' }, { text: 'Bestseller', color: 'bg-orange-500' }],
    category: 'Clothing',
    title: 'Minimal Leather Jacket',
    rating: 4.8,
    price: 299,
    oldPrice: 399,
    colors: ['#000000', '#8B5A2B', '#D2B48C'],
  },
  {
    image: '/photo-1591047139829-d91aecb6caea.jpg',
    badges: [{ text: 'New', color: 'bg-green-500' }],
    category: 'Clothing',
    title: 'Cashmere Crewneck Sweater',
    rating: 4.9,
    price: 189,
    oldPrice: null,
    colors: ['#F5E6C8', '#3B5C8C', '#B0B0B0', '#E8A0B0'],
  },
  {
    image: '/photo-1572635196237-14b3f281503f.jpg',
    badges: [],
    category: 'Accessories',
    title: 'Aviator Sunglasses',
    rating: 4.7,
    price: 145,
    oldPrice: null,
    colors: ['#D4AF37', '#B0B0B0', '#E8A0B0'],
  },
  {
    image: '/photo-1548036328-c9fa89d128fa.jpg',
    badges: [{ text: 'New', color: 'bg-green-500' }, { text: 'Bestseller', color: 'bg-orange-500' }],
    category: 'Footwear',
    title: 'Minimalist Leather Sneakers',
    rating: 4.8,
    price: 165,
    oldPrice: null,
    colors: ['#FFFFFF', '#000000', '#2C4A6B'],
  },
   {
    image: '/photo-1599643478518-a784e5dc4c8f.jpg',
    badges: [{ text: '-25%', color: 'bg-red-500' }, { text: 'Bestseller', color: 'bg-orange-500' }],
    category: 'Clothing',
    title: 'Minimal Leather Jacket',
    rating: 4.8,
    price: 299,
    oldPrice: 399,
    colors: ['#000000', '#8B5A2B', '#D2B48C'],
  },
  {
    image: '/photo-1638247025967-b4e38f787b76.jpg',
    badges: [{ text: 'New', color: 'bg-green-500' }],
    category: 'Clothing',
    title: 'Cashmere Crewneck Sweater',
    rating: 4.9,
    price: 189,
    oldPrice: null,
    colors: ['#F5E6C8', '#3B5C8C', '#B0B0B0', '#E8A0B0'],
  },
  {
    image: '/photo-1524592094714-0f0654e20314.jpg',
    badges: [],
    category: 'Accessories',
    title: 'Aviator Sunglasses',
    rating: 4.7,
    price: 145,
    oldPrice: null,
    colors: ['#D4AF37', '#B0B0B0', '#E8A0B0'],
  },
  {
    image: '/photo-1523275335684-37898b6baf30.jpg',
    badges: [{ text: 'New', color: 'bg-green-500' }, { text: 'Bestseller', color: 'bg-orange-500' }],
    category: 'Footwear',
    title: 'Minimalist Leather Sneakers',
    rating: 4.8,
    price: 165,
    oldPrice: null,
    colors: ['#FFFFFF', '#000000', '#2C4A6B'],
  },
]

const FeaturedProducts = () => {
  const { addToCart } = useContext(CartContext)

  return (
    <section className='bg-[#0a0a12] px-6 sm:px-10 md:px-16 py-16'>

      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4'>
        <div>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-2'>Featured Products</h2>
          <p className='text-gray-400'>Discover our handpicked selection of trending items</p>
        </div>
        <Link to="/shop"><button className='flex items-center gap-2 text-fuchsia-500 hover:text-fuchsia-400 font-semibold transition-colors shrink-0'>
          View All Products <FaArrowRight /></button>
        </Link>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product, index) => (
          <div key={index} className='group relative bg-[#121218]   rounded-xl overflow-hidden border border-white/5'>

            {/* Image + badges + hover overlay */}
            <div className='relative aspect-square bg-amber-500 overflow-hidden'>
              <img
                src={product.image}
                alt={product.title}
                className='w-full h-full object-cover h-[400px] group-hover:scale-105 transition-transform duration-300'
              />

              {/* Badges */}
              <div className='absolute top-3 left-3 flex flex-col gap-2'>
                {product.badges.map((badge, i) => (
                  <span key={i} className={`${badge.color} text-white text-xs font-semibold px-3 py-1 rounded-full w-fit`}>
                    {badge.text}
                  </span>
                ))}
              </div>

              {/* Hover overlay - Add to Cart + wishlist */}
              <div className='absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <button
                  onClick={() => addToCart({ id: index, ...product })}
                  className='flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-200 transition-colors text-black font-semibold text-sm px-4 py-2.5 rounded-lg'
                >
                  <FaShoppingBag /> Add to Cart
                </button>
                <button className='bg-white hover:bg-gray-200 transition-colors text-black h-10 w-10 flex items-center justify-center rounded-lg shrink-0'>
                  <FaRegHeart />
                </button>
              </div>
            </div>

            {/* Details */}
            <div className='p-4'>
              <div className='flex items-center justify-between mb-1'>
                <span className='text-gray-400 text-sm'>{product.category}</span>
                <span className='flex items-center gap-1 text-white text-sm'>
                  <FaStar className='text-yellow-400 text-xs' /> {product.rating}
                </span>
              </div>

              <h3 className='text-white font-semibold mb-2'>{product.title}</h3>

              <div className='flex items-center gap-2 mb-3'>
                <span className='text-white font-bold text-lg'>${product.price}</span>
                {product.oldPrice && (
                  <span className='text-gray-500 line-through text-sm'>${product.oldPrice}</span>
                )}
              </div>

              <div className='flex items-center gap-2'>
                {product.colors.map((color, i) => (
                  <span
                    key={i}
                    className='h-4 w-4 rounded-full border border-white/20'
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}

export default FeaturedProducts