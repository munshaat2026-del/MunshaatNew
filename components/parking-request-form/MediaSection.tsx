import { useFormContext } from "react-hook-form";
import ImageUploader from "@/components/ImageUpload";
import { toast } from "sonner";
import z from "zod";
import { requestSchema } from "@/app/server/parkingsRequests/validators";
import { Locale } from "@/types";
import { AiOutlineIdcard } from "react-icons/ai";
import { RxIdCard } from "react-icons/rx";
import { AlertCircle } from "lucide-react";

type ParkingRequestFormValues = z.infer<ReturnType<typeof requestSchema>>;
function MediaSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ParkingRequestFormValues>();
  const handleUploadComplete = (
    field: "identity_image" | "license_image",
    url: string,
  ) => {
    setValue(field, url, { shouldValidate: true });
    setValue(field, url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-[95%]">
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2.5  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <AiOutlineIdcard size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "صورة الهوية" : "Identity Image"}
          </label>
        </div>
        <ImageUploader
          initialImageUrl={watch("identity_image")}
          endpoint="parkingRequest"
          onUploadComplete={(res) => {
            handleUploadComplete("identity_image", res);
          }}
          onUploadError={handleUploadError}
          locale={locale}
        />
        {errors.identity_image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            <AlertCircle size={12} className="text-red-600 mt-0.5" />
            {isArabic ? "صورة الهوية مطلوبة" : "Identity Image is required"}
          </p>
        )}
      </div>
      <div className="w-full">
        <div className="flex items-center gap-2 mb-2.5  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <RxIdCard size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "صورة رخصة القيادة" : "License Image"}
          </label>
        </div>
        <ImageUploader
          initialImageUrl={watch("license_image")}
          endpoint="parkingRequest"
          onUploadComplete={(res) => {
            handleUploadComplete("license_image", res);
          }}
          onUploadError={handleUploadError}
          locale={locale}
        />
        {errors.license_image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            <AlertCircle size={12} className="text-red-600 mt-0.5" />
            {isArabic
              ? "صورة رخصة القيادة مطلوبة"
              : "License Image is required"}
          </p>
        )}
      </div>
    </div>
  );
}

export default MediaSection;
