"use client";

import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/app/server/users/validators";
import { toast } from "sonner";

import { GoogleLogin } from "@/components/loginComponents/GoogleLoginComponent";
import FormActions from "@/components/loginComponents/FormActions";
import BasicInfo from "@/components/loginComponents/BasicInfo";

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/admin/dashboard",
        email: data.email,
        password: data.password,
      });

      if (!result?.ok) {
        toast.error("Login failed. Please check your email and password.");
      } else {
        toast.success("Welcome back!");
        window.location.href = "/admin/dashboard";
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#0c479a]" />

        <div className="w-full max-w-xl relative">
          <div className="bg-white border-l-8 border-[#0c479a] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 md:p-12">
            {/* Header */}
            <div className="mb-10">
              <p className="text-[10px] font-black uppercase  text-[#0c479a] mb-2">
                Welcome Back
              </p>
              <h1 className="text-4xl font-black uppercase  tracking-tight text-slate-900">
                Log <span className="text-[#0c479a]">In.</span>
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 w-full"
            >
              <BasicInfo />

              {/* Login Button */}
              <FormActions />

              {/* Support Links */}
              <GoogleLogin />
            </form>
          </div>
        </div>
      </main>
    </FormProvider>
  );
};

export default Login;
