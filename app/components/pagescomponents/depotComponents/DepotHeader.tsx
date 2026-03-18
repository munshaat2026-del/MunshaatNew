interface DepotsHeaderProps {
  primaryColor: string;
  locale: "en" | "ar";
}

export default function DepotsHeader({ primaryColor, locale }: DepotsHeaderProps) {
  const isArabic = locale === "ar";

  return (
    <header className="relative h-[60vh] flex items-center justify-start bg-[#0a0f1a] overflow-hidden border-b border-slate-900">
      {/* Background with Industrial Architectural Treatment */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125 transition-transform duration-[3000ms] hover:scale-110"
          alt={isArabic ? "مستودعات" : "Industrial Depots"}
        />
        {/* Technical Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent"></div>
      </div>

      {/* Structural Framing Elements */}
      <div className="absolute top-0 left-0 w-full h-24 border-b border-white/5 hidden md:block"></div>
      <div className="absolute top-0 left-24 w-[1px] h-full border-l border-white/5 hidden md:block"></div>

      <div className="relative z-10 px-6 md:px-32 max-w-5xl space-y-10">
        {/* Title Block */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-[8vw] font-black text-white leading-[0.85] uppercase tracking-tighter" dir={isArabic ? "rtl" : "ltr"}>
            {isArabic ? "المستودعات " : "PREMIUM"} <br />
            <span 
              className="text-[#0c479a]" 
             
            >
              {isArabic ? "اللوجستية." : "LOGISTIC DEPOTS."}
            </span>
          </h1>
        </div>

        {/* Description with Vertical Accent */}
        <div className={`max-w-xl ${isArabic ? "border-r-2 pr-8" : "border-l-2 pl-8"} border-slate-800`}>
          <p className="text-slate-400 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.25em] leading-snug  " dir={isArabic ? "rtl" : "ltr"}>
            {isArabic
              ? "بيئات تخزين استراتيجية مصممة لتحسين كفاءة سلاسل التوريد والتميز في إدارة الأصول اللوجستية."
              : "Strategic storage environments engineered for supply chain efficiency and logistics asset management excellence."}
          </p>
        </div>
      </div>

    
    </header>
  );
}