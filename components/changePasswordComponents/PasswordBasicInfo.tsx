"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";
import { changePasswordSchema } from "@/app/server/users/validators";
import PasswordInput from "../inputs/PasswordInput";

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ChangePasswordFormValues>();

  return (
    <section className="w-full">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1  gap-6 lg:gap-8 w-full">
        {/* New Password */}
        <PasswordInput
          register={register("oldPassword")}
          label="Current Password"
          error={errors.oldPassword}
          className="text-gray-700"
        />

        <div className="py-2 flex items-center gap-4">
          <div className="grow border-t border-slate-100"></div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
            New Credentials
          </span>
          <div className="grow border-t border-slate-100"></div>
        </div>

        {/* Confirm Password */}
        <PasswordInput
          register={register("password")}
          label="New Password"
          error={errors.password}
          className="text-gray-700"
        />

        <PasswordInput
          register={register("confirmPassword")}
          label="Confirm Password"
          error={errors.confirmPassword}
          className="text-gray-700"
        />
        {/* Feedback Messages */}
       
       
      </div>
    </section>
  );
}

export default BasicInfo;
