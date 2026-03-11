import { MapPin } from "lucide-react";

interface HeaderProps {
  locale: "en" | "ar";
  primaryColor: string;
  name: string;
  address: string;
}

export const BookingHeader = ({
  locale,
  primaryColor,
  name,
  address,
}: HeaderProps) => {
  const isAr = locale === "ar";

  return (
    <header
      className="mb-16 border-b border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-end gap-6"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-[1px]"
            style={{ backgroundColor: primaryColor }}
          ></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
            {isAr
              ? "مواصفات الأصول // وحدة 1204"
              : "Asset Specification // Unit 1204"}
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase    ">
          <span className="" >
            {name}
          </span>
        </h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <MapPin size={14} style={{ color: primaryColor }} />
          {address}
        </p>
      </div>
      <div className="text-right hidden md:block">
        <p className="text-xl font-black text-green-600 uppercase ">
          {isAr ? "متاح" : "Available"}
        </p>
      </div>
    </header>
  );
};
