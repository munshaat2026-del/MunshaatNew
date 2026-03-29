import { useFormContext } from "react-hook-form";
import { ParkingSchema } from "@/app/server/parkings/validators";
import ImageUploader from "../../ImageUpload";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

import z from "zod";

type ParkingFormValues = z.infer<typeof ParkingSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ParkingFormValues>();
  const handleUploadComplete = (url: string) => {
    setValue("image", url, {  shouldDirty: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-[95%]">
      <div className="w-full">
        <Label className="block text-sm  font-semibold text-gray-700 mb-1 ml-2 ">
          Image
        </Label>
        <ImageUploader
          initialImageUrl={watch("image")}
          endpoint="parkings"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          locale="en"
          
        />
        {errors.image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            Image is required
          </p>
        )}
      </div>
    </div>
  );
}

export default MediaSection;
