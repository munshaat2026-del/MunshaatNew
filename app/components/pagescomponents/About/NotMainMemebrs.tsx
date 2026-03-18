import { Locale, TranslatedMembers } from '@/types';

interface TeamRosterProps {
  primaryColor: string;
  locale: Locale;
  data: TranslatedMembers[];
}

export default function TeamRoster({ primaryColor, locale, data }: TeamRosterProps) {
  const isAr = locale === "ar";

  return (
    <section className="py-20 px-6 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        
        <div className={`mb-12 flex flex-col gap-3 items-center`}>
        
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tighter">
            {isAr ? "فريق العمل المعاون" : "Our Associates"}
          </h3>
        </div>

        {/* Grid - نستخدم 4 أو 5 أعمدة ليظهروا بحجم أصغر من الأساسيين */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {data.map((member, i) => (
            <div key={i} className="group relative">
              
              {/* Image Container - دائري أو مربع بسيط مع تأثير Scale */}
              <div className="relative aspect-square overflow-hidden  transition-all duration-700 bg-slate-100 border border-slate-100">
                <img
                  src={member.image ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={member.name ?? "Member"}
                />
                
                {/* Subtle Overlay Line */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>

              {/* Minimal Info */}
              <div className={`mt-4 ${isAr ? 'text-right' : 'text-left'}`}>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight group-hover:text-slate-600 transition-colors">
                  {member.name}
                </h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {member.position}
                </p>
              </div>
              
            </div>
          ))}
        </div>

        {/* Decorative Background Text - لإضافة لمسة فنية خفيفة */}
        <div className={`absolute opacity-[0.03] pointer-events-none font-black text-9xl uppercase -z-10 ${isAr ? 'left-0' : 'right-0'}`}>
          {isAr ? "فريقنا" : "Support"}
        </div>

      </div>
    </section>
  );
}