import { useFormContext } from "react-hook-form";
import { comingSoonSchema } from "@/app/server/coming_soon/validators";
import ImageUploader from "../../ImageUpload";
import { toast } from "sonner";

import z from "zod";
import { AlertCircle } from "lucide-react";

type ComingSoonFormValues = z.infer<typeof comingSoonSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ComingSoonFormValues>();
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
              <label className=" text-sm font-semibold text-gray-700 mb-1 ml-2">Image</label>
              <ImageUploader
                endpoint="ourTeam"
                initialImageUrl={watch("image")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className="mt-1 text-xs flex flex-row gap-2 text-red-600">
                    <AlertCircle size={12} className="text-red-600 mt-0.5" />
                   <span> 
                    Image is required</span></p>
              )}
            </div>
    </div>
  );
}

export default MediaSection;
