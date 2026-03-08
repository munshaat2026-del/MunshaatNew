"use client";
import { useSession } from "next-auth/react";
import { changePasswordAction } from "./(actions)/changePasswordAction";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { changePasswordSchema } from "@/app/server/users/validators";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "@/components/changePasswordComponents/PasswordBasicInfo";
import FormActions from "@/components/changePasswordComponents/PasswordFormActions";
import { toast } from "sonner";
import BackLink from "@/components/changePasswordComponents/BackLink";
import HeaderSection from "@/components/changePasswordComponents/HeaderSection";
type ChangePasswordForm = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
function ChangePasswordPage() {
  const methods = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { handleSubmit } = methods;
  const { data: session } = useSession();
  const user_id = session?.user.id;
  const onSubmit: SubmitHandler<ChangePasswordForm> = async (data) => {
    if (!user_id) {
      toast.error(
        "We couldn't verify your session. Please try logging in again.",
      );
      return;
    }
    try {
      const result = await changePasswordAction(
        data.oldPassword,
        data.password,
        session.user.id,
      );
      if (result.status !== 201) {
        toast.error(
          result.message ?? "The current password you entered is incorrect.",
        );
        return;
      }
      toast.success("Your password has been successfully updated.");
    } catch (err) {
      toast.error("A system error occurred. Please try again later.");
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
           <HeaderSection/>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Current Password */}
              <BasicInfo />
              {/* Submit Button */}
              <FormActions />
              {/* Navigation Link */}
              <div className="text-center pt-6 border-t border-slate-100">
                <BackLink/>
              </div>
            </form>
          </div>
        </div>
      </main>
    </FormProvider>
  );
}

export default ChangePasswordPage;
