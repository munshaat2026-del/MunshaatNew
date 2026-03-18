import Link from "next/link";
import { ArrowLeft, Building2, Store, Package, Car } from "lucide-react";

export default function NotFound() {
  const primaryColor = "#0c479a";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Dynamic Background Colors (Static) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#0c479a]/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#0c479a]/10 blur-[150px]" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        
        {/* Static Background Text */}
        <h1 
          className="text-[25vw] font-black leading-none tracking-tighter select-none pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            color: primaryColor,
            opacity: 0.04
          }}
        >
          404
        </h1>

        <div className="space-y-8">
          {/* Simplified Text Header */}
          <div className="space-y-4">
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Page <span style={{ color: primaryColor }}>Not Found.</span>
            </h2>
            <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] max-w-sm mx-auto ">
              Registry Error: Asset coordinate unavailable.
            </p>
          </div>
          
          {/* Navigation Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            {[
              { icon: Building2, label: "Offices", href: "/en/offices" },
              { icon: Store, label: "Stores", href: "/en/stores" },
              { icon: Package, label: "Depots", href: "/en/depots" },
              { icon: Car, label: "Parkings", href: "/en/parkings" },
            ].map((asset, i) => (
              <Link 
                key={i} 
                href={asset.href} 
                className="group flex flex-col items-center gap-4 p-8 bg-white/40 backdrop-blur-md border border-white hover:border-[#0c479a]/30 hover:shadow-xl hover:shadow-[#0c479a]/5 transition-all duration-500"
              >
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 bg-slate-50 group-hover:bg-[#0c479a]"
                >
                  <asset.icon size={22} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors text-center">
                  {asset.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="pt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-4 px-12 py-5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.5em] hover:bg-[#0c479a] transition-all shadow-lg"
            >
              <ArrowLeft size={16} />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle UI Detail */}
      <div className="absolute bottom-10 left-10 border-l border-slate-200 pl-4 hidden md:block">
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">Error Protocol: 0x404_ASSET_NULL</p>
      </div>
    </div>
  );
}