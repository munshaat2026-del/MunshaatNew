import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { TenderSchema } from "@/app/server/tenders/validators";
import FormDateInput from "@/components/inputs/DateInput";

type TenderFormValues = z.infer<typeof TenderSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useFormContext<TenderFormValues>();
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

      <FormDateInput
        label="Opening Date"
        name="opening_date"
        control={control}
        error={errors.opening_date}
      />
      <FormDateInput
        label="Closing Date"
        name="closing_date"
        control={control}
        error={errors.closing_date}
      />
    </div>
  );
}

export default BasicInfo;
