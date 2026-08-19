import { Locale, TranslatedMembers } from "@/types";
import { aboutdata } from "@/app/data/aboutdata";

interface TeamPreviewProps {
  primaryColor: string;
  locale: Locale;
  data: TranslatedMembers[];
}

export default function TeamPreview({
  primaryColor,
  locale,
  data,
}: TeamPreviewProps) {
  const aboutData = aboutdata[locale].teamSection;
  const isAr = locale === "ar";

  return (
    <section className="py-16 px-6 bg-[#fcfcfc]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter">
            {aboutData.titlePart1}{" "}
            <span style={{ color: primaryColor }}>
              {aboutData.titlePart2}
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {data.map((member, i) => (
            <div
              key={i}
              className="group relative w-full sm:w-[260px] md:w-[240px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <img
                  src={member.image ?? ""}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={member.name ?? "Member"}
                />
              </div>

              <div
                className={`relative -mt-8 mx-4 p-4 bg-white shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-lg ${
                  isAr ? "text-right" : "text-left"
                }`}
              >
                <h4 className="text-sm font-black text-slate-900 tracking-tight">
                  {member.name}
                </h4>

                <div className="flex items-center gap-2 mt-1.5">
                  <div
                    className="w-3 h-0.5 shrink-0"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <p className="text-slate-400 text-[9px] font-bold tracking-widest">
                    {member.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
