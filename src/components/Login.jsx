import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Eye, EyeOff, CheckCircle2, XCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../components/AuthContext'; // Check path: change to '../context/AuthContext' if AuthContext is in a context folder

const FallingClothBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const cols = Math.floor(width / 25);
    const rows = 18;
    const spacing = 22;
    const gravity = 0.15;
    const friction = 0.98;

    class Point {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.oldx = x + (Math.random() - 0.5) * 8;
        this.oldy = y - Math.random() * 15;
        this.pinned = false;
      }
      update() {
        if (this.pinned) return;
        const vx = (this.x - this.oldx) * friction;
        const vy = (this.y - this.oldy) * friction;
        this.oldx = this.x;
        this.oldy = this.y;
        this.x += vx;
        this.y += vy + gravity;
      }
    }

    class Stick {
      constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
        this.length = spacing;
      }
      update() {
        const dx = this.p1.x - this.p0.x;
        const dy = this.p1.y - this.p0.y;
        const distance = Math.hypot(dx, dy);
        const difference = this.length - distance;
        const percent = difference / distance / 2;
        const offsetX = dx * percent;
        const offsetY = dy * percent;

        if (!this.p0.pinned) {
          this.p0.x -= offsetX;
          this.p0.y -= offsetY;
        }
        if (!this.p1.pinned) {
          this.p1.x += offsetX;
          this.p1.y += offsetY;
        }
      }
    }

    const points = [];
    const sticks = [];
    const ribbonWidth = 8;
    const numRibbons = Math.ceil(cols / ribbonWidth);

    for (let r = 0; r < numRibbons; r++) {
      const startX = r * (ribbonWidth * spacing) + 40;
      const ribbonPoints = [];

      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < ribbonWidth; x++) {
          const pt = new Point(startX + x * spacing, y * spacing - 250);
          if (y === 0 && (x === 0 || x === ribbonWidth - 1 || x === Math.floor(ribbonWidth / 2))) {
            pt.pinned = true;
          }
          row.push(pt);
          points.push(pt);
        }
        ribbonPoints.push(row);
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < ribbonWidth; x++) {
          if (x < ribbonWidth - 1) {
            sticks.push(new Stick(ribbonPoints[y][x], ribbonPoints[y][x + 1]));
          }
          if (y < rows - 1) {
            sticks.push(new Stick(ribbonPoints[y][x], ribbonPoints[y + 1][x]));
          }
        }
      }
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      points.forEach((p, idx) => {
        if (!p.pinned) {
          p.x += Math.sin(time + idx * 0.1) * 0.18;
        }
      });

      for (let i = 0; i < 4; i++) {
        sticks.forEach((s) => s.update());
        points.forEach((p) => p.update());
      }

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.25)';
      ctx.lineWidth = 1;

      sticks.forEach((s) => {
        ctx.moveTo(s.p0.x, s.p0.y);
        ctx.lineTo(s.p1.x, s.p1.y);
      });
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default function AuthPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Password Requirements Checklist
  const passwordRules = [
    { label: 'At least 8 characters long', valid: formData.password.length >= 8 },
    { label: 'Contains at least one uppercase letter (A-Z)', valid: /[A-Z]/.test(formData.password) },
    { label: 'Contains at least one number (0-9)', valid: /[0-9]/.test(formData.password) },
    { label: 'Contains at least one special character (!@#$%^&*)', valid: /[!@#$%^&*]/.test(formData.password) },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.valid);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage('');
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!isLogin && !isPasswordValid) return;

    setIsLoading(true);

    try {
      let userProfile;

      if (isLogin) {
        userProfile = await login(formData.email, formData.password);
      } else {
        const result = await register(formData.name, formData.email, formData.password);
        userProfile = result.profile;
      }

      // Read role safely from normalized user profile
      const role = userProfile?.role?.toLowerCase();

      // Navigate to correct page
      if (role === 'admin') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Authentication failed. Please check credentials.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Framer Motion Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const fallItemVariants = {
    hidden: { y: -120, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 14 },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 text-white overflow-hidden px-4">
      {/* Background Animated Cloth Canvas */}
      <FallingClothBackground />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl">
        
        {/* Animated Form Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login-header' : 'signup-header'}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              {isLogin
                ? 'Sign in to access your portal'
                : 'Join us today and explore new features'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* API Error Alert Banner */}
        {errorMessage && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Form Elements */}
        <motion.form
          key={isLogin ? 'login-form' : 'signup-form'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Full Name Field (Sign Up Only) */}
          {!isLogin && (
            <motion.div variants={fallItemVariants}>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Full Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="enter name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm text-white transition"
                />
              </div>
            </motion.div>
          )}

          {/* Email Field */}
          <motion.div variants={fallItemVariants}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-5 h-5 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="Enter gmail"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm text-white transition"
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={fallItemVariants}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-5 h-5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm text-white transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          
          {!isLogin && (
            <motion.div

              variants={fallItemVariants}
              className="p-3 bg-slate-800/30 rounded-xl border border-slate-700/50 space-y-1.5"
            >
              <span className="text-xs font-medium text-slate-400 block mb-1">
                Password Requirements:
              </span>
              {passwordRules.map((rule, idx) => (
                <div key={idx} className="flex items-center text-xs space-x-2">
                  {rule.valid ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className={rule.valid ? 'text-emerald-300' : 'text-slate-400'}>
                    {rule.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div variants={fallItemVariants} className="pt-2">
            <button
              type="submit"
              disabled={isLoading || (!isLogin && !isPasswordValid)}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg transition-all transform active:scale-[0.98] ${
                isLoading || (!isLogin && !isPasswordValid)
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-indigo-500/25'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.div>
        </motion.form>

        {/* View Toggle Button */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-xs text-slate-400"
        >
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ name: '', email: '', password: '' });
              setErrorMessage('');
            }}
            className="font-semibold text-indigo-400 hover:text-indigo-300 transition underline underline-offset-4 ml-1"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </motion.div>

      </div>
    </div>
  );
}