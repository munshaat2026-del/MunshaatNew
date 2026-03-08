import { useFormContext } from "react-hook-form";
import { ourteamSchema } from "@/app/server/ourTeam/validators";
import ImageUploader from "../../ImageUpload";
import { toast } from "sonner";

import z from "zod";

type OurTeamFormValues = z.infer<typeof ourteamSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<OurTeamFormValues>();
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
              <label className="text-base text-black mb-2">Member Image</label>
              <ImageUploader
                endpoint="ourTeam"
                initialImageUrl={watch("image")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600">Image is required</p>
              )}
            </div>
    </div>
  );
}

export default MediaSection;
