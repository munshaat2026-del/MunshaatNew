import { Warehouse, ChevronRight } from "lucide-react";

interface WarehouseHeroProps {
  primaryColor: string;
}

export default function WarehouseHero({ primaryColor }: WarehouseHeroProps) {
  return (
    /* الحل الأساسي: استخدام min-h-screen بدلاً من h-[80vh] وإضافة py-32 */
    <header className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1a] border-b border-slate-900 py-32 md:py-40">
      {/* Background with Industrial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504189158424-7adfffd53bc0?q=80&w=2110"
          className="w-full h-full object-cover opacity-20 contrast-125 scale-105"
          alt="Logistics Background"
        />
        {/* Technical Grid Lines */}
        <div className="absolute left-[5%] top-0 w-[1px] h-full bg-white/5 hidden md:block"></div>
        <div className="absolute right-[5%] top-0 w-[1px] h-full bg-white/5 hidden md:block"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full space-y-12">
        {/* Sharp Industrial Tag */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-[2px]"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <div className="bg-white/5 border border-white/10 px-4 py-2 flex items-center gap-3 backdrop-blur-sm">
            <Warehouse size={14} style={{ color: primaryColor }} />
            <span className="text-white text-[10px] font-black uppercase ">
              Asset Class: Industrial Storage
            </span>
          </div>
        </div>

        {/* Hero Title - Architectural Scale (ضبط الحجم ليكون متجاوباً) */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[10vw] font-black text-white uppercase tracking-tighter leading-[0.9] md:leading-[0.85]  ">
            STRATEGIC <br />
            <span
              className="text-transparent inline-block py-2" // إضافة padding بسيط للنص المفرغ لضمان عدم قطع حواف الـ Stroke
              style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}
            >
              STORAGE.
            </span>
          </h1>
        </div>

        {/* Content Block with Border Accent */}
        <div className="max-w-2xl border-l-2 border-slate-800 pl-8 space-y-10">
          <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.25em] leading-loose  ">
            Scalable warehousing solutions with integrated security, fire
            suppression, and optimized logistics access across Amman's
            high-demand industrial hubs.
          </p>

          <div className="flex flex-col sm:flex-row gap-0 border border-white/10 w-fit bg-white/5 backdrop-blur-sm shadow-2xl">
            <button className="bg-white text-slate-900 px-10 py-5 font-black text-[10px] uppercase  hover:bg-[#0c479a] hover:text-white transition-all duration-500 flex items-center gap-3 group">
              Deploy Operations{" "}
              <ChevronRight
                size={14}
                className="group-hover:translate-x-2 transition-transform"
              />
            </button>
            <button className="border-l border-white/10 text-white px-10 py-5 font-black text-[10px] uppercase  hover:bg-white/10 transition-all">
              View Floorplans
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Technical Coordinates */}
      <div className="absolute bottom-12 right-12 hidden lg:block opacity-30">
        <div className="text-right space-y-1">
          <p className="text-[8px] font-black text-white uppercase tracking-widest leading-none">
            Global Logistics Node
          </p>
          <p className="text-[10px] font-black text-white uppercase ">
            KSA // RIY // IND_ZONE_4
          </p>
        </div>
      </div>
    </header>
  );
}
