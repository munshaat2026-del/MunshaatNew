import { useFormContext } from "react-hook-form";
import { applicantSchema } from "@/app/server/applications/validators";
import FileUploader from "@/components/FileUploader";

import z from "zod";
import { Dock } from "lucide-react";
import { Locale } from "@/types";

type ApplicationFormValues = z.infer<ReturnType<typeof applicantSchema>>;
function MediaSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const {
    formState: { errors },
    control,
  } = useFormContext<ApplicationFormValues>();

  return (
    <div className="grid grid-cols-1 gap-6 w-full lg:w-[95%]">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <Dock size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "السيرة الذاتية" : "CV"}
          </label>
        </div>
        <FileUploader
          label=""
          name="cv"
          control={control}
          error={errors.cv}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default MediaSection;
