"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";
import { clientsSchema } from "@/app/server/clients/validators";
import TextInput from "@/components/inputs/TextInput";

type ClientsFormValues = z.infer<typeof clientsSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ClientsFormValues>();

  return (
    <section className="w-full" >
  
      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
        <TextInput
          register={register("name_en")}
          label="English Name"
          error={errors.name_en}
          className="w-full" 
        />
        
        <TextInput
          register={register("name_ar")}
          label="Arabic Name"
          error={errors.name_ar}
          className="w-full"
          dir="rtl" 
        />
      </div>
    </section>
  );
}

export default BasicInfo;