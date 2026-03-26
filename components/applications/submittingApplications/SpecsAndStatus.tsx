"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";
import { applicantSchema } from "@/app/server/applications/validators";
import FormSelect from "@/components/inputs/SelectorInput";
import {
  jordanCities,
  maritalStatusOptions,
} from "@/lib/constants/dashboardData";
import { Locale } from "@/types";
import { MapPin } from "lucide-react";
import DateInYearsInputs from "@/components/inputs/DateInYearsInputs";

type ApplicationFormValues = z.infer<ReturnType<typeof applicantSchema>>;

function SpecsAndStatus({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";
  const {
    formState: { errors },
    control,
  } = useFormContext<ApplicationFormValues>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[95%]">
      {/* City */}
      <div>
        <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <MapPin size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "المحافظة" : "city"}
          </label>
        </div>

        <FormSelect
          control={control}
          name="city"
          dir={isArabic ? "rtl" : "ltr"}
          placeholder={isArabic ? "اختر محافظة" : "Select City"}
          options={jordanCities(isArabic)}
          error={errors.city}
          triggerClassName="w-full"
        />
      </div>

      {/* City */}
      <div>
        <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <MapPin size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "مكان الولادة" : "Place Of Birth"}
          </label>
        </div>

        <FormSelect
          control={control}
          name="place_of_birth"
          options={jordanCities(isArabic)}
          error={errors.place_of_birth}
          dir={isArabic ? "rtl" : "ltr"}
          placeholder={isArabic ? "اختر مكان الولادة" : "Select Place Of Birth"}
          triggerClassName="w-full"
        />
      </div>
      {/* Marital Status */}
      <div>
        <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <MapPin size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "الحالة الإجتماعية" : "Marital Status"}
          </label>
        </div>

        <FormSelect
          control={control}
          name="marital_status"
          options={maritalStatusOptions(isArabic)}
          error={errors.marital_status}
          placeholder={
            isArabic ? "اختر الحالة الإجتماعية" : "Select Marital Status"
          }
          dir={isArabic ? "rtl" : "ltr"}
          triggerClassName="w-full"
        />
      </div>
      {/* Date Of Birth */}
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
          <MapPin size={14} className="text-[#0c479a]" />
          <label className="text-[10px] font-black uppercase  text-slate-400 group-focus-within:text-[#0c479a]">
            {isArabic ? "تاريخ الولادة" : "Date Of Birth"}
          </label>
        </div>

        <DateInYearsInputs
          control={control}
          name="date_of_birth"
          placeholder={isArabic ? "اختر تاريخ الولادة" : "Select Date Of Birth"}
          error={errors.date_of_birth}
          label=""
        />
      </div>
    </div>
  );
}

export default SpecsAndStatus;
