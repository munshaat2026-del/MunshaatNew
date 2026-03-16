import { Separator } from "@/components/ui/separator"
import { Locale } from "@/types";
import { getAllTendersByLocale } from "@/app/server/tenders/services";
import MainTenderPage from "@/app/components/pagescomponents/tender/MainTenderPage";
import EmptyTenders from "@/app/components/pagescomponents/tender/EmptyTender"; 
interface Props{
  params: Promise<{locale:Locale}>
}

export default async function SingleTenderPage({params}:Props) {
  
  const {locale} = await params
  const isAr = locale === "ar";

  const response = await getAllTendersByLocale(locale);
  const tenders = response?.data || [];

  if (tenders.length === 0) {
    return <EmptyTenders locale={locale} />;
  }

  return (
    <div className="bg-white min-h-screen mt-16">
      {tenders.map((tender, i) => {
        const displayIndex = (i + 1).toString().padStart(2, '0');

        return (
          <div key={tender.id || i} className="relative group">
            
            {/* 1. MOBILE ONLY: Top-aligned index badge */}
            <div className={`md:hidden flex items-center gap-4 px-6 pt-20 ${isAr ? 'flex-row' : 'flex-row'}`}>
              <div className="bg-slate-900 text-white w-8 h-8 flex items-center justify-center text-[10px] font-black tabular-nums">
                {displayIndex}
              </div>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

           

            {/* 2. DESKTOP ONLY: The Vertical "Axis" Index */}
            <div className={`absolute top-24 ${isAr ? 'right-4 lg:right-12' : 'left-4 lg:left-12'} h-full hidden md:flex flex-col items-center z-20`}>
              <div className="bg-slate-900 text-white w-10 h-10 flex items-center justify-center text-[11px] font-black tabular-nums shadow-lg">
                {displayIndex}
              </div>
              <div className="w-px flex-1 bg-slate-100 group-last:bg-transparent mt-4 mb-4" />
              <div className="w-2 h-2 border border-slate-200 rotate-45 mb-10" />
            </div>

            {/* 3. Content Wrapper: Adaptive Padding */}
            {/* Added px-0 for mobile and kept the large padding for desktop */}
            <div className={`${isAr ? 'md:pr-24 lg:pr-32' : 'md:pl-24 lg:pl-32'}`}>
              <MainTenderPage data={tender} locale={locale} />
            </div>
            
            {i < tenders.length - 1 && (
              <div className="max-w-7xl mx-auto px-6">
                <Separator className="bg-[#0c479a] " />
              </div>
            )}
          </div>
        )
      })}
      
    </div>
  );
}