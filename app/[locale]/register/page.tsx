"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { registerAction } from "./(actions)/registerAction";
import { newUserSchema } from "@/app/server/users/validators";
import { toast } from "sonner";

import { GoogleLogin } from "@/components/loginComponents/GoogleLoginComponent";
import FormActions from "@/components/registerComponents/FormActions";
import BasicInfo from "@/components/registerComponents/BasicInfo";

const clientRegisterSchema = newUserSchema;
type FormValues = z.infer<typeof clientRegisterSchema>;

export default function RegisterForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit
  }= methods

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await registerAction(data);
      if (!result.success) {
        toast.error(result.message ?? "Could not create account.");
        return;
      }
      
      const signInResult = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error("Account created, but please log in manually.");
        return;
      }

      toast.success("Welcome to the platform!");
      window.location.href = "/";
    } catch (err) {
      toast.error("A system error occurred. Please try again.");
    }
  };

  return (
    <FormProvider {...methods}>
       <main className="min-h-screen bg-slate-50  flex items-center justify-center p-6 py-12">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1  bg-[#0c479a]" />

      <div className="w-full max-w-2xl relative">
        <div className="bg-white border-l-8 border-[#0c479a] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 md:p-12">
          
          {/* Header */}
          <div className="mb-10">
          
            <h1 className="text-4xl font-black uppercase italic tracking-tight text-slate-900">
              Create <span className="text-[#0c479a]">Account.</span>
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Grid */}
            <BasicInfo/>

            {/* Submit Button */}
            <FormActions/>

            {/* Alternative Actions */}
            <GoogleLogin/>
          </form>
        </div>

      </div>
    </main>
    </FormProvider>
   
  );
}