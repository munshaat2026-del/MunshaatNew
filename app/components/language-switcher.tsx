"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ArrowRightLeft } from "lucide-react";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  
  const isEn = locale === "en";

  const toggleLocale = () => {
    const newLocale = isEn ? "ar" : "en";
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-3">
    

      <button
        onClick={toggleLocale}
        dir="ltr"
        className="group relative flex items-center w-[100px] h-9 bg-white border border-slate-900 p-[2px] transition-all duration-500 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:6px_6px]"></div>

        <div
          className={`absolute h-[31px] w-[46px] bg-[#0c479a] transition-all duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]
            ${isEn ? "translate-x-0" : "translate-x-[48px]"}`}
        >
          <div className="absolute top-0 right-0 w-[4px] h-[4px] bg-white/20"></div>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center h-full">
          <span className={`text-[10px] font-black tracking-widest transition-colors duration-500 ${isEn ? "text-white" : "text-slate-300"}`}>
            EN
          </span>
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center h-full">
          <span className={`text-[10px] font-black tracking-widest transition-colors duration-500 ${!isEn ? "text-white" : "text-slate-300"}`}>
            AR
          </span>
        </div>

        <div 
          className="absolute bottom-0 left-0 h-[1px] bg-[#0c479a] transition-all duration-700"
          style={{ width: isEn ? '50%' : '100%', opacity: isEn ? 0 : 1 }}
        ></div>
      </button>
      
    
    </div>
  );
}