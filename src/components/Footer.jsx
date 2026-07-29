import React from 'react';
// import { Instagram, Facebook, Pinterest, Tiktok } from 'lucide-react'; // If using lucide-react

export default function Footer() {
  return (
    <footer className="bg-[#0b101d] text-slate-400 border-t border-slate-800/60 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column (Spans 2 columns on desktop) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛍️</span>
              <span className="text-xl font-extrabold text-white tracking-wide border-b-2 border-amber-400 pb-0.5">
                LUXE
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Discover curated collections of premium fashion, accessories, and lifestyle products.
            </p>

            {/* Social Icons */}
            {/* <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition-colors p-1" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors p-1" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors p-1" aria-label="Pinterest">
                <Pinterest size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors p-1" aria-label="TikTok">
                <Tiktok size={20} />
              </a>
            </div> */}
          </div>

          {/* Column 1: Shop */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Clothing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Footwear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bags</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jewelry</a></li>
              <li><a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Column 2: Help */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Help</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">About</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <p>© 2026 Luxe. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>

            {/* Payment Badge Icons */}
            <div className="flex items-center gap-2">
              {/* VISA */}
              <span className="bg-[#1423dc] text-white font-bold italic text-xs px-2 py-1 rounded tracking-widest">
                VISA
              </span>

              {/* Mastercard */}
              <span className="bg-white px-2 py-1 rounded flex items-center justify-center">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block"></span>
                <span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block -ml-1"></span>
              </span>

              {/* AMEX */}
              <span className="bg-[#006fcf] text-white font-bold text-xs px-2 py-1 rounded">
                AMEX
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}