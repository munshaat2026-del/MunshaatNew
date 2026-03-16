import { Locale } from '@/types'
import {  ArrowRight, ArrowLeft,Activity } from 'lucide-react'
import Link from 'next/link'

function NoComingSoonEvents({locale}:{locale:Locale}) {
    const isAr= locale==="ar"
  return (
     <div 
        className="min-h-screen bg-[#fcfcfc] text-slate-900 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden" 
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Decorative Background Element */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none flex items-center justify-center">
          <h1 className="text-[25vw] font-black uppercase tracking-tighter">Munshaat</h1>
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center">
          {/* Status Badge */}
          <div className="inline-flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6">
              <Activity size={32} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <div className="flex items-center gap-3 bg-slate-100/50 px-4 py-1.5 rounded-full border border-slate-200/50">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                {isAr ? "الحالة: وضع الاستعداد" : "Status: System Idle"}
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">
            {isAr ? "لا توجد تحديثات حالية" : "No Active Updates"}
          </h2>
          
          <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            {isAr 
              ? " لا توجد مشاريع تطويرية مجدولة للإطلاق حالياً في هذا القسم."
              : " There are currently no scheduled development projects or launches in this section."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href={`/`}
              className="bg-slate-900 text-white px-10 py-5 text-[10px] font-bold  uppercase tracking-widest hover:bg-[#0c479a] transition-all flex items-center justify-center gap-3"
            >
              {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              {isAr ? "العودة للرئيسية" : "Back to Home"}
            </Link>
            
           
          </div>
        </div>

        {/* Technical Footer Reference */}
        <div className="absolute bottom-8 left-0 w-full px-12 flex justify-between items-center opacity-20">
          <span className="text-[8px] font-bold uppercase tracking-widest">REF: MN-NULL-2026</span>
          <div className="flex gap-2">
            <div className="w-1 h-1 bg-slate-900" />
            <div className="w-1 h-1 bg-slate-900" />
            <div className="w-1 h-1 bg-slate-900" />
          </div>
        </div>
      </div>
  )
}

export default NoComingSoonEvents