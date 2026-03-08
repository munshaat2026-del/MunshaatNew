import OfficesHeader from "@/app/components/pagescomponents/offices/OfficesHeader";
import OfficesGrid from "@/app/components/pagescomponents/offices/OfficesGrid";
import { getAllRealEstatesByTypeByLocale } from "@/app/server/real_estates/services";
import { Locale } from "@/types";
import OfficeFilterSidebar from "@/app/components/pagescomponents/offices/OfficesFilter";
import PaginationShadcn from "@/components/PaginationsComponent";
import { Building2, SearchX } from "lucide-react";
import Link from "next/link";

type filter = {
  minSize?: number;
  maxSize?: number;
  minPrice?: number;
  maxPrice?: number;
  floor?: number;
  page?: number;
};

interface Props {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<filter>;
}

export default async function OfficesListing({ params, searchParams }: Props) {
  const filter = await searchParams;
  const page = filter.page ? Number(filter.page) : 1;
  const locale = (await params).locale;
  const isArabic = locale === "ar";

  // Data Fetching
  const offices = await getAllRealEstatesByTypeByLocale(
    "office",
    locale,
    page,
    filter,
  );
  const primaryColor = "#0c479a";

  const hasOffices = offices?.data && offices.data.length > 0;

  return (
    <div className="min-h-screen mt-24 bg-slate-50/50 text-slate-900 font-sans pb-20">
      <OfficesHeader primaryColor={primaryColor} locale={locale} />
      {/* 1. Fixed/Sticky Header & Search Section */}

      <div className="w-full mx-auto px-6 md:px-12 mt-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* 2. Sticky Sidebar Container */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-20">
              <div className="bg-white border-l-4 border-[#0c479a] shadow-sm p-1">
                <OfficeFilterSidebar locale={locale} />
              </div>
            </div>
          </aside>

          {/* 3. Main Content Area */}
          <main className="flex-1">
            {hasOffices ? (
              <div className="space-y-12">
                {/* Result Count HUD */}
                <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {isArabic ? (
                      <>
                        عرض{" "}
                        <span className="text-[#0c479a]">
                          {offices.data.length}
                        </span>{" "}
                        مكاتب مميزة
                      </>
                    ) : (
                      <>
                        Showing{" "}
                        <span className="text-[#0c479a]">
                          {offices.data.length}
                        </span>{" "}
                        Premium Offices
                      </>
                    )}
                  </p>

                  <div className="flex gap-2 items-center text-[10px] font-bold text-slate-400 uppercase italic">
                    <Building2 size={14} />
                    {isArabic
                      ? "الأصول المدارة من REEAC"
                      : "REEAC Assets Managed"}
                  </div>
                </div>

                <OfficesGrid
                  offices={offices.data}
                  locale={locale}
                  primaryColor={primaryColor}
                />

                {/* 4. Centered Pagination */}
                <div className="flex justify-center pt-10 border-t border-slate-100">
                  <div className="bg-white px-6 py-2 shadow-sm border border-slate-100 rounded-full">
                    <PaginationShadcn totalPages={offices.totlaPages} locale={locale} />
                  </div>
                </div>
              </div>
            ) : (
              /* 5. Enhanced Empty State */
              <div className="flex flex-col items-center justify-center py-24 px-6 bg-white border-2 border-dashed border-slate-200 rounded-2xl text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <SearchX size={40} className="text-slate-300" />
                </div>

                <h3 className="text-2xl font-black uppercase italic text-slate-900 tracking-tight">
                  {isArabic ? "لا توجد مكاتب" : "No Offices"}{" "}
                  <span className="text-[#0c479a]">
                    {isArabic ? "متوفرة." : "Found."}
                  </span>
                </h3>

                <p className="text-slate-500 text-sm max-w-xs mt-3 font-medium">
                  {isArabic
                    ? "لم نتمكن من العثور على أي عقارات تطابق الفلاتر الحالية. حاول تعديل المعايير أو إعادة تعيين الفلاتر."
                    : "We couldn't find any properties matching your current filters. Try adjusting your criteria or clearing all filters."}
                </p>

                <Link
                  href={`/${locale}/offices`}
                  className="mt-8 px-8 py-3 bg-[#0c479a] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-900 transition-all shadow-lg"
                >
                  {isArabic ? "إعادة تعيين جميع الفلاتر" : "Reset All Filters"}
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
