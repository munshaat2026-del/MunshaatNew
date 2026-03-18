"use client";
import  { useState } from "react";
import { forgotPasswordAction } from "./(actions)/forgotPasswordAction";
import { forgotPasswordSchema } from "@/app/server/reset_password_token/validators";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import EmailInput from "@/components/inputs/EmailInput";
import HeaderSection from "@/components/forgotPasswordComponents/HeaderSection";
import BackLink from "@/components/forgotPasswordComponents/BackLinks";
import FormActions from "@/components/forgotPasswordComponents/FormActions";

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordPage() {
  const methods = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = methods;
  const [success, setSuccess] = useState<boolean>(false);
  const writtenEmail= watch("email")
  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (data) => {
    try {
      const result = await forgotPasswordAction(data.email);
      if (result.status === 201 || result.status === 409) {
        setSuccess(true);
      } else {
        toast.error(
          result.message || "We couldn't find an account with that email.",
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while sending the link. Please try again.",
      );
    }
  };
  return (
    <FormProvider {...methods}>
       <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#0c479a]" />

      <div className="w-full max-w-xl relative">
        <div className="bg-white border-l-8 border-[#0c479a] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 md:p-12">
          {/* Header Section */}
          <HeaderSection success={success} />

          {!success ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <EmailInput
                register={register("email")}
                error={errors.email}
                label="Enter The Registered Email"
                className="text-gray-700"
              />
              <FormActions/>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="p-6 bg-emerald-50 border-l-4 border-emerald-500">
                <p className="text-sm text-slate-600 leading-relaxed ">
                  If an account exists for{" "}
                  <span className="font-bold text-slate-900">{writtenEmail}</span>
                  , you will receive a password reset link in your inbox
                  shortly.
                </p>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="w-full py-4 text-[10px] font-black text-slate-400 hover:text-[#0c479a] uppercase tracking-widest transition-colors border border-slate-100 hover:bg-slate-50"
              >
                Use a different email
              </button>
            </div>
          )}

          {/* Navigation Link */}
         <BackLink/>
        </div>
      </div>
    </main>
    </FormProvider>
   
  );
}

export default ForgotPasswordPage;
