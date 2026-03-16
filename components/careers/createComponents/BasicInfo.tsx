import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { careersSchema } from "@/app/server/careers/validators";
import MultiInputForm from "@/components/inputs/MultiInput";

type CareerFormValues = z.infer<typeof careersSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useFormContext<CareerFormValues>();
  const watchedName = watch("position_en");
  useEffect(() => {
    const slug = (watchedName ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", slug, { shouldDirty: false, shouldValidate: false });
  }, [watchedName, setValue]);

  console.log("req: ",watch("requirements_en"));
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] gap-0 lg:gap-5">
      <TextInput
        register={register("position_en")}
        label="Position (EN)"
        error={errors.position_en}
      />
      <TextInput
        register={register("position_ar")}
        label="Position (AR)"
        error={errors.position_ar}
      />

      <TextareaInput
        register={register("description_en")}
        label="Description (EN)"
        error={errors.description_en}
      />
      <TextareaInput
        register={register("description_ar")}
        label="Description (AR)"
        error={errors.description_ar}
      />

      <TextInput
        register={register("experience_en")}
        label="Experience (EN)"
        error={errors.experience_en}
      />
      <TextInput
        register={register("experience_ar")}
        label="Experience (AR)"
        error={errors.experience_ar}
      />

      <TextInput
        register={register("role_en")}
        label="Role (EN)"
        error={errors.role_en}
        placeholder="e.g Full Time"
      />
      <TextInput
        register={register("role_ar")}
        label="Role (AR)"
        error={errors.role_ar}
        
      />

      <MultiInputForm
        control={control}
        label="Requirements (EN)"
        name="requirements_en"
        error={errors.requirements_en}
        placeholder=""
      />
      <MultiInputForm
        control={control}
        label="Requirements (AR)"
        name="requirements_ar"
        error={errors.requirements_ar}
        placeholder=""
      />
    </div>
  );
}

export default BasicInfo;
