import { useFormContext } from "react-hook-form";
import ImageUploader from "@/components/ImageUpload";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

import z from "zod";
import { requestSchema } from "@/app/server/parkingsRequests/validators";
import { Locale } from "@/types";

type ParkingRequestFormValues = z.infer<ReturnType<typeof requestSchema>>;
function MediaSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ParkingRequestFormValues>();
  const handleUploadComplete = (url: string) => {
    setValue("identity_image", url, { shouldValidate: true });
    setValue("license_image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full lg:w-[95%]">
      <div className="w-full">
        <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2 ">
          {isArabic ? "صورة الهوية" : "Identity Image"}
        </Label>
        <ImageUploader
          initialImageUrl={watch("identity_image")}
          endpoint="parkingRequest"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
        {errors.identity_image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            {isArabic ? "صورة الهوية مطلوبة" : "Identity Image is required"}
          </p>
        )}
      </div>
      <div className="w-full">
        <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2 ">
          {isArabic ? "صورة رخصة القيادة" : "License Image"}
        
        </Label>
        <ImageUploader
          initialImageUrl={watch("license_image")}
          endpoint="parkingRequest"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />
        {errors.license_image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
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
