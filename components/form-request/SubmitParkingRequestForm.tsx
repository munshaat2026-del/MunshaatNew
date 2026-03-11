"use client";
import {
  ParkingsGetPayloadPartially,
  ParkingRequestsCreateInput,
} from "@/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { requestSchema } from "@/app/server/parkingsRequests/validators";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import BasicInfo from "./BasicInfo";
import FormActions from "./FormActions";
import HeaderSection from "./HeaderSection";
import ParkingSummary from "./ParkingSummary";
import MediaSection from "./MediaSection";
import { useRouter } from "next/navigation";

type ParkingRequestFormValues = z.infer<ReturnType<typeof requestSchema>>;
interface Props {
  parkingData: ParkingsGetPayloadPartially;
  locale: "en" | "ar";
  action: (
    data: ParkingRequestsCreateInput,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  parkingId: string;
}

function SubmitForm({
  action,
  parkingId,
  locale,
  parkingData
}: Props) {
  const isArabic = locale === "ar";
  const methods = useForm<ParkingRequestFormValues>({
    resolver: zodResolver(requestSchema(isArabic)),
  });

  const router= useRouter()
  const { setValue,handleSubmit } = methods;
    setValue("parking_id", parkingId);

  const onSubmit: SubmitHandler<ParkingRequestFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.success) {
         toast.success(result.message);
         router.replace("/")
         return
      }
      return toast.error(result.message);
    } catch (error) {
      toast.error(
        isArabic
          ? "حدث خطأ غير متوقع في النظام"
          : "An unexpected system error occurred.",
      );
    }
  };

  return(
    <FormProvider {...methods}>
      <div 
        className="max-w-[95%] rounded-md mx-auto bg-white border border-slate-100 shadow-2xl overflow-hidden" 
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Form Header */}
        <HeaderSection locale={locale} />
        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-x divide-slate-100 rtl:divide-x-reverse">
          
          {/* LEFT: The Request Form */}
          <div className="lg:col-span-7 p-8 md:p-16 bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <BasicInfo locale={locale} />
               <MediaSection locale={locale} />
              <FormActions locale={locale} />
             
            </form>
          </div>

          {/* RIGHT: Asset Specification Passport */}
          <div className="lg:col-span-5 bg-slate-50/50">
             <ParkingSummary data={parkingData} locale={locale} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default SubmitForm;
