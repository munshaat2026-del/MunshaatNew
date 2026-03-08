"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormSelect from "../inputs/SelectorInput";
import TextInput from "../inputs/TextInput";
import {Button} from "../ui/button";


interface Props {
  initialName?: string;
  initialPhoneNumber?:string;
  initialEmail?:string;
  initialRequestId?: string;
}

interface ApplicationsFilterFormValues {
  name: string;
  phoneNumber: string;
  email?: string;
  requestId:string;
}

export default function RequestsFilter({
  initialName,
  initialEmail,
  initialPhoneNumber,
  initialRequestId,
}: Props) {
  const { handleSubmit, control, register } =
    useForm<ApplicationsFilterFormValues>({
      defaultValues: {
        name: initialName,
        email: initialEmail,
        phoneNumber: initialPhoneNumber,
        requestId: initialRequestId
      },
    });

  const onSubmit: SubmitHandler<ApplicationsFilterFormValues> = (data) => {
    const params = new URLSearchParams();
    if (data.name) params.set("name", data.name.toLowerCase());
    if (data.phoneNumber) params.set("phoneNumber", data.phoneNumber);
    if (data.email)
      params.set("email", data.email);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 ml-0 mr-0 lg:ml-4 lg:mr-4"
    >
      <div className="flex flex-wrap gap-4 items-start justify-start">
         <TextInput
          label="Name"
          register={register("name")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw] "
          
        />
         <TextInput
          label="Phone Number"
          register={register("phoneNumber")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw] "
          
        />

         <TextInput
          label="Email"
          register={register("email")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw] "
          
        />

        <TextInput
          label="Id"
          register={register("requestId")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw] "
          
        />
      </div>

      <div className="flex gap-2 flex-row items-start justify-start">
        <Button type="submit" disabled={false}>
          Apply
        </Button>

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
