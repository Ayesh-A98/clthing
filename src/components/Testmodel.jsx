import React from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      '"Luxe has become my go-to for quality basics and statement pieces. The attention to detail and customer service is unmatched."',
    name: 'Alexandra Chen',
    location: 'Los Angeles, CA',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 2,
    quote:
      '"Finally found a brand that balances quality, style, and sustainability. Every purchase has exceeded my expectations."',
    name: 'Marcus Johnson',
    location: 'Chicago, IL',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 3,
    quote:
      '"The cashmere sweater is hands down the softest thing I own. Worth the investment for pieces that last."',
    name: 'Sophie Williams',
    location: 'Miami, FL',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#0b101d] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            What Our Customers Say
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Join thousands of satisfied customers who love shopping with us
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#121929] border border-slate-800/80 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                  {item.quote}
                </p>
              </div>

              {/* User Info & Badge */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <h3 className="font-semibold text-white text-sm sm:text-base leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                      {item.location}
                    </p>
                  </div>
                </div>

                {/* Verified Badge */}
                {item.verified && (
                  <span className="inline-flex items-center gap-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 px-2.5 py-1 rounded-full text-xs font-medium">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}