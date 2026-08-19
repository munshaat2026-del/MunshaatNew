import { Separator } from "@/components/ui/separator";
import { Locale } from "@/types";
import { getAllTendersByLocale } from "@/app/server/tenders/services";
import MainTenderPage from "@/app/components/pagescomponents/tender/MainTenderPage";
import EmptyTenders from "@/app/components/pagescomponents/tender/EmptyTender";
import { generatePageMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("tenders", (await params).locale);
}

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function SingleTenderPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const response = await getAllTendersByLocale(locale);
  const tenders = response?.data || [];
  const now = Date.now();

  if (tenders.length === 0) {
    return <EmptyTenders locale={locale} />;
  }

  return (
    <div className="mt-16 min-h-screen bg-white">
      {tenders.map((tender, i) => {
        const displayIndex = (i + 1).toString().padStart(2, "0");

        const isExpired = tender.closing_date
          ? new Date(tender.closing_date).getTime() < now
          : false;

        return (
          <div key={tender.id || i} className="group relative">
            <div className="flex items-center gap-4 px-6 pt-20 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center bg-slate-900 text-[10px] font-black tabular-nums text-white">
                {displayIndex}
              </div>

              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div
              className={`absolute top-24 ${
                isAr ? "right-4 lg:right-12" : "left-4 lg:left-12"
              } z-20 hidden h-full flex-col items-center md:flex`}
            >
              <div className="flex h-10 w-10 items-center justify-center bg-slate-900 text-[11px] font-black tabular-nums text-white shadow-lg">
                {displayIndex}
              </div>

              <div className="mt-4 mb-4 w-px flex-1 bg-slate-100 group-last:bg-transparent" />

              <div className="mb-10 h-2 w-2 rotate-45 border border-slate-200" />
            </div>

            <div
              className={
                isAr
                  ? "md:pr-24 lg:pr-32"
                  : "md:pl-24 lg:pl-32"
              }
            >
              <MainTenderPage
                data={tender}
                locale={locale}
                isExpired={isExpired}
              />
            </div>

            {i < tenders.length - 1 && (
              <div className="mx-auto max-w-7xl px-6">
                <Separator className="bg-[#0c479a]" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
