"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";
import { resetPasswordSchema } from "@/app/server/users/validators";
import PasswordInput from "../inputs/PasswordInput";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResetPasswordFormValues>();

  return (
    <section className="w-full">
      {/* Responsive Grid */}
      <div className="grid grid-cols-1  gap-6 lg:gap-8 w-full">
        

       <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                 Secure Reset
               </p>
            </div>
            <h1 className="text-3xl font-black uppercase italic tracking-tight text-slate-900">
              New <span className="text-[#0c479a]">Password.</span>
            </h1>
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
