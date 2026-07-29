import { Star } from 'lucide-react'
import { FaArrowRight, FaCheck, FaGift } from "react-icons/fa";
import React from 'react'
import { FaTruck, FaShieldAlt, FaSyncAlt, FaHeadset } from "react-icons/fa"
import FeaturedProducts from "../components/Addtocart"
import Categores from "../components/Categores"
import Testmodel from "../components/Testmodel"
import Footer from '../components/Footer';

const features = [
  {
    icon: <FaTruck />,
    title: 'Free Shipping',
    desc: 'Free shipping on all orders over $100. Express delivery available.'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Secure Payment',
    desc: 'Your payment information is processed securely with SSL encryption.'
  },
  {
    icon: <FaSyncAlt />,
    title: 'Easy Returns',
    desc: '30-day return policy. No questions asked, hassle-free returns.'
  },
  {
    icon: <FaHeadset />,
    title: '24/7 Support',
    desc: 'Our support team is available around the clock to assist you.'
  },
]
const Home = () => {
  return (
    <div>
    <section className='relative min-h-screen w-full overflow-hidden'>

      {/* Background image */}
      <img
        className='absolute inset-0 w-full h-full object-cover'
        src="/background.jpg"
        alt="background"
      />

      {/* Gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:to-transparent' />

      {/* Content */}
      <div className='relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-10 md:px-16 max-w-3xl pt-28 pb-72 sm:pb-56 md:pb-16'>

        {/* Badge */}
        <button className='flex items-center gap-2 w-fit bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6'>
          ✨ Spring/Summer 2032 Collection
        </button>

        {/* Heading */}
        <div className='flex flex-col leading-tight mb-4 sm:mb-6'>
          <span className='text-3xl sm:text-5xl md:text-7xl font-extrabold text-white'>Elevate Your</span>
          <span className='text-3xl sm:text-5xl md:text-7xl font-extrabold text-fuchsia-500'>Everyday Style</span>
        </div>

        {/* Paragraph */}
        <p className='text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8 max-w-xl'>
          Discover curated collections of premium fashion and lifestyle products. Timeless designs crafted for the modern individual.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12'>
          <button className='flex items-center justify-center gap-2 w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors text-white font-semibold px-6 py-3 rounded-lg'>
            Shop Collection <FaArrowRight />
          </button>
          <button className='w-full sm:w-auto bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-lg'>
            Browse Categories
          </button>
        </div>

        <hr className='border-white/20 mb-6 sm:mb-8' />

        {/* Stats */}
        <div className='flex flex-wrap items-center gap-6 sm:gap-10 text-white'>
          <div className='flex flex-col'>
            <span className='text-xl sm:text-2xl font-bold'>53k+</span>
            <span className='text-gray-400 text-xs sm:text-sm'>Happy Customers</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl sm:text-2xl font-bold flex items-center gap-1'>
              4.9 <Star className='w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400' />
            </span>
            <span className='text-gray-400 text-xs sm:text-sm'>Average Rating</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xl sm:text-2xl font-bold'>500+</span>
            <span className='text-gray-400 text-xs sm:text-sm'>Premium Products</span>
          </div>
        </div>

      </div>

      {/* Floating cards */}
      <div className='absolute bottom-4 left-0 right-0 z-10 flex flex-col sm:flex-row gap-3 px-6 sm:px-0 sm:bottom-6 sm:right-6 sm:left-auto'>

        <div className='w-full sm:w-[250px] flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-xl py-3 px-2'>
          <div className='bg-fuchsia-600 p-2 mx-2 rounded-full shrink-0'>
            <FaGift />
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm sm:text-base'>Free Shipping</span>
            <span className='text-gray-300 text-xs sm:text-sm'>On orders over $100</span>
          </div>
        </div>

        <div className='w-full sm:w-[250px] flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-xl py-3 px-2'>
          <div className='bg-fuchsia-600 mx-2 p-2 rounded-full shrink-0'>
            <FaCheck />
          </div>
          <div className='flex flex-col'>
            <span className='font-semibold text-sm sm:text-base'>Secure Checkout</span>
            <span className='text-gray-300 text-xs sm:text-sm'>100% protected payment</span>
          </div>
        </div>

      </div>

    </section>
     <section className='bg-[#0a0a12] px-6 sm:px-10 md:px-16 py-10 sm:py-12 border-b border-white/10'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10'>
        {features.map((item, index) => (
          <div key={index} className='flex items-start gap-4'>
            <div className='bg-fuchsia-950/60 text-fuchsia-500 h-12 w-12 flex items-center justify-center rounded-xl text-xl shrink-0'>
              {item.icon}
            </div>
            <div className='flex flex-col'>
              <h3 className='text-white font-semibold text-lg mb-1'>{item.title}</h3>
              <p className='text-gray-400 text-sm leading-relaxed'>{item.desc}</p>
            </div>
          </div>
            ))}
      </div>
    </section>
    <FeaturedProducts/>
    <Categores/>
    <Testmodel/>
    <Footer/>
    </div>
  )
}

export default Home