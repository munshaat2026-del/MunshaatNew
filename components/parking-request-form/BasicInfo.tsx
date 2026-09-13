import TextInput from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import z from "zod";
import EmailInput from "../inputs/EmailInput";
import FormSelect from "../inputs/SelectorInput";
import { requestSchema } from "@/app/server/parkingsRequests/validators";
import { planOptions } from "@/lib/constants/dashboardData";
import { User, Mail, Phone, Briefcase, Building } from "lucide-react";

type RequestFormValues = z.infer<ReturnType<typeof requestSchema>>;
interface Props {
  parkingOptions: { label: string; value: string }[];
  locale: "en" | "ar";
}

function BasicInfo({ locale, parkingOptions }: Props) {
  const isArabic = locale === "ar";
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RequestFormValues>();

  const labels = {
    name: isArabic ? "الإسم كامل" : "Full Name",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    phone: isArabic ? "رقم الهاتف" : "Phone Number",
    plan: isArabic ? "الخطة" : "Plan",
    parkingData: isArabic ? "المواقف" : "Parkings",
    alreadyRents: isArabic
      ? "هل تستأجر في المجمع حالياً؟"
      : "Already rent in the complex?",
    placeholders: {
      name: isArabic ? "الاسم الكامل" : "FULL NAME",
      email: isArabic ? "البريد الإلكتروني الرسمي" : "OFFICIAL EMAIL",
      phone: isArabic ? "+966 -- --- ----" : "+966 -- --- ----",
      plan: isArabic ? "اختر خطة" : "Select Plan",
      parkingData: isArabic ? "اختر موقف" : "Select Parking",
    },
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="group transition-all">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <User size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.name}
            </label>
          </div>
          <TextInput
            register={register("name")}
            error={errors.name}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* Email */}
        <div className="group">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Mail size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.email}
            </label>
          </div>
          <EmailInput
            register={register("email")}
            error={errors.email}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* Phone */}
        <div className="group">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Phone size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.phone}
            </label>
          </div>
          <TextInput
            register={register("phone_number")}
            error={errors.phone_number}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* Plan Select */}
        <div className="group">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Briefcase size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.plan}
            </label>
          </div>
          <FormSelect
            triggerClassName="w-full py-3"
            name="plan"
            control={control}
            options={planOptions(isArabic)}
            placeholder={isArabic ? "حدد خيارًا" : "Select Option"}
            error={errors.plan}
            dir={isArabic ? "rtl" : "ltr"}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm outline-none focus:border-[#0c479a] transition-all appearance-none cursor-pointer"
          />
        </div>

        {/* Parking Select */}
        <div className="group">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Briefcase size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.parkingData}
            </label>
          </div>
          <FormSelect
            triggerClassName="w-full py-3"
            name="parking_id"
            control={control}
            options={parkingOptions}
            placeholder={labels.placeholders.parkingData}
            error={errors.parking_id}
            dir={isArabic ? "rtl" : "ltr"}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm outline-none focus:border-[#0c479a] transition-all appearance-none cursor-pointer"
          />
        </div>

        {/* Already Rents In Complex Checkbox */}
        <div className="group transition-all">
          <div className="flex items-center gap-2 border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Building size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black  text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.alreadyRents}
            </label>
          </div>
          {<div className="w-full border-b border-slate-200 pb-2 mt-3 group-focus-within:border-[#0c479a] transition-all">
            <label
              htmlFor="already_rents_in_complex"
              className="w-full flex items-center justify-between bg-white border border-slate-200 py-2.5 px-3 rounded-md cursor-pointer hover:border-[#0c479a] transition-all"
            >
              <span className="text-sm text-gray-700 select-none">
                {isArabic ? "نعم" : "Yes"}
              </span>
              <input
                type="checkbox"
                id="already_rents_in_complex"
                {...register("already_rents_in_complex")}
                className="w-4 h-4 accent-[#0c479a] cursor-pointer outline-none"
              />
            </label>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
