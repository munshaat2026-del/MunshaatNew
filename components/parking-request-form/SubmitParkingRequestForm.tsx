"use client";

import { ParkingRequestsCreateInput, TranslatedParkings } from "@/types";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useWatch,
} from "react-hook-form";
import { requestSchema } from "@/app/server/parkingsRequests/validators";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import BasicInfo from "@/components/parking-request-form/BasicInfo";
import FormActions from "@/components/parking-request-form/FormActions";
import HeaderSection from "@/components/parking-request-form/HeaderSection";
import MediaSection from "@/components/parking-request-form/MediaSection";
import ParkingSummary from "@/components/parking-request-form/ParkingSummary";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CarFront, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ParkingRequestFormValues = z.infer<ReturnType<typeof requestSchema>>;

interface Props {
  parkingData: TranslatedParkings[];
  locale: "en" | "ar";
  action: (
    data: ParkingRequestsCreateInput,
  ) => Promise<{ success: boolean; status: number; message: string }>;
}

function SubmitForm({ action, locale, parkingData }: Props) {
  const isArabic = locale === "ar";
  const router = useRouter();

  const methods = useForm<ParkingRequestFormValues>({
    resolver: zodResolver(requestSchema(isArabic)),
    defaultValues: {
      parking_id: "",
    },
  });

  const {
    handleSubmit,
    control,
  } = methods;

  const parkingOptions = useMemo(
    () =>
      parkingData.map((ele) => ({ label: ele.name, value: String(ele.id) })),
    [parkingData],
  );

 const parkingId = useWatch({ control, name: "parking_id" });
  const selectedParkingDetails = parkingData.find(
    (ele) => String(ele.id) === String(parkingId),
  );

  const onSubmit: SubmitHandler<ParkingRequestFormValues> = async (data) => {
    try {
      const result = await action({...data,parkings:{connect:{id:data.parking_id}}});
      if (result.success) {
        toast.success(result.message);
        methods.reset();
        router.replace("/parkings");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(
        isArabic ? "حدث خطأ غير متوقع" : "Unexpected error occurred.",
      );
    }
  };

  return (
    <FormProvider {...methods}>
      {/* Background Wrapper for Depth */}
      <div className="min-h-screen bg-slate-50/50 py-12 px-4 md:px-6">
        <div
          className="max-w-[95%] mx-auto bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <HeaderSection locale={locale} />

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Form Entry */}
            <div className="lg:col-span-7 p-4 md:p-8 lg:p-12 bg-white">
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="mb-10">
                  <span className="text-[#0c479a] text-[10px] font-black uppercase tracking-[0.3em] bg-[#0c479a]/5 px-3 py-1 rounded-md">
                    {isArabic ? "نموذج الطلب" : "Request Entry"}
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-4 uppercase tracking-tight">
                    {isArabic ? "تفاصيل طلب الموقف" : "Parking Request Details"}
                  </h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <BasicInfo locale={locale} parkingOptions={parkingOptions} />
                  <MediaSection locale={locale} />
                  <FormActions locale={locale} />
                </form>
              </div>
            </div>

            {/* Right Column: Dynamic Summary */}
            <div
              className={cn(
                "lg:col-span-5 relative transition-colors duration-500 max-h-full flex flex-col",
                selectedParkingDetails ? "bg-slate-50/30" : "bg-slate-50/80",
              )}
            >
              {/* Vertical Divider (Desktop Only) */}
              <div className="absolute inset-y-0 left-0 w-px bg-slate-200/60 hidden lg:block rtl:left-auto rtl:right-0" />

              <div className="flex-1 flex flex-col items-center justify-start p-16 md:p-12 relative">
                {selectedParkingDetails ? (
                  <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="mb-8 flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100 w-fit mx-auto lg:mx-0">
                      <Info className="w-4 h-4 text-[#0c479a]" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {isArabic ? "معاينة الاختيار" : "Selection Preview"}
                      </span>
                    </div>
                    <ParkingSummary
                      data={selectedParkingDetails}
                      locale={locale}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col mt-2 md:mt-28 items-center text-center animate-in fade-in zoom-in-95 duration-500">
                    {/* Ghost Icon Container */}
                    <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-slate-200/50 border border-slate-100 group">
                      <CarFront className="w-10 h-10 text-slate-200 group-hover:text-[#0c479a] transition-colors duration-500" />
                    </div>

                    <h3 className="text-slate-900 font-black uppercase tracking-[0.25em] text-xs mb-3">
                      {isArabic
                        ? "في انتظار اختيار الموقف"
                        : "Awaiting Selection"}
                    </h3>

                    <p className="text-slate-400 text-[11px] font-bold max-w-70 leading-relaxed uppercase tracking-wider">
                      {isArabic
                        ? "يرجى تحديد موقف من القائمة لاستكمال بيانات الطلب واستعراض العقود"
                        : "Select a parking unit to populate the request and review contractual obligations"}
                    </p>

                    {/* Decorative Dashed Frame */}
                    <div className="absolute inset-10 border-2 border-dashed border-slate-200/60 rounded-[2rem] pointer-events-none" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default SubmitForm;
