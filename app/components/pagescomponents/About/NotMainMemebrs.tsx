
import { Locale, useLocale } from "next-intl";
import { TranslatedMembers } from '@/types';

interface TeamRosterProps {
    primaryColor: string;
      locale:Locale;
      data:TranslatedMembers[]
}

export default function TeamRoster({ primaryColor ,locale,data }: TeamRosterProps) {
   const isAr = locale === "ar";
  const memberCount = data.length;
  return (
    <section className="py-24 px-6 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Technical Header */}
        <div className={`mb-16 flex flex-col gap-2 `}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              {isAr ? "الكوادر الإضافية" : "Additional Personnel"}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            {isAr ? "فريق العمل" : "Our Associates"}
          </h3>
        </div>

        {/* Dynamic Grid: Adapts based on member count */}
        <div className={`
          flex flex-wrap gap-8 justify-center
          ${isAr ? 'flex-row-reverse' : 'flex-row'}
        `}>
          {data.map((member, i) => (
            <div 
              key={i} 
              className={`
                group relative bg-white border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                /* Size Logic: If only 1 or 2, make them significantly larger */
                ${memberCount <= 2 ? 'w-full md:w-[calc(50%-1rem)] lg:w-[calc(45%-1rem)]' : 'w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]'}
              `}
            >
              <div className={`flex flex-col md:flex-row h-full ${isAr ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Image Section: Larger & Greyscale-to-Color */}
                <div className="relative w-full md:w-2/5 aspect-[4/5] md:aspect-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img
                    src={member.image??""}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={member.name??"Memebr name"}
                  />
                  {/* Decorative Blueprint Overlay */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity pointer-events-none border-[10px] border-white/20 m-2" />
                </div>

                {/* Info Section: High-Contrast Technical Style */}
                <div className={`flex-1 p-8 flex flex-col justify-center bg-white ${isAr ? 'text-right' : 'text-left'}`}>
                  <div className="space-y-4">
                   
                    
                    <h4 className="text-xl md:text-2xl font-black text-slate-900 uppercase leading-none group-hover:text-[#0c479a] transition-colors">
                      {member.name}
                    </h4>
                    
                    <div className={`flex items-center gap-3 ${isAr ? 'justify-end' : 'justify-start'}`}>
                      <div className="w-4 h-px bg-slate-200" />
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {member.position}
                      </p>
                    </div>

                   
                  </div>
                </div>
              </div>

              {/* Hover Accent Line */}
              <div 
                className="absolute bottom-0 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full"
                style={{ backgroundColor: primaryColor }}
              />
            </div>
          ))}
        </div>

        {/* Background Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20vw] font-black text-slate-50/50 select-none pointer-events-none -z-10">
          TEAM
        </div>

      </div>
    </section>
  );
}