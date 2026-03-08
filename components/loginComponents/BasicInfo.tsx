import { useFormContext } from "react-hook-form";
import { loginSchema } from "@/app/server/users/validators";
import z from "zod";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";

type LoginFormValues = z.infer<typeof loginSchema>;
function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginFormValues>();

  return (
    <div className="grid grid-cols-1  w-[95%] gap-0 lg:gap-5">
      <EmailInput
        register={register("email")}
        label="Email Address"
        placeholder="Enter your email"
        error={errors.email}
        className="text-gray-700"
      />

      <PasswordInput
        register={register("password")}
        label="Password"
        placeholder="Enter your password"
        error={errors.password}
        className="text-gray-700"
      />
    </div>
  );
}

export default BasicInfo;
