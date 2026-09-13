import { Cpu, ShieldCheck, MapPin, ParkingCircle } from "lucide-react";
import { parkingdata } from "@/app/data/parkingdata";
import { Locale } from "@/types";

interface ParkingFeaturesProps {
  primaryColor: string;
  locale: Locale;
}

export default function ParkingFeatures({
  primaryColor,
  locale,
}: ParkingFeaturesProps) {
  const data = parkingdata[locale].parkingFeatures;
  const isAr = locale === "ar";

  const icons = [Cpu, ShieldCheck, MapPin, ParkingCircle];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden bg-[#0a0f1a] px-6 py-20 text-white md:px-16 md:pt-10 md:pb-28"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] "
        style={{
          backgroundImage: `
            linear-gradient(${primaryColor} 1px, transparent 1px),
            linear-gradient(90deg, ${primaryColor} 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto ">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="h-px w-12"
                style={{ backgroundColor: primaryColor }}
              />

              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                {data.meta}
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid  gap-5  md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, i) => {
            const Icon = icons[i];

            return (
              <div
                key={i}
                className={`group   rounded-3xl border shadow-sm hover:shadow-xl hover:-translate-y-1  overflow-hidden   group relative min-h-50 border-b  border-white/10 py-6 ${isAr ? "pr-6" : "pl-6"} transition-all duration-500 bg-[#e8f0fb]  lg:border-b-0 lg:border-r lg:last:border-r-0`}
              >
                {/* Number */}
                <div className="mb-6 flex items-center justify-between">
                  <Icon
                    size={40}
                    strokeWidth={1.5}
                    style={{ color: primaryColor }}
                    className="transition-transform no-flip duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className={isAr ? "text-right" : "text-left"}>
                  <h3 className="mb-2 text-lg font-black tracking-tight text-[#0c479a]">
                    {item.title}
                  </h3>

                  <p className="text-[16px] font-medium leading-7 text-[#12345b]">
                    {item.desc}
                  </p>
                </div>

                {/* Accent */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
