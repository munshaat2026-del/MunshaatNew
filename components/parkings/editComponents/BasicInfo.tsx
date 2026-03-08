import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import  { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { ParkingSchema } from "@/app/server/parkings/validators";


type ParkingFormValues= z.infer<typeof ParkingSchema>

function BasicInfo() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<ParkingFormValues>();
  const watchedName = watch("name_en");
  useEffect(() => {
    const slug = (watchedName ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", slug, { shouldDirty: false, shouldValidate: false });
  }, [watchedName, setValue]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] gap-0 lg:gap-5">
      <TextInput
        register={register("name_en")}
        label="Name (EN)"
        error={errors.name_en}
      />
      <TextInput
        register={register("name_ar")}
        label="Name (AR)"
        error={errors.name_ar}
        dir="rtl" 
      />
      <TextareaInput
        register={register("description_en")}
        label="Description (En)"
        error={errors.description_en}
      />
      <TextareaInput
        register={register("description_ar")}
        label="Description (AR)"
        error={errors.description_ar}
        dir="rtl" 
      />

      <TextInput
        register={register("address_en")}
        label="Address (EN)"
        error={errors.address_en}
      />
      <TextInput
        register={register("address_ar")}
        label="Address (AR)"
        error={errors.address_ar}
        dir="rtl" 
      />

      <TextInput
        register={register("location_link")}
        label="Location (Link)"
        error={errors.location_link}
      />

      <TextInput
        register={register("total_spots", { valueAsNumber: true })}
        label="Total Spots"
        error={errors.total_spots}
      />
      <TextInput
        register={register("price_monthly")}
        label="Price (Monthly)"
        error={errors.price_monthly}
      />

      <TextInput
        register={register("price_yearly", { valueAsNumber: true })}
        label="Price (Yearly)"
        error={errors.price_yearly}
      />
    </div>
  );
}

export default BasicInfo;
