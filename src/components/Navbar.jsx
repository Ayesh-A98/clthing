import React, { useState, useContext } from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { HiMenu, HiX } from "react-icons/hi";
import { LogIn, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom'
import { CartContext } from '../components/Cartcontext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
const { cart, cartCount, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useContext(CartContext)
  const navLinks = [
    { name: 'Shop', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'New Arrival', path: '/shop' },
    { name: 'Sale', path: '/shop' },
    { name: 'About', path: '/about' },
  ]

  return (
    <nav className='sticky top-0 z-50 flex items-center justify-between bg-black h-[70px] md:h-[90px] w-full text-white px-4 sm:px-6 md:px-10'>

      <div className='text-xl font-bold shrink-0'>
        <img className='h-[45px] w-auto md:h-[70px] md:w-[150px]' src='/logo-light.svg' alt='logo' />
      </div>

      <ul className='hidden lg:flex items-center gap-8 xl:gap-14'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className='cursor-pointer hover:text-[#E879F9] transition-colors whitespace-nowrap'
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className='hidden lg:flex items-center gap-3 text-xl'>
      
        <button className='hover:text-[#E879F9] transition-colors hover:bg-gray-600 h-[40px] w-[40px] flex items-center justify-center rounded-[10px]'>
          <FaRegUser />
        </button>
        <button
          onClick={() => setCartOpen(true)}
          aria-label="Open cart"
          className='relative hover:text-[#E879F9] transition-colors hover:bg-gray-600 h-[40px] w-[40px] flex items-center justify-center rounded-[10px]'
        >
          <FaBagShopping />
          {cartCount > 0 && (
            <span className='absolute -top-1.5 -right-1.5 bg-[#E879F9] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center'>
              {cartCount}
            </span>
          )}
        </button>
          <Link to="/dashboard"><button className="h-[42px] relative left-6 mx- flex items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-[#00633E] transition-all duration-300 hover:bg-[#F8BE00]">
            <LogIn className="h-4 w-4" />
           Dashboard
          </button></Link>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setCartOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#0b0f19] border-l border-gray-800 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Your Cart ({cartCount})</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-800 text-white"
                aria-label="Close cart"
              >
                <HiX className="w-5 h-5" />
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
                                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
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
      

      <button
        className='lg:hidden text-2xl'
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-black flex flex-col items-start px-6 py-6 gap-5 lg:hidden border-t border-white/10'>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className='cursor-pointer hover:text-[#E879F9] transition-colors text-lg'
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className='flex items-center gap-3 text-xl pt-4 border-t border-white/10 w-full'>
            <button className='hover:text-[#E879F9] transition-colors hover:bg-gray-600 h-[40px] w-[40px] flex items-center justify-center rounded-[10px]'>
              <IoMdSearch />
            </button>
           
            <button className='hover:text-[#E879F9] transition-colors hover:bg-gray-600 h-[40px] w-[40px] flex items-center justify-center rounded-[10px]'>
              <FaRegUser />
            </button>
            <button
              onClick={() => {
                setCartOpen(true)
                setMenuOpen(false)
              }}
              aria-label="Open cart"
              className='relative hover:text-[#E879F9] transition-colors hover:bg-gray-600 h-[40px] w-[40px] flex items-center justify-center rounded-[10px]'
            >
              <FaBagShopping />
              {cartCount > 0 && (
                <span className='absolute -top-1.5 -right-1.5 bg-[#E879F9] text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center'>
                  {cartCount}
                </span>
              )}
            </button>
         
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar