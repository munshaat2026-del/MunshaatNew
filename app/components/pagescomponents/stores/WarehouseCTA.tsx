import { Phone, FileText, ArrowUpRight } from "lucide-react";

interface WarehouseCTAProps {
  primaryColor: string;
}

export default function WarehouseCTA({ primaryColor }: WarehouseCTAProps) {
  return (
    <footer className="py-40 px-6 bg-white border-t-4 border-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          
          <div className="flex items-center gap-4">
             <div className="w-12 h-[1px] bg-slate-200"></div>
             <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">Final Operational Phase</span>
             <div className="w-12 h-[1px] bg-slate-200"></div>
          </div>

          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-[-0.05em] leading-[0.85] text-slate-900 italic">
            READY TO EXPAND <br />
            {/* تم تصحيح الخطأ هنا: استخدام camelCase للخاصية */}
            <span 
              className="text-transparent" 
              style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}
            >
              OPERATIONS?
            </span>
          </h2>

          <p className="max-w-2xl text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-loose">
            Engage our Industrial Assets team for a comprehensive facility audit and a lease framework tailored to your logistics architecture.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 w-full max-w-2xl border border-slate-900 mt-12">
            <button className="bg-slate-900 text-white px-8 py-8 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-slate-900 transition-all duration-500 flex items-center justify-center gap-4 group border-r border-slate-900">
              <Phone size={16} className="group-hover:rotate-12 transition-transform" />
              Call Our Agent
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              className="bg-white text-slate-900 px-8 py-8 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all duration-500 flex items-center justify-center gap-4 group"
            >
              <FileText size={16} style={{ color: primaryColor }} />
              Download Tech Specs
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}