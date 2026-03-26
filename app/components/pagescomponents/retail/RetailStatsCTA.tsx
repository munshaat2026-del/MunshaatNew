interface RetailStatsCTAProps {
  primaryColor: string;
}

export default function RetailStatsCTA({ primaryColor }: RetailStatsCTAProps) {
  return (
    <section className="bg-white py-40 px-6 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Upper Block: Stats & Brand Logic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-900">
          {/* Left: Content & Stats */}
          <div className="lg:col-span-7 p-12 md:p-20 space-y-16 border-b lg:border-b-0 lg:border-r border-slate-900">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-[#0c479a]">
                <div className="w-10 h-[1px] bg-[#0c479a]"></div>
                <span className="text-[10px] font-black uppercase ">
                  Tenant Ecosystem
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900">
                WHY BRANDS <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}
                >
                  TRUST ROYAL.
                </span>
              </h2>
              <p className="text-slate-400 text-[11px] font-bold uppercase  leading-loose max-w-md">
                We don't just lease space; we architect high-performance retail
                environments designed for visibility and operational continuity.
              </p>
            </div>

            {/* Technical Stats Grid */}
            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-slate-100">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black tracking-tighter text-slate-900  ">
                    4.2M
                  </p>
                  <div className="w-2 h-2 bg-[#0c479a]"></div>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase ">
                  Annual Traffic Index
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl font-black tracking-tighter text-slate-900  ">
                    92%
                  </p>
                  <div className="w-2 h-2 bg-green-500"></div>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase ">
                  Retention Reliability
                </p>
              </div>
            </div>
          </div>

          {/* Right: Sharp Image Section */}
          <div className="lg:col-span-5 relative bg-slate-900 overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098"
              className="w-full h-full object-cover  opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              alt="Retail Environment"
            />
            {/* Overlay Tag */}
            <div className="absolute inset-0 border-[20px] border-slate-900/10 pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 bg-white p-6 border border-slate-200 shadow-2xl">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1">
                Portfolio Snapshot
              </p>
              <p className="text-[10px] font-black uppercase text-slate-900">
                Premium Commercial Hub_04
              </p>
            </div>
          </div>
        </div>

        {/* Lower Block: The CTA "Terminal" */}
        <div className="mt-20 bg-slate-900 p-12 md:p-20 relative overflow-hidden">
          {/* Background Technical Grid */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:30px_30px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter  ">
                Start Your Expansion{" "}
                <span style={{ color: primaryColor }}>Protocol.</span>
              </h3>
              <p className="text-slate-500 text-[10px] font-black uppercase ">
                Institutional Grade Leasing Consultancy Available 24/7
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-0">
              <button className="bg-[#0c479a] text-white px-12 py-6 text-[10px] font-black uppercase  hover:bg-white hover:text-black transition-all">
                Contact Leasing
              </button>
              <button className="border border-white/20 text-white px-12 py-6 text-[10px] font-black uppercase  hover:bg-white/10 transition-all">
                Tenant Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
