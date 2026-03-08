"use client";
import {
  RequestsCreateInput,
  ParkingsGetPayloadPartially,
  RealEstateGetPayloadPartially,
} from "@/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { requestSchema } from "@/app/server/requests/validators";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import BasicInfo from "./BasicInfo";
import FormActions from "./FormActions";
import HeaderSection from "./HeaderSection";
import RealEstateSummary from "./RealEstateSummary"
import  ParkingSummary from "./ParkingSummary"

type RequestFormValues = z.infer<ReturnType<typeof requestSchema>>;
interface Props {
  parkingData?: ParkingsGetPayloadPartially;
  realEstateData?: RealEstateGetPayloadPartially;
  locale: "en" | "ar";
  action: (
    data: RequestsCreateInput,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  parkingId?: string;
  realEstateId?: string;
}

function SubmitForm({
  action,
  parkingId,
  realEstateId,
  locale,
  parkingData,
  realEstateData,
}: Props) {
  const isArabic = locale === "ar";
  const methods = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema(isArabic)),
  });

  const { setValue,handleSubmit } = methods;

  if (parkingId) {
    setValue("parking_id", parkingId)
    setValue("request_type","parkings")
  };
  if (realEstateId) {
    setValue("real_estate_id", realEstateId);
    setValue("request_type","real_estates")
  }


  const onSubmit: SubmitHandler<RequestFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.success) return toast.success(result.message);
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
              <FormActions locale={locale} />
            </form>
          </div>

          {/* RIGHT: Asset Specification Passport */}
          <div className="lg:col-span-5 bg-slate-50/50">
            {realEstateData && <RealEstateSummary data={realEstateData} locale={locale} />}
             {parkingData && <ParkingSummary data={parkingData} locale={locale} />}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default SubmitForm;
