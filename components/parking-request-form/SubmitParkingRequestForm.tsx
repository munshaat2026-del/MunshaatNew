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
import MediaSection from "@/components/parking-request-form/MediaSection";
import ParkingSummary from "@/components/parking-request-form/ParkingSummary";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  CarFront,
  ChevronDown,
  ClipboardList,
  Info,
} from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<ParkingRequestFormValues>({
    resolver: zodResolver(requestSchema(isArabic)),
    defaultValues: {
      parking_id: "",
    },
  });

  const { handleSubmit, control } = methods;

  const parkingOptions = useMemo(
    () =>
      parkingData.map((ele) => ({
        label: ele.name,
        value: String(ele.id),
      })),
    [parkingData],
  );

  const parkingId = useWatch({
    control,
    name: "parking_id",
  });

  const selectedParkingDetails = parkingData.find(
    (ele) => String(ele.id) === String(parkingId),
  );

  const onSubmit: SubmitHandler<ParkingRequestFormValues> = async (data) => {
    try {
      const result = await action({
        ...data,
        parkings: {
          connect: {
            id: data.parking_id,
          },
        },
      });

      if (result.success) {
        toast.success(result.message);
        methods.reset();
        router.replace("/parkings");
        return;
      }

      toast.error(result.message);
    } catch {
      toast.error(
        isArabic
          ? "حدث خطأ غير متوقع"
          : "Unexpected error occurred.",
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50/50 px-4 py-12 md:px-6">
        <div
          className="mx-auto max-w-[95%] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)]"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="border-b border-[#c9d9ee] bg-[#e8f0fb] px-6 py-7 md:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d5e3f5] text-[#0c479a] shadow-sm">
                <ClipboardList className="h-6 w-6" />
              </div>

              <div>
                <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#0c479a]">
                  {isArabic ? "طلبات المواقف" : "Parking Requests"}
                </p>

                <h1 className="text-xl font-black tracking-tight text-[#12345b] md:text-2xl">
                  {isArabic
                    ? "إنشاء طلب موقف جديد"
                    : "Create Parking Request"}
                </h1>

                <p className="mt-1 text-xs font-medium text-[#58708f]">
                  {isArabic
                    ? "أدخل تفاصيل طلبك أدناه"
                    : "Enter your request details below"}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-100/70 px-6 py-4 transition-colors hover:bg-slate-200/60 md:px-10"
          >
            <span className="text-sm font-bold text-slate-700">
              {isOpen
                ? isArabic
                  ? "إغلاق النموذج"
                  : "Close Form"
                : isArabic
                  ? "فتح نموذج الطلب"
                  : "Open Request Form"}
            </span>

            <ChevronDown
              className={cn(
                "h-5 w-5 text-[#0c479a] transition-transform duration-300",
                isOpen && "rotate-180",
              )}
            />
          </button>

          <div
            className={cn(
              "grid transition-all duration-300",
              isOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="bg-white p-4 md:p-8 lg:col-span-7 lg:p-12">
                  <div className="mx-auto max-w-2xl lg:mx-0">
                    <div className="mb-10">
                      <span className="rounded-md bg-[#0c479a]/5 px-3 py-1 text-[10px] font-black uppercase text-[#0c479a]">
                        {isArabic ? "نموذج الطلب" : "Request Entry"}
                      </span>

                      <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-slate-900">
                        {isArabic
                          ? "تفاصيل طلب الموقف"
                          : "Parking Request Details"}
                      </h2>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <BasicInfo
                        locale={locale}
                        parkingOptions={parkingOptions}
                      />

                      <MediaSection locale={locale} />

                      <FormActions locale={locale} />
                    </form>
                  </div>
                </div>

                <div
                  className={cn(
                    "relative flex max-h-full flex-col transition-colors duration-500 lg:col-span-5",
                    selectedParkingDetails
                      ? "bg-slate-50/30"
                      : "bg-slate-50/80",
                  )}
                >
                  <div className="absolute inset-y-0 left-0 hidden w-px bg-slate-200/60 lg:block rtl:left-auto rtl:right-0" />

                  <div className="relative flex flex-1 flex-col items-center justify-start p-16 md:p-12">
                    {selectedParkingDetails ? (
                      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-2 shadow-sm lg:mx-0">
                          <Info className="h-4 w-4 text-[#0c479a]" />

                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            {isArabic
                              ? "معاينة الاختيار"
                              : "Selection Preview"}
                          </span>
                        </div>

                        <ParkingSummary
                          data={selectedParkingDetails}
                          locale={locale}
                        />
                      </div>
                    ) : (
                      <div className="mt-2 flex flex-col items-center text-center md:mt-28">
                        <div className="group mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50">
                          <CarFront className="h-10 w-10 text-slate-200 transition-colors duration-500 group-hover:text-[#0c479a]" />
                        </div>

                        <h3 className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-slate-900">
                          {isArabic
                            ? "في انتظار اختيار الموقف"
                            : "Awaiting Selection"}
                        </h3>

                        <p className="max-w-70 text-[11px] font-bold leading-relaxed tracking-wider text-slate-400">
                          {isArabic
                            ? "يرجى تحديد موقف من القائمة لاستكمال بيانات الطلب واستعراض العقود"
                            : "Select a parking unit to populate the request and review contractual obligations"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default SubmitForm;
