import React from 'react'
import { User, Mail, Phone, MapPin, Shield, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { useAuth } from './AuthContext'

export default function AccountInfo() {
  const { profile, accessToken } = useAuth();

  const fields = [
    { label: 'Full Name', value: profile?.name, icon: User },
    { label: 'Email', value: profile?.email, icon: Mail },
    { label: 'Phone', value: profile?.phone, icon: Phone },
    { label: 'Address', value: profile?.address, icon: MapPin },
    { label: 'Role', value: profile?.role, icon: Shield, capitalize: true },
    { label: 'Joined', value: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : null, icon: Calendar },
  ];

  const initials = (profile?.name || 'U')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white shadow-sm px-4 py-6 sm:px-6 lg:px-8 rounded-2xl">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Account</span>
        <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#111111]">Account Information</h1>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-xl">
          {initials}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{profile?.name || 'Unnamed User'}</h2>
          <p className="text-sm text-gray-400 capitalize">{profile?.role || 'User'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value, icon: Icon, capitalize }) => (
          <div key={label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <Icon size={16} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-400">{label}</p>
              <p className={`text-sm font-medium text-gray-900 ${capitalize ? 'capitalize' : ''}`}>
                {value || '—'}
              </p>
            </div>
          </div>
        ))}

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
          {profile?.is_verified ? (
            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
          ) : (
            <XCircle size={16} className="text-gray-300 mt-0.5" />
          )}
          <div>
            <p className="text-xs text-gray-400">Verification Status</p>
            <p className="text-sm font-medium text-gray-900">
              {profile?.is_verified ? 'Verified' : 'Not Verified'}
            </p>
          </div>
        </div>
      </div>

      <details className="mt-8">
        <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
          View raw session data
        </summary>
        <pre className="mt-3 p-4 bg-gray-900 text-gray-100 text-xs rounded-xl overflow-x-auto">
          {JSON.stringify({ profile, hasAccessToken: !!accessToken }, null, 2)}
        </pre>
      </details>
    </div>
  );
}