import { useFormContext } from "react-hook-form";
import ImageUploader from "../../ImageUpload";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

import z from "zod";
import { clientsSchema } from "@/app/server/clients/validators";

type ClientFormValues = z.infer<typeof clientsSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ClientFormValues>();
  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full lg:w-[95%]">
      <div className="w-full">
        <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2 ">
          Logo
        </Label>
        <ImageUploader
          initialImageUrl={watch("logo")}
          endpoint="parkings"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          
        />
        {errors.logo && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            Logo is required
          </p>
        )}
      </div>
    </div>
  );
}

export default MediaSection;
