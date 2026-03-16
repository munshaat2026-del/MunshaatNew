import { getAllRealEstatesByTypeByLocale } from "@/app/server/real_estates/services";
import { Locale } from "@/types";
import OfficeFilterSidebar from "@/app/components/pagescomponents/offices/OfficesFilter";
import PaginationShadcn from "@/components/PaginationsComponent";
import { Package, SearchX } from "lucide-react"; // Using Package for Depots
import Link from "next/link";
import DepotGrid from "@/app/components/pagescomponents/depotComponents/DepotGrid";
import DepotsHeader from "@/app/components/pagescomponents/depotComponents/DepotHeader";
import { generatePageMetadata } from "@/lib/constants/metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("depots", (await params).locale);
}

type Filter = {
  minSize?: number;
  maxSize?: number;
  minPrice?: number;
  maxPrice?: number;
  floor?: number;
  page?: number;
};

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Filter>;
}

export default async function DepotsPage({ params, searchParams }: Props) {
  const filter = await searchParams;
  const page = filter.page ? Number(filter.page) : 1;
  const locale = (await params).locale;
  const isArabic = locale === "ar";

  const depots = await getAllRealEstatesByTypeByLocale(
    "depot",
    locale,
    page,
    filter,
  );
  
  const primaryColor = "#0c479a";
  const hasDepots = depots?.data && depots.data.length > 0;

  return (
    <div className="min-h-screen mt-24 bg-slate-50/50 text-slate-900 font-sans pb-20">
      <DepotsHeader primaryColor={primaryColor} locale={locale} />

      <div className="w-full mx-auto px-6 md:px-12 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* 1. Sidebar Container */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="static lg:sticky lg:top-20">

              <div className="bg-white  border-l-4 border-[#0c479a] shadow-sm p-0 lg:p-1">
                <OfficeFilterSidebar locale={locale} />
              </div>
            </div>
          </aside>

          {/* 2. Main Content Area */}
          <main className="flex-1">
            {hasDepots ? (
              <div className="space-y-12">
                {/* Result Count HUD */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {isArabic ? (
                      <>
                        عرض{" "}
                        <span className="text-[#0c479a]">
                          {depots.data.length}
                        </span>{" "}
                        مستودعات تخزين مميزة
                      </>
                    ) : (
                      <>
                        Showing{" "}
                        <span className="text-[#0c479a]">
                          {depots.data.length}
                        </span>{" "}
                        Premium Storage Depots
                      </>
                    )}
                  </p>

                  <div className="flex gap-2 items-center text-[10px] font-bold text-slate-400 uppercase italic">
                    <Package size={14} />
                    {isArabic
                      ? "أصول الخدمات اللوجستية"
                      : "Managed Logistics Assets"}
                  </div>
                </div>

                <DepotGrid
                  depots={depots.data} 
                  locale={locale}
                  primaryColor={primaryColor}
                />

                {/* 3. Pagination */}

                {depots.totlaPages>1 && <div className="flex justify-center pt-10 border-t border-slate-100">
                  <div className="bg-white px-6 py-2 shadow-sm border border-slate-100 rounded-full">
                    <PaginationShadcn totalPages={depots.totlaPages} locale={locale} />
                  </div>
                </div>}
              </div>
            ) : (
              /* 4. Empty State */
              <div className="flex flex-col items-center justify-center py-24 px-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <SearchX size={40} className="text-slate-300" />
                </div>

                <h3 className="text-2xl font-black uppercase  text-slate-900 tracking-tight">
                  {isArabic ? "لا توجد مستودعات" : "No Depots"}{" "}
                  <span className="text-[#0c479a]">
                    {isArabic ? "متوفرة حالياً." : "Found."}
                  </span>
                </h3>

                <p className="text-slate-500 text-sm max-w-xs mt-3 font-medium">
                  {isArabic
                    ? "لم نتمكن من العثور على أي مستودعات تطابق الفلاتر الحالية. حاول تعديل البحث."
                    : "We couldn't find any depots matching your current filters. Try adjusting your criteria."}
                </p>

                <Link
                  href={`/${locale}/depots`}
                  className="mt-8 px-8 py-3 bg-[#0c479a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-lg"
                >
                  {isArabic ? "إعادة تعيين البحث" : "Reset Search"}
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}