import {
  Info,
  Activity,
  ArrowRight,
  Maximize,
  Layers,
  MapPin,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { TranlatedRealEstateById } from "@/types/index";
import Link from "next/link";

interface DetailsProps {
  locale: "en" | "ar";
  primaryColor: string;
  realEstate: TranlatedRealEstateById;
}

export const OfficeDetails = ({
  locale,
  primaryColor,
  realEstate,
}: DetailsProps) => {
  const isAr = locale === "ar";

  const getPricePeriod = (period: string | null) => {
    const currency = isAr ? "د.أ" : "JOD";
    if (!period) return currency;

    if (period === "monthly") {
      return isAr ? `${currency} / شهرياً` : `${currency} / MONTHLY`;
    }
    return isAr ? `${currency} / سنوياً` : `${currency} / YEARLY`;
  };

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-16"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="lg:col-span-8 space-y-16">
        <section className="space-y-6">
          <div className="flex items-center gap-4 text-[#0c479a]">
            <Info size={18} />
            <h2 className="text-[10px] font-black uppercase ">
              {isAr ? "وصف العقار" : "Property Description"}
            </h2>
          </div>

          <p
            className={`text-slate-500 text-sm font-medium leading-[2.2] max-w-3xl ${
              isAr ? "border-r-2 pr-8 text-right" : "border-l-2 pl-8 text-left"
            } border-slate-100`}
          >
            {realEstate.description}
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4 text-[#0c479a]">
            <TrendingUp size={18} />
            <h2 className="text-[10px] font-black uppercase ">
              {isAr ? "المواصفات الفنية" : "Technical Specifications"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 group hover:border-[#0c479a] transition-colors">
              <div className="p-3 bg-white rounded shadow-sm group-hover:text-[#0c479a]">
                <Maximize size={20} />
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {isAr ? "المساحة الإجمالية" : "Total Area"}
                </p>

                <p className="text-lg font-bold text-slate-900">
                  {realEstate.size_sqm}{" "}
                  <span className="text-xs font-normal">
                    {isAr ? "متر مربع" : "sqm"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 bg-slate-50 border border-slate-100 group hover:border-[#0c479a] transition-colors">
              <div className="p-3 bg-white rounded shadow-sm group-hover:text-[#0c479a]">
                <Layers size={20} />
              </div>

              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  {isAr ? " الطابق" : "Floor Level"}
                </p>

                <p className="text-lg font-bold text-slate-900">
                  {realEstate.floor_number ??
                    (isAr ? "طابق أرضي" : "Ground Floor")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div className="flex items-center gap-4 text-[#0c479a]">
            <Activity size={18} />
            <h2 className="text-[10px] font-black uppercase ">
              {isAr ? "المرافق والخدمات" : "Infrastructure Features"}
            </h2>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-0 border-t ${
              isAr ? "border-r" : "border-l"
            } border-slate-100`}
          >
            {realEstate.features.map((feature, i) => (
              <div
                key={i}
                className={`flex flex-col gap-4 p-8 ${
                  isAr ? "border-l" : "border-r"
                } border-b border-slate-100 hover:bg-slate-50 transition-colors`}
              >
                <div className="text-[#0c479a]">
                  <CheckCircle2 size={18} />
                </div>

                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="lg:col-span-4">
        <div
          className={`bg-[#0a0f1a] px-4 py-14 ${
            isAr ? "border-r-4" : "border-l-4"
          } border-[#0c479a] sticky top-32 space-y-10 shadow-2xl relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <div className="relative z-10 space-y-2">
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
              {isAr ? "الملخص المالي" : "Financial Summary"}
            </p>

            <div className="flex items-baseline gap-2 text-white  ">
              <span className="text-4xl font-black tracking-tighter">
                {realEstate.price
                  ? `${realEstate.price.toLocaleString()}`
                  : isAr
                    ? "اتصل بنا"
                    : "Contact Us"}
              </span>

              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {getPricePeriod(realEstate.price_period)}
              </span>
            </div>
          </div>

          <div className="relative z-10 space-y-10">
            {realEstate.location_link && (
              <Link
                href={realEstate.location_link}
                target="_blank"
                className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:border-[#0c479a] transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-[#0c479a]" />
                  {isAr ? "موقع العقار" : "Property Location"}
                </span>

                <ArrowRight
                  size={14}
                  className={`${
                    isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                  }  transition-transform`}
                />
              </Link>
            )}

            <Link
              href={`/request-form/${realEstate.id}`}
              className="w-full bg-[#0c479a] hover:bg-white hover:text-black text-white font-black py-6 text-[10px] uppercase  transition-all flex items-center justify-center gap-4 group"
            >
              {isAr ? "تقديم طلب إيجار" : "Apply for Rental Request"}

              <ArrowRight
                size={16}
                className={`${
                  isAr
                    ? " group-hover:-translate-x-2"
                    : "group-hover:translate-x-2"
                } transition-transform`}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
