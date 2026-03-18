import { Star, ChevronRight } from "lucide-react";

interface RetailHeroProps {
  primaryColor: string;
}

export default function RetailHero({ primaryColor }: RetailHeroProps) {
  return (
    /* الحل 1: تغيير h-[80vh] إلى min-h-screen ليتمدد القسم مع محتواه */
    /* الحل 2: إضافة py-32 لضمان مسافة أمان علوية وسفلية */
    <header className="relative min-h-screen flex items-center justify-start px-6 md:px-20 overflow-hidden bg-[#0a0f1a] border-b border-slate-900 py-32">
      
      {/* Background with Technical Treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070"
          className="w-full h-full object-cover opacity-30 grayscale contrast-125"
          alt="Retail Spaces"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/80 to-[#0a0f1a]/20"></div>
      </div>

      {/* Meta Data Corner */}
      <div className="absolute top-40 right-10 hidden lg:block text-right space-y-1 opacity-40">
        <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">Sector Profile</p>
        <p className="text-[10px] font-black text-[#0c479a] uppercase tracking-widest  ">High-Traffic Retail_01</p>
      </div>

      <div className="relative z-10 max-w-5xl space-y-12">
        {/* Sharp Badge System */}
        <div className="inline-flex items-center gap-4">
          <div className="w-10 h-[1px]" style={{ backgroundColor: primaryColor }}></div>
          <div className="bg-white/5 border border-white/10 px-5 py-2 backdrop-blur-md">
             <div className="flex items-center gap-2">
                <Star size={12} style={{ color: primaryColor }} /> 
                <span className="text-white text-[9px] font-black uppercase tracking-[0.4em]">
                  Prime Commercial Index
                </span>
             </div>
          </div>
        </div>

        {/* Title - تم ضبط القياسات هنا لضمان عدم القطش */}
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl md:text-[8vw] lg:text-[9vw] font-black text-white leading-[0.9] md:leading-[0.85] uppercase tracking-tighter  ">
            WHERE BRANDS <br />
            <span 
              className="text-transparent inline-block" // inline-block تحسن معالجة الحواف
              style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}
            >
              THRIVE.
            </span>
          </h1>
        </div>

        {/* Description & Action */}
        <div className="max-w-xl border-l-2 border-slate-800 pl-8 space-y-8">
          <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-loose  ">
            Strategic retail nodes situated in high-velocity urban corridors. 
            Engineered for maximum visibility and long-term brand equity growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-0 border border-white/10 w-fit bg-white/5 backdrop-blur-sm">
             <button className="bg-white text-slate-900 px-8 md:px-12 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#0c479a] hover:text-white transition-all duration-500 flex items-center gap-4 group">
               Acquire Space <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
             </button>
             <button className="border-l border-white/10 text-white px-8 md:px-12 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white/10 transition-all">
               Global Portfolio
             </button>
          </div>
        </div>
      </div>

      {/* Axis Decoration */}
      <div className="absolute left-0 bottom-20 w-full h-[1px] bg-white/5 pointer-events-none"></div>
    </header>
  );
}