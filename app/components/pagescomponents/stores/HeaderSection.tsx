interface OfficesHeaderProps {
  primaryColor: string;
  locale: "en" | "ar";
}

export default function OfficesHeader({ primaryColor, locale }: OfficesHeaderProps) {
  const isArabic = locale === "ar";

  return (
    <header className="relative h-[60vh] flex items-center bg-[#0a0f1a] overflow-hidden border-b border-slate-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale contrast-125 transition-transform duration-[3000ms] hover:scale-110"
          alt={isArabic ? "محلات تجارية" : "Retail Spaces"}
        />
        {/* Technical Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-32 max-w-7xl space-y-0">
        
        {/* Title */}
        <div className="flex flex-col ">
          <span className="text-5xl md:text-[6vw] font-black text-white uppercase">
             
            {isArabic ? "المحلات" : "Retail"}
          </span>
          
            <span
              className="text-5xl md:text-[6vw] font-black uppercase"
              style={{ color: primaryColor }}
            >
              {isArabic?"تجارية":"Spaces"}
            </span>
          
        </div>

        {/* Description */}
        <div className={`max-w-xl ${isArabic ? "border-r pr-6 text-right" : "border-l pl-6"} border-slate-800`}>
          <p className="text-slate-400 text-xs md:text-sm font-semibold leading-snug">
            {isArabic
              ? "نوفر محلات تجارية بمواقع مميزة تناسب مختلف الأنشطة التجارية."
              : "We offer retail spaces in prime locations suitable for various business activities."}
          </p>
        </div>
      </div>
    </header>
  );
}