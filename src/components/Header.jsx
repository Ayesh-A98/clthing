import React, { useState, useRef, useEffect } from 'react'
import { Bell, User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'

export default function Header() {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/profile");
  };

  const handleSettingsClick = () => {
    setDropdownOpen(false);
    navigate("/dashboard/setting");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayName =
    profile?.name ||
    profile?.full_name ||
    profile?.fullName ||
    profile?.user_metadata?.full_name ||
    profile?.user_metadata?.name ||
    profile?.username ||
    profile?.email?.split("@")[0] ||
    "User";

  const displayEmail =
    profile?.email ||
    profile?.user_email ||
    profile?.username ||
    profile?.user_metadata?.email ||
    "";

  const displayRole = profile?.role || "User";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (

    <header className="bg-white shadow-sm px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Brand Overview</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#111111]">CLOTHING ANALYTICS</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-white rounded-full border border-gray-200 hover:border-gray-400 transition-all text-gray-700">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
          </button>

          <div className="relative flex items-center gap-3 pl-2 border-l border-gray-200" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-sm">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium">{displayName}</p>
                <p className="text-[11px] text-gray-400">{displayEmail}</p>
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden text-sm z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{displayName}</p>
                  <p className="text-xs text-gray-400">{displayEmail}</p>
                  <p className="text-[11px] text-gray-400 capitalize mt-0.5">{displayRole}</p>
                </div>

                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition text-left text-gray-700"
                >
                  <User size={16} />
                  My Profile
                </button>

                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition text-left text-gray-700"
                >
                  <Settings size={16} />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition text-left text-red-500 border-t border-gray-100"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}