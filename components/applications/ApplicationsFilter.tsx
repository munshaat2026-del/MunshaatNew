"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormSelect from "../inputs/SelectorInput";
import { jordanCities } from "@/lib/constants/dashboardData";
import TextInput from "../inputs/TextInput";
import {Button} from "../ui/button";

interface Props {
  initialCity?: string;
  initialMinAge?: number;
  initialMaxAge?: number;
  initialApplicationId?: string;
}

interface ApplicationsFilterFormValues {
  city: string;
  minAge: number | "";
  maxAge: number | "";
  applicationId: string;
}

export default function ApplicationsFilter({
  initialCity = "",
  initialMinAge,
  initialMaxAge,
  initialApplicationId,
}: Props) {
  const { handleSubmit, control, register } =
    useForm<ApplicationsFilterFormValues>({
      defaultValues: {
        city: initialCity,
        minAge: initialMinAge ?? "",
        maxAge: initialMaxAge ?? "",
        applicationId: initialApplicationId ?? "",
      },
    });

  const onSubmit: SubmitHandler<ApplicationsFilterFormValues> = (data) => {
    const params = new URLSearchParams();

    if (data.city) params.set("city", data.city);
    if (data.minAge !== "") params.set("minAge", String(data.minAge));
    if (data.maxAge !== "") params.set("maxAge", String(data.maxAge));
    if (data.applicationId) params.set("applicationId", data.applicationId);

    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 ml-0 mr-0 lg:ml-4 lg:mr-4"
    >
      <div className="flex flex-wrap  gap-4 items-start justify-start">
        <FormSelect
          name="city"
          label="City"
          control={control}
          options={jordanCities(false)}
        />
        <TextInput
          label="Min Age"
          register={register("minAge")}
          className="sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
        />
        <TextInput
          label="Max Age"
          register={register("maxAge")}
          className="sm:w-[20vw] md:w-[15vw] lg:w-[10vw]"
        />
        <TextInput
          label="Id"
          register={register("applicationId")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw]"
        />
      </div>

      <div className="flex gap-2 flex-row items-start justify-start">
        <Button type="submit">Apply</Button>

        <Button
          type="button"
          onClick={() => (window.location.href = window.location.pathname)}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
