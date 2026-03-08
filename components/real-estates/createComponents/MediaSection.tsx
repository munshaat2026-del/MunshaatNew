import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { RealEstateSchema } from "@/app/server/real_estates/validators";
import ImageUploader from "../../ImageUpload";
import { Label } from "@radix-ui/react-dropdown-menu";
import GalleryUploader from "@/components/GalleryUploader";
import { toast } from "sonner";

import z from "zod";

type RealEstatesFormValues = z.infer<typeof RealEstateSchema>;
function MediaSection() {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<RealEstatesFormValues>();
  const [images, setImages] = useState<{ image_url: string }[]>([]);

  const watchedRealEstatesImages = watch("real_estates_images");
  useEffect(() => {
    setImages(watchedRealEstatesImages ?? []);
  }, [watchedRealEstatesImages]);

  const handleUploadComplete = (url: string) => {
    setValue("cover_image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-[95%]">
      <div className="w-full">
        <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2 ">
          Cover Image
        </Label>
        <ImageUploader
          initialImageUrl={watch("cover_image")}
          endpoint="realEstates"
          onUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          
        />
        {errors.cover_image && (
          <p className="mt-1 text-xs text-red-600 flex items-center  gap-2 ml-2 ">
            Image is required
          </p>
        )}
      </div>
      <div>
        <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
          Gallery
        </Label>
        <GalleryUploader
          endpoint="realEstates"
          value={images}
          onChange={(imgs: { image_url: string }[]) => {
            setImages(imgs ?? []);
            setValue("real_estates_images", imgs ?? [], {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          onUploadError={(err: Error) => toast.error(err.message)}
        />
      </div>
    </div>
  );
}

export default MediaSection;
