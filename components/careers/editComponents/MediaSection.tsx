import { useFormContext } from "react-hook-form";
import { careersSchema } from "@/app/server/careers/validators";
import ImageUploader from "../../ImageUpload";
import { toast } from "sonner";

import z from "zod";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

type CareerFormValues = z.infer<typeof careersSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CareerFormValues>();
  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-[95%]">
      <div className="flex flex-col w-full md:w-1/2">
        <Label className="block text-sm font-semibold text-gray-700 mb-2 ml-2">
          Career Image
        </Label>
        <ImageUploader
          initialImageUrl={watch("image")}
          endpoint="careers"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
        />

        {errors.image && (
          <p className="mt-1 text-xs flex flex-row gap-2 text-red-600">
            <AlertCircle size={12} className="text-red-600 mt-0.5" />
            <span>Image is required</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default MediaSection;
