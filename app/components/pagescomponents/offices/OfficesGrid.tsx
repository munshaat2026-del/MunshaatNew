import Link from "next/link";
import OfficeCard from "./OfficeCard";
import {Locale, type TranslatedRaelEstate} from "@/types/index"


interface OfficesGridProps {
  locale:Locale
  offices: TranslatedRaelEstate[];
  primaryColor: string;
}

export default function OfficesGrid({ offices, primaryColor,locale }: OfficesGridProps) {
  const isArabic=locale==="ar"
  return (
    <main className="py-20  max-w-7xl mx-auto">
      <div className="flex justify-between items-baseline mb-12">
       <h2 className="text-2xl font-black uppercase tracking-tight italic">
  {isArabic ? "الوحدات المتاحة" : "Available Units"}
  <span className="text-slate-500 mx-2">
    ({offices.length})
  </span>
</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {offices.map((office,index) => (
         <Link href={`offices/${office.slug}`}>
          <OfficeCard
          locale={locale}
            key={index}
            office={office}
            primaryColor={primaryColor}
          /></Link>
        ))}
      </div>
    </main>
  );
}