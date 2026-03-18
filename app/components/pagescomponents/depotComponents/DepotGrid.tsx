import Link from "next/link";
import DepotCard from "./DepotCard"; 
import { Locale, type TranslatedRaelEstate } from "@/types/index"

interface DepotsGridProps {
  locale: Locale;
  depots: TranslatedRaelEstate[]; 
  primaryColor: string;
}

export default function DepotsGrid({ depots, primaryColor, locale }: DepotsGridProps) {
  const isArabic = locale === "ar";
  
  return (
    <main className="py-20 max-w-7xl mx-auto">
      {/* Grid Header with Industrial Context */}
      <div className="flex justify-between items-baseline mb-12" dir={isArabic ? "rtl" : "ltr"}>
        <h2 className="text-2xl font-black uppercase tracking-tight  ">
          {isArabic ? "مستودعات التخزين المتاحة" : "Available Storage Units"}
          <span className="text-slate-500 mx-4 text-lg">
            ({depots.length})
          </span>
        </h2>
        <div className="hidden md:block h-px flex-1 bg-slate-200 mx-8"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {depots.map((depot, index) => (
          <Link 
            key={depot.id || index} 
            href={`/${locale}/depot/${depot.slug || depot.id}`} 
            className="group block"
          >
            <DepotCard
              locale={locale}
              depot={depot} 
              primaryColor={primaryColor}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}