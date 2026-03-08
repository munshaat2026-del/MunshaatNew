
import { useFormContext } from "react-hook-form";
import { newUserSchema } from "@/app/server/users/validators";import z from "zod";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import PasswordInput from "../inputs/PasswordInput";


type RegisterFormValues= z.infer<typeof newUserSchema>

function BasicInfo() {
  const {
    register,
    formState: { errors },

  } = useFormContext<RegisterFormValues>();
 
  return (
    <div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                register={register("first_name")}
                label="First Name"
                error={errors.first_name}
                className="text-gray-700"
              />
              <TextInput
                register={register("last_name")}
                label="Last Name"
                error={errors.last_name}
                className="text-gray-700"
              />
            </div>

            <EmailInput
              register={register("email")}
              label="Email Address"
              placeholder="name@company.com"
              error={errors.email}
              className="text-gray-700"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PasswordInput
                register={register("password")}
                label="Password"
                className="text-gray-700"
                error={errors.password}
              />
              <PasswordInput
                register={register("confirmPassword")}
                label="Confirm Password"
                className="text-gray-700"
                error={errors.confirmPassword}
              />
            </div>
    </div>
  );
}

export default BasicInfo;
