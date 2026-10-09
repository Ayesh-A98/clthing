import React, { useContext, useState, useEffect } from 'react'
import { FaStar, FaShoppingBag, FaRegHeart } from "react-icons/fa"
import { FaArrowRight } from "react-icons/fa6"
import { CartContext } from '../components/Cartcontext'
import { useAuth } from '../components/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { getProductsByCategory } from '../API/products'

const WINTER_CATEGORY_ID = "0ce23a35-b36d-4c68-9884-3d7d2dc24446"

const FeaturedProducts = () => {
  const { addToCart } = useContext(CartContext)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    getProductsByCategory(WINTER_CATEGORY_ID)
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Failed to load featured products:", err)
        setError("Failed to load products.")
      })
      .finally(() => setLoading(false))
  }, [])

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

      {/* Loading / Error states */}
      {loading && <p className='text-gray-400'>Loading products...</p>}
      {error && <p className='text-red-400'>{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p className='text-gray-400'>No products found.</p>
      )}

      {/* Grid */}
      {!loading && !error && products.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <div key={product.id} className='group relative bg-[#121218]   rounded-xl overflow-hidden border border-white/5'>

              {/* Image + badges + hover overlay */}
              <div className='relative aspect-square bg-amber-500 overflow-hidden'>
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className='w-full h-full object-cover h-[400px] group-hover:scale-105 transition-transform duration-300'
                />

                {/* Badges */}
                <div className='absolute top-3 left-3 flex flex-col gap-2'>
                  {product.is_featured && (
                    <span className='bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit'>
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Hover overlay - Add to Cart + wishlist */}
                <div className='absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <button
                    onClick={() => {
                      if (!isAuthenticated) return navigate('/login')
                      addToCart(product)
                    }}
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
                  <span className='text-gray-400 text-sm'>{product.gender}</span>
                  {product.ratings_average > 0 && (
                    <span className='flex items-center gap-1 text-white text-sm'>
                      <FaStar className='text-yellow-400 text-xs' /> {product.ratings_average}
                    </span>
                  )}
                </div>

                <h3 className='text-white font-semibold mb-2'>{product.name}</h3>

                <div className='flex items-center gap-2 mb-3'>
                  <span className='text-white font-bold text-lg'>${product.price}</span>
                  {product.discount_price && (
                    <span className='text-gray-500 line-through text-sm'>${product.discount_price}</span>
                  )}
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div className='flex items-center gap-2'>
                    {product.colors.map((color, i) => (
                      <span
                        key={i}
                        title={color}
                        className='h-4 w-4 rounded-full border border-white/20'
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  )
}

export default FeaturedProducts