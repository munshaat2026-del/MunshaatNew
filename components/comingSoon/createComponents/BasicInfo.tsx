import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { comingSoonSchema } from "@/app/server/coming_soon/validators";
import FormDateInput from "@/components/inputs/DateInput";

type ComingSoonFormValues = z.infer<typeof comingSoonSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ComingSoonFormValues>();
 

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-[95%] gap-0 lg:gap-5">
      <TextInput
        register={register("title_en")}
        label="Name (EN)"
        error={errors.title_en}
      />
      <TextInput
        register={register("title_ar")}
        label="Name (AR)"
        error={errors.title_ar}
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
        label="Estimated Date"
        name="estimated_date"
        control={control}
        error={errors.estimated_date}
      />
     
    </div>
  );
}

export default BasicInfo;
