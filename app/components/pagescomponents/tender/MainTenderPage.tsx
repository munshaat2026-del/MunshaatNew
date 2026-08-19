import { FileText, Download, Info, Mail } from "lucide-react";
import { Locale, TranslatedTender } from "@/types";

interface Props {
  data: TranslatedTender;
  locale: Locale;
  isExpired?: boolean;
}

export default function MainTenderPage({
  data,
  locale,
  isExpired = false,
}: Props) {
  const isAr = locale === "ar";
  const contactEmail = "info@munshaat.jo";

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const t = {
    ar: {
      status: isExpired ? "العطاء غير متاح" : "عطاء نشط",
      sections: {
        overview: "نظرة عامة على العطاء",
        technical: "المواصفات الفنية",
        legal: "الشروط والضمانات",
        download: "وثائق العطاء",
      },
      cta: isExpired ? "العطاء غير متاح" : "تحميل الملف (PDF)",
      expiredMessage: "انتهى وقت التقديم لهذا العطاء.",
      noFile:
        "للحصول على تفاصيل ووثائق العطاء، يرجى التواصل معنا عبر البريد الإلكتروني.",
      contactUs: "تواصل معنا",
    },
    en: {
      status: isExpired ? "Unavailable Tender" : "Active Tender",
      sections: {
        overview: "Tender Overview",
        technical: "Technical Specifications",
        legal: "Terms & Guarantees",
        download: "Tender Documents",
      },
      cta: isExpired
        ? "Tender Unavailable"
        : "Download The File (PDF)",
      expiredMessage: "The submission period for this tender has ended.",
      noFile:
        "To obtain the tender details and documents, please contact us via email.",
      contactUs: "Contact Us",
    },
  }[isAr ? "ar" : "en"];

  const hasPdf = Boolean(data.pdf_file);

  return (
    <div
      className={`min-h-screen bg-white font-sans text-slate-900 ${
        isAr ? "text-right" : "text-left"
      } ${isExpired ? "opacity-70" : ""}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <main className="mx-auto max-w-7xl px-6 pt-9">
        <div className="mb-12 flex items-center justify-between border-b border-slate-100 pb-6">
          <div className="flex items-center gap-4">
            <span
              className={`flex items-center gap-2 border px-3 py-1 text-[11px] font-bold uppercase ${
                isExpired
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 text-slate-500"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isExpired ? "bg-red-500" : "bg-green-500"
                }`}
              />
              {t.status}
            </span>
          </div>
        </div>

        <section className="mb-16">
          <h1 className="mb-6 text-2xl font-black leading-tight text-slate-900 md:text-5xl">
            {data.name}
          </h1>

          <div
            className={`h-1.5 w-20 ${
              isExpired ? "bg-red-500" : "bg-[#0c479a]"
            }`}
          />

          {isExpired && (
            <div className="mt-6 inline-flex items-center border border-red-200 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
              {t.expiredMessage}
            </div>
          )}
        </section>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border-l-4 border-slate-900 bg-slate-50 p-6">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              {isAr ? "تاريخ الطرح" : "Open Date"}
            </p>

            <p className="text-xl font-bold">
              {formatDate(new Date(data.opening_date!))}
            </p>
          </div>

          <div className="border-l-4 border-red-600 bg-slate-50 p-6">
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              {isAr ? "آخر موعد" : "Deadline"}
            </p>

            <p className="text-xl font-bold text-red-600">
              {formatDate(new Date(data.closing_date))}
            </p>
          </div>

          <div
            className={`border-l-4 bg-slate-50 p-6 ${
              isExpired
                ? "border-slate-400"
                : "border-[#0c479a]"
            }`}
          >
            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
              {isAr ? "حالة العطاء" : "Tender Status"}
            </p>

            <p
              className={`text-xl font-black ${
                isExpired
                  ? "text-red-600"
                  : "text-[#0c479a]"
              }`}
            >
              {t.status}
            </p>
          </div>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0c479a]">
                <Info size={18} />
                {t.sections.overview}
              </h3>

              <p className="text-lg font-medium leading-relaxed text-slate-700">
                {data.description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-10 border-2 border-slate-900 bg-white px-5 py-8 md:px-8">
              <div className="mb-6 flex items-center gap-2">
                <FileText
                  size={20}
                  className={
                    isExpired
                      ? "text-red-500"
                      : "text-[#0c479a]"
                  }
                />

                <h4 className="text-sm font-black uppercase tracking-widest">
                  {t.sections.download}
                </h4>
              </div>

              {hasPdf ? (
                <>
                  <p className="mb-8 text-[10px] font-bold uppercase leading-loose text-slate-400">
                    {isAr
                      ? "تحميل الملف الكامل الذي يحتوي على جميع تفاصيل العطاء."
                      : "Download the full file containing all tender details."}
                  </p>

                  {isExpired ? (
                    <div className="flex w-full cursor-not-allowed items-center justify-between bg-slate-200 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                      {t.cta}
                      <Download size={16} />
                    </div>
                  ) : (
                    <a
                      href={data.pdf_file ?? ""}
                      download
                      className="flex w-full items-center justify-between bg-[#0c479a] px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-slate-900"
                    >
                      {t.cta}
                      <Download size={16} />
                    </a>
                  )}
                </>
              ) : (
                <div className="border border-slate-200 bg-slate-50 p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#0c479a]/10 text-[#0c479a]">
                    <Mail size={18} />
                  </div>

                  <p className="mb-5 text-sm font-medium leading-7 text-slate-600">
                    {t.noFile}
                  </p>

                  <a
                    href={`mailto:${contactEmail}`}
                    className="block break-all text-sm font-black text-[#0c479a] transition-colors hover:text-slate-900"
                  >
                    {contactEmail}
                  </a>

                  <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t.contactUs}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
