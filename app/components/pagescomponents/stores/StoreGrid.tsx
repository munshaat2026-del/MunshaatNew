import Link from "next/link";
import StoreCard from "./StoreCard"; // You can rename this to StoreCard later for consistency
import { Locale, type TranslatedRaelEstate } from "@/types/index"

interface StoresGridProps {
  locale: Locale;
  stores: TranslatedRaelEstate[]; // Changed prop name from offices to stores
  primaryColor: string;
}

export default function StoresGrid({ stores, primaryColor, locale }: StoresGridProps) {
  const isArabic = locale === "ar";
  
  return (
    <main className="py-20 max-w-7xl mx-auto">
      
      <div className="flex justify-between items-baseline mb-12" dir={isArabic ? "rtl" : "ltr"}>
        <h2 className="text-2xl font-black uppercase tracking-tight italic">
          {isArabic ? "المساحات التجارية المتاحة" : "Available Retail Units"}
          <span className="text-slate-500 mx-4 text-lg">
            ({stores.length})
          </span>
        </h2>
        <div className="hidden md:block h-[1px] flex-1 bg-slate-200 mx-8"></div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stores.map((store, index) => (
          <Link 
            key={store.id || index} 
            href={`/${locale}/stores/${store.slug}`} 
            className="group block"
          >
            <StoreCard
              locale={locale}
              office={store} 
              primaryColor={primaryColor}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}