"use client";
import { useSearchParams } from "next/navigation";
import { resetPasswordAction } from "./(actions)/resetPasswordAction";
import { toast } from "sonner";
import { FormProvider,SubmitHandler,useForm } from "react-hook-form";
import {resetPasswordSchema} from "@/app/server/users/validators"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "@/components/resetPasswordComponents/BasicInfo";
import FormActions from "@/components/resetPasswordComponents/FormActions";
import BackLink from "@/components/resetPasswordComponents/BackLink";

type ResetPasswordFromValues= z.infer<typeof resetPasswordSchema>
function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const methods =useForm<ResetPasswordFromValues>(
    {resolver:zodResolver(resetPasswordSchema)}
  )
  const {handleSubmit} = methods
  const onSubmit:SubmitHandler<ResetPasswordFromValues> = async (data) => {    
    if (!token) {
      toast.error("This reset link appears to be invalid or expired.");
      return;
    }
    try {
      const result = await resetPasswordAction(token, data.password);
      if (result.status === 201) {
        toast.success("Success! Your password has been updated. Redirecting to login...");
      } else {
        toast.error(result.message || "We couldn't update your password at this time.");
      }
    } catch (err) {
      toast.error("A system error occurred. Please try again later.");
    }
  };

  return (
    <FormProvider {...methods} >
       <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#0c479a]" />

      <div className="w-full max-w-xl relative">
        <div className="bg-white border-l-8 border-[#0c479a] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header And Inputs */}
           <BasicInfo/>
            {/* Action Button */}
            <FormActions/>
            {/* Footer Navigation */}
           <BackLink/>
          </form>
        </div>

       
      </div>
    </main>
    </FormProvider>
   
  );
}

export default ResetPasswordPage;