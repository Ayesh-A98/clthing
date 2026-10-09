import React from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Shield, LogOut, ArrowLeft } from 'lucide-react'
import { useAuth } from '../components/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className='min-h-screen bg-slate-950 text-white px-4 py-10'>
      <div className='max-w-lg mx-auto'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-sm text-slate-400 hover:text-white transition mb-6'
        >
          <ArrowLeft className='w-4 h-4' />
          Back
        </button>

        <div className='bg-slate-900/60 border border-white/10 rounded-3xl p-8'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center'>
              <User className='w-8 h-8' />
            </div>
            <div>
              <h1 className='text-2xl font-bold'>{user?.name || 'User'}</h1>
              <p className='text-sm text-slate-400 capitalize'>{user?.role || 'user'}</p>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl'>
              <Mail className='w-4 h-4 text-slate-400' />
              <div>
                <p className='text-xs text-slate-500'>Email</p>
                <p className='text-sm'>{user?.email || '—'}</p>
              </div>
            </div>

            <div className='flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl'>
              <Shield className='w-4 h-4 text-slate-400' />
              <div>
                <p className='text-xs text-slate-500'>Role</p>
                <p className='text-sm capitalize'>{user?.role || 'user'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='w-full mt-8 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition py-3 rounded-xl font-semibold text-red-400'
          >
            <LogOut className='w-4 h-4' />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}