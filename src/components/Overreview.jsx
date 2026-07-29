import React from 'react';
import { Bell, ShoppingBag, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Revenue trends data for clothing sales
const salesData = [
  { name: 'Jan', revenue: 24000 },
  { name: 'Feb', revenue: 38000 },
  { name: 'Mar', revenue: 31000 },
  { name: 'Apr', revenue: 54000 },
  { name: 'May', revenue: 68000 },
  { name: 'Jun', revenue: 82000 },
];

export default function FashionDashboard() {
  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$297,400', 
      change: '+14.2%', 
      icon: DollarSign 
    },
    { 
      title: 'Orders Processed', 
      value: '1,842', 
      change: '+8.5%', 
      icon: ShoppingBag 
    },
    { 
      title: 'Active Customers', 
      value: '12,450', 
      change: '+12.1%', 
      icon: Users 
    },
    { 
      title: 'Conversion Rate', 
      value: '3.64%', 
      change: '+2.3%', 
      icon: TrendingUp 
    },
  ];

  const topCollections = [
    { name: 'Minimalist Autumn Essentials', sales: '840 units', revenue: '$126,000', status: 'Best Seller' },
    { name: 'Monochrome Streetwear Line', sales: '620 units', revenue: '$93,000', status: 'Trending' },
    { name: 'Silk & Linen Summer Capsule', sales: '410 units', revenue: '$61,500', status: 'Limited' },
    { name: 'Classic Tailored Outerwear', sales: '290 units', revenue: '$52,200', status: 'Steady' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F9F8F6] text-[#111111] p-4 sm:p-6 md:p-8 font-sans">
      
      {/* 1. E-COMMERCE NAVBAR */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">Brand Overview</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#111111]">Maison Analytics</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2.5 bg-white rounded-full border border-gray-200 hover:border-gray-400 transition-all text-gray-700">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D4AF37] rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
            <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-serif text-sm">
              M
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium">Atelier Manager</p>
              <p className="text-[11px] text-gray-400">admin@maison.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KEY E-COMMERCE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        {metrics.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs font-medium tracking-wider uppercase text-gray-400">{card.title}</span>
                <div className="p-2 bg-[#F9F8F6] rounded-lg text-[#111111]">
                  <Icon size={16} />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl sm:text-3xl font-serif font-medium text-[#111111]">{card.value}</p>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                  {card.change}
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. LOWER ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sales Performance Graph */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-serif font-medium text-[#111111]">Revenue Trajectory</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly gross revenue performance</p>
            </div>
            <span className="text-xs font-medium uppercase tracking-wider bg-[#F9F8F6] px-3 py-1.5 rounded-full border border-gray-200">
              H1 Performance
            </span>
          </div>

          <div className="h-[260px] sm:h-[300px] w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 12 }}
                />
                <YAxis
                  domain={[0, 90000]}
                  ticks={[0, 30000, 60000, 90000]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#888888', fontSize: 12 }}
                  tickFormatter={(val) => `$${val / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111111', 
                    borderRadius: '8px', 
                    color: '#FFF', 
                    border: 'none',
                    fontSize: '12px' 
                  }}
                  itemStyle={{ color: '#D4AF37' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#111111"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#111111', stroke: '#FFF', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#D4AF37' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Collections */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-serif font-medium text-[#111111]">Top Collections</h3>
            <span className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">View All</span>
          </div>

          <div className="flex flex-col gap-4">
            {topCollections.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#F9F8F6] transition-colors border border-transparent hover:border-gray-200/60">
                <div className="flex flex-col pr-2">
                  <span className="text-sm font-medium text-[#111111]">{item.name}</span>
                  <span className="text-xs text-gray-400 mt-0.5">{item.sales}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-[#111111] block">{item.revenue}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37] mt-0.5 inline-block">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}