import { Locale, TranslatedMembers } from "@/types";

interface TeamRosterProps {
  primaryColor: string;
  locale: Locale;
  data: TranslatedMembers[];
}

export default function TeamRoster({
  primaryColor,
  locale,
  data,
}: TeamRosterProps) {
  const isAr = locale === "ar";

  const orderedData =
    data.length >= 3 ? [data[1], data[0], data[2]] : data;

  return (
    <section className="py-16 px-6 md:px-12 bg-[#fcfcfc]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
            {isAr ? "هيئة" : "Board of"}{" "}
            <span style={{ color: primaryColor }}>
              {isAr ? "المديرين" : "Directors"}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {orderedData.map((member, i) => (
            <div
              key={member?.id ?? i}
              className={`group ${
                i === 1 ? "md:-translate-y-6" : ""
              }`}
            >
              <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.image ?? ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={member.name ?? "Member"}
                  />
                </div>

                <div className="px-5 py-4 bg-white border-t border-slate-100">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-[#0c479a] transition-colors duration-300">
                    {member.name}
                  </h4>

                  <p className="text-[9px] font-bold text-slate-400 tracking-widest mt-1.5">
                    {member.position}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
