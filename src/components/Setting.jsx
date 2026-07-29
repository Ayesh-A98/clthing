import React, { useState } from 'react';
import { User, Lock, Settings2 } from 'lucide-react';

export default function SettingsDashboard() {
  // Profile State
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '+974 1234 5678' });
  // Password State
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  // Preferences State
  const [preferences, setPreferences] = useState({ darkMode: false, emailNotif: true, smsAlerts: false });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">

      {/* Main Container */}
      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 mt-11">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          Account Settings
        </h2>

        {/* Section 1: Profile Settings */}
        <section className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-black border-b border-slate-200 pb-3">
            <User className="w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold">Profile</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="Enter your full name"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <input 
                type="email" 
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <input 
                type="text" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <button className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-sm transition mt-2">
              Save Changes
            </button>
          </div>
        </section>

        {/* Section 2: Security Settings */}
        <section className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-black border-b border-slate-200 pb-3">
            <Lock className="w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold">Security</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Current Password
              </label>
              <input 
                type="password" 
                placeholder="Enter current password"
                value={password.current}
                onChange={(e) => setPassword({...password, current: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                New Password
              </label>
              <input 
                type="password" 
                placeholder="Enter new password"
                value={password.new}
                onChange={(e) => setPassword({...password, new: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">
                Confirm New Password
              </label>
              <input 
                type="password" 
                placeholder="Confirm new password"
                value={password.confirm}
                onChange={(e) => setPassword({...password, confirm: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-slate-300 transition text-sm sm:text-base text-slate-800 placeholder-slate-400"
              />
            </div>

            <button className="w-full sm:w-auto bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-sm transition mt-2">
              Update Password
            </button>
          </div>
        </section>

        {/* Section 3: Preferences Checkbox options */}
        <section className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60 shadow-md space-y-4">
          <div className="flex items-center gap-2 text-black border-b border-slate-200 pb-3">
            <Settings2 className="w-5 h-5" />
            <h3 className="text-lg sm:text-xl font-bold">Preferences</h3>
          </div>

          <div className="divide-y divide-slate-200/60 text-sm sm:text-base font-medium">
            {/* Enable Dark Mode Option */}
            <label className="flex items-center justify-between py-3.5 cursor-pointer select-none">
              <span className="text-slate-700">Dark Mode</span>
              <input 
                type="checkbox" 
                checked={preferences.darkMode}
                onChange={(e) => setPreferences({...preferences, darkMode: e.target.checked})}
                className="w-4 h-4 rounded border-slate-300 text-black focus:ring-slate-400 accent-black"
              />
            </label>

            {/* Email Notifications Option */}
            <label className="flex items-center justify-between py-3.5 cursor-pointer select-none">
              <span className="text-slate-700">Email Notifications</span>
              <input 
                type="checkbox" 
                checked={preferences.emailNotif}
                onChange={(e) => setPreferences({...preferences, emailNotif: e.target.checked})}
                className="w-4 h-4 rounded border-slate-300 text-black focus:ring-slate-400 accent-black"
              />
            </label>

            {/* SMS Alerts Option */}
            <label className="flex items-center justify-between py-3.5 cursor-pointer select-none">
              <span className="text-slate-700">SMS Alerts</span>
              <input 
                type="checkbox" 
                checked={preferences.smsAlerts}
                onChange={(e) => setPreferences({...preferences, smsAlerts: e.target.checked})}
                className="w-4 h-4 rounded border-slate-300 text-black focus:ring-slate-400 accent-black"
              />
            </label>
          </div>
        </section>
      </main>

    </div>
  );
}