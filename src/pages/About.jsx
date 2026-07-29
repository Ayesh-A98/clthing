import React from 'react';
import { Heart, Globe, Users, Sparkles, Search, Sun, User, ShoppingBag } from 'lucide-react';
import Footer from "../components/Footer"
const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '15+', label: 'Countries' },
  { value: '4.9', label: 'Average Rating' },
];

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description: 'We source only the finest materials and work with skilled artisans to create products that last.',
  },
  {
    icon: Globe,
    title: 'Sustainability',
    description: 'Committed to ethical sourcing and eco-friendly practices throughout our supply chain.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building meaningful connections with our customers and giving back to communities in need.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Constantly evolving our designs and processes to bring you the best in modern fashion.',
  },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Marcus Williams',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'David Park',
    role: 'Operations Lead',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navigation Header */}
     

      {/* Hero Section */}
      <section className="px-6 lg:px-12 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 text-xs font-medium mb-6">
          Our Story
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
          Fashion That Inspires Confidence
        </h1>
        <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Founded in 2018, Luxe began with a simple mission: to create beautiful, high-quality
          fashion that empowers people to express their unique style without compromising on
          ethics or sustainability.
        </p>
      </section>

      {/* Stats Counter Section */}
      <section className="border-y border-gray-800/60 py-12 px-6 lg:px-12 bg-[#090d16]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-3xl sm:text-4xl font-extrabold text-purple-400 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Image Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">From Passion to Purpose</h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            What started as a small collection of handcrafted accessories has grown into a global
            fashion destination, but our core values remain unchanged. We believe that beautiful
            design and ethical practices can coexist.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Every piece in our collection is thoughtfully designed and carefully crafted. We work
            directly with artisans and manufacturers who share our commitment to fair wages, safe
            working conditions, and sustainable practices.
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Our journey has been shaped by our incredible community of customers who inspire us
            every day. Your support enables us to continue pushing boundaries while staying true
            to our mission.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000"
              alt="Luxe Boutique Display"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-6 bg-[#151c2e] border border-gray-800 p-4 rounded-xl shadow-xl max-w-xs">
            <h4 className="font-bold text-white text-base">Since 2018</h4>
            <p className="text-xs text-gray-400 mt-0.5">Creating timeless pieces</p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Our Values</h2>
          <p className="text-gray-400 text-sm">The principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, index) => {
            const Icon = v.icon;
            return (
              <div
                key={index}
                className="bg-[#131927] border border-gray-800/80 p-6 rounded-2xl hover:border-gray-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-800/50 flex items-center justify-center mb-4 text-purple-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Meet Our Team</h2>
          <p className="text-gray-400 text-sm">The passionate people behind Luxe</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-gray-800 mb-4 bg-gray-900 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-base text-white">{member.name}</h3>
              <p className="text-xs text-gray-400 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
}