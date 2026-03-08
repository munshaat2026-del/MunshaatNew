import TextareaInput from "@/components/inputs/TextareaInput";
import TextInput from "@/components/inputs/TextInput";
import FormCheckbox from "@/components/inputs/CheckBoxInput";
import { useFormContext } from "react-hook-form";
import z from "zod";
import { ourteamSchema } from "@/app/server/ourTeam/validators";

type OurTeamFormValues = z.infer<typeof ourteamSchema>;

function BasicInfo() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<OurTeamFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl gap-6 ">
      
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 md:col-span-2">
       <div>
  <h3 className="text-lg font-medium text-gray-900">Member Profile</h3>
  <p className="text-sm text-gray-500">
    Configure the display information and featured status for this team member.
  </p>
</div>
        <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
          <FormCheckbox
            name="main"
            error={errors.main}
            label="Main Member"
            control={control}
          />
        </div>
      </div>

      <TextInput
        register={register("name_en")}
        label="Name (EN)"
        error={errors.name_en}
        className="w-full lg:w-[95%]"
      />
      <TextInput
        register={register("name_ar")}
        label="Name (AR)"
        error={errors.name_ar}
        className="w-full lg:w-[95%]"
        dir="rtl" 
      />

      <TextInput
        register={register("position_en")}
        label="Position (EN)"
        error={errors.position_en}
        className="w-full lg:w-[95%]"
      />
      <TextInput
        register={register("position_ar")}
        label="Position (AR)"
        error={errors.position_ar}
        className="w-full lg:w-[95%]"
        dir="rtl" 
      />

      <div className="md:col-span-2">
        <TextareaInput
          register={register("description_en")}
          label="English Description"
          error={errors.description_en}
          className="w-full lg:w-[95%]"
        />
      </div>
      
      <div className="md:col-span-2">
        <TextareaInput
          register={register("description_ar")}
          label="Arabic Description"
          error={errors.description_ar}
          className="w-full lg:w-[95%] "
          dir="rtl" 
        />
      </div>
    </div>
  );
}

export default BasicInfo;