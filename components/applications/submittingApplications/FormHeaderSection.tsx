import { Locale } from '@/types'
import { Briefcase, ShieldCheck } from 'lucide-react'
import React from 'react'

function FormHeaderSection({locale,careerName}:{locale:Locale,careerName:string}, ) {
    const isArabic= locale==="ar"
  return (
    <div className="bg-white border-b border-slate-100 p-8 md:p-14">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4">
                <span className="text-[#0c479a] text-[10px] font-black uppercase tracking-[0.3em] bg-[#0c479a]/5 px-3 py-1 rounded-md">
                  {isArabic ? "بوابة التوظيف" : "Career Portal"}
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  {isArabic ? "تقديم طلب انضمام" : "Submit Application"}
                </h1>
                
              </div>

              {/* Job Badge - Matching Office/Parking Metadata style */}
              <div className="flex items-center gap-4 bg-slate-50 p-4 md:p-6 rounded-[2rem] border border-slate-100 min-w-70">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100">
                  <Briefcase className="w-6 h-6 text-[#0c479a]" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                    {isArabic ? "المسمى الوظيفي" : "Position title"}
                  </p>
                  <h3 className="text-sm font-black text-slate-900 uppercase">
                    {careerName}
                  </h3>
                </div>
                
                
              </div>
            </div>
          </div>
  )
}

export default FormHeaderSection