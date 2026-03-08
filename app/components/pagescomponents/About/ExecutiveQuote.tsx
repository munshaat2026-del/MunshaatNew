import { Quote } from "lucide-react";

interface ExecutiveQuoteProps {
  primaryColor: string;
}

export default function ExecutiveQuote({ primaryColor }: ExecutiveQuoteProps) {
  return (
    <section className="py-40 px-6 md:px-16 bg-white overflow-hidden">
      {/* الحاوية الرئيسية: تصميم هندسي صلب (Monolithic Design) */}
      <div className="max-w-7xl mx-auto relative bg-[#0a0f1a] flex flex-col md:flex-row items-stretch">
        
        {/* عنصر بصري خلفي: شبكة إحداثيات هندسية خفيفة */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* الجانب الأيسر: الإطار الرمزي (Sharp Box) */}
        <div className="w-full md:w-1/3 p-16 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
          {/* نص ضخم مقصوص في الخلفية */}
          <div className="absolute -left-10 bottom-0 select-none pointer-events-none opacity-[0.05]">
            <span className="text-[15vw] font-black text-white uppercase leading-none">
              RM
            </span>
          </div>
          
          <div className="relative z-10 w-24 h-24 border border-white/20 flex items-center justify-center group hover:border-white transition-colors duration-700">
            <Quote size={32} className="text-white group-hover:scale-110 transition-transform duration-500" style={{ color: primaryColor }} />
            {/* زوايا ديكورية حادة */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-white/40"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-white/40"></div>
          </div>
        </div>

        {/* الجانب الأيمن: المحتوى النصي (Architectural Layout) */}
        <div className="w-full md:w-2/3 p-12 md:p-24 relative z-10 space-y-16 flex flex-col justify-center">
          
          {/* نص الاقتباس - تباين عالي */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <div className="h-[1px] w-12 bg-[#0c479a]"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Board Statement</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.1] max-w-2xl">
              “At <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Royal Manage</span>, we engineer the environments where Saudi Arabia’s <span style={{ color: primaryColor }}>future</span> grows.”
            </h2>
          </div>

          {/* التوقيع - خطوط تقنية */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-white/10">
            <div className="space-y-1">
              <p className="text-xs font-black text-white uppercase tracking-[0.4em]">
                The Board of Directors
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                Royal Operations Group // Riyadh HQ
              </p>
            </div>
            
            {/* ختم تقني صغير */}
            <div className="hidden lg:block border border-white/10 p-4">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-tight">
                 Operational <br /> Excellence <br /> Verified 2026
               </p>
            </div>
          </div>
        </div>

        {/* حافة ملونة حادة جداً في الأعلى */}
        <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: primaryColor }}></div>
      </div>
    </section>
  );
}