import FormSelect from "@/components/inputs/SelectorInput";
import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import { realEstateOptions } from "@/lib/constants/dashboardData";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {RealEstateSchema} from "@/app/server/real_estates/validators"
import z from "zod";


type RealEstatesFormValues= z.infer<typeof RealEstateSchema>

function BasicInfo() {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<RealEstatesFormValues>();
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
      <FormSelect
        control={control}
        name="real_estates_type"
        label="Real Estate Type"
        options={realEstateOptions}
        error={errors.real_estates_type}
        className="col-span-1 lg:col-span-2"
      />
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
        register={register("floor_number", { valueAsNumber: true })}
        label="Floor (Number)"
        error={errors.floor_number}
      />
      <TextInput
        register={register("size_sqm",{valueAsNumber:true})}
        label="Size (sqm)"
        error={errors.size_sqm}
      />

      <TextInput
        register={register("price", { valueAsNumber: true })}
        label="Price"
        error={errors.price}
      />
    </div>
  );
}

export default BasicInfo;
