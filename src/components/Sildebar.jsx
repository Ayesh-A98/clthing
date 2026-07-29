import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Heart, Users, Landmark,
  Megaphone, ShieldCheck, UserCheck, FileText, Settings,
  Menu, X
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { key: 'overview', label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { key: 'categories', label: 'categories', path: '/dashboard/donations', icon: Heart },
    { key: 'product', label: 'product', path: '/dashboard/collections', icon: Users },
     { key: 'report', label: 'report', path: '/dashboard/report', icon: Users },
    
    { key: 'settings', label: 'setting', path: '/dashboard/setting', icon: Settings },
  ];

  return (
    <>
      {/* Mobile top bar with hamburger toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between  text-white px-4 py-3">
        <h1 className="text-lg font-bold tracking-wide">Clothing</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Backdrop overlay (mobile only, shown when drawer is open) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar / Drawer */}
      <aside
        className={
          "bg-gradient-to-t from-gray-500 to-black text-white min-h-screen flex flex-col py-6 px-4 " +
          "fixed top-0 left-0 z-50 w-[260px] sm:w-[280px] lg:w-[300px] " +
          "transform transition-transform duration-300 ease-in-out " +
          (isOpen ? "translate-x-0 " : "-translate-x-full ") +
          "lg:translate-x-0 lg:static"
        }
      >
        {/* Brand Title + mobile close button */}
        <div className="flex items-center justify-between px-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Dashboard</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 rounded-lg hover:bg-white/10 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={
                  "flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium text-base sm:text-lg lg:text-[20px] transition-all duration-200 " +
                  (isActive
                    ? "bg-white text-green-950 shadow-sm"
                    : "text-white/80 hover:bg-white/10 hover:text-white")
                }
              >
                <Icon className={"h-5 w-5 flex-shrink-0 " + (isActive ? "text-green-950" : "text-white/80")} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Spacer to push page content below the fixed mobile top bar */}
      <div className="lg:hidden h-14" />
    </>
  );
}