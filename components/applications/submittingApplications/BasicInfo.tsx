import TextInput from "@/components/inputs/TextInput";
import { useFormContext } from "react-hook-form";
import z from "zod";
import EmailInput from "@/components/inputs/EmailInput";
import FormSelect from "@/components/inputs/SelectorInput";
import { applicantSchema } from "@/app/server/applications/validators";
import { planOptions } from "@/lib/constants/dashboardData";
import { User, Mail, Phone, Briefcase, MapPinHouse } from "lucide-react";
import { PiCertificateBold } from "react-icons/pi";
import { MdOutlinePermIdentity } from "react-icons/md";

type ApplicationFormValues = z.infer<ReturnType<typeof applicantSchema>>;
interface Props {
  locale: "en" | "ar";
}

function BasicInfo({ locale }: Props) {
  const isArabic = locale === "ar";
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ApplicationFormValues>();


  const labels = {
    name: isArabic ? "الإسم كامل" : "Full Name",
    address: isArabic ? "العنوان" : "Address",
    major: isArabic ? "التخصص" : "Major",
    national_number: isArabic ? "الرقم الوطني" : "National Number",
    nationality: isArabic ? "الجنسية" : "Nationality",
    email: isArabic ? "البريد الإلكتروني" : "Email",
    phone: isArabic ? "رقم الهاتف" : "Phone Number",
    plan: isArabic ? "الخطة" : "Plan",
    placeholders: {
      name: isArabic ? "الاسم الكامل" : "FULL NAME",
      email: isArabic ? "البريد الإلكتروني الرسمي" : "OFFICIAL EMAIL",
      phone: isArabic ? "+966 -- --- ----" : "+966 -- --- ----",
      plan: isArabic ? "حدد خيارًا " : "Select Option",
    },
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {/* Full Name */}
        <div className="group transition-all">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <User size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.name}
            </label>
          </div>
          <TextInput
            register={register("full_name")}
            error={errors.full_name}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>
        {/* Major */}
        <div className="group transition-all">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <PiCertificateBold size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.major}
            </label>
          </div>
          <TextInput
            register={register("major")}
            error={errors.major}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>
        {/* Address */}
        <div className="group transition-all">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <MapPinHouse size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.address}
            </label>
          </div>
          <TextInput
            register={register("address")}
            error={errors.address}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* National Number */}
        <div className="group transition-all">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <MdOutlinePermIdentity size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.national_number}
            </label>
          </div>
          <TextInput
            register={register("national_number")}
            error={errors.national_number}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

         {/* National Number */}
        <div className="group transition-all">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <MdOutlinePermIdentity size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.nationality}
            </label>
          </div>
          <TextInput
            register={register("nationality")}
            error={errors.nationality}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* Email */}
        <div className="group">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Mail size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.email}
            </label>
          </div>
          <EmailInput
            register={register("email")}
            error={errors.email}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        {/* Phone */}
        <div className="group">
          <div className="flex items-center gap-2  border-l-2 border-[#0c479a] rtl:border-l-0 rtl:border-r-2 px-3">
            <Phone size={14} className="text-[#0c479a]" />
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-focus-within:text-[#0c479a]">
              {labels.phone}
            </label>
          </div>
          <TextInput
            register={register("phone_number")}
            error={errors.phone_number}
            className="w-full bg-transparent border-b border-slate-200 py-3 text-gray-700 text-sm  outline-none focus:border-[#0c479a] transition-all"
          />
        </div>

        
      </div>
    </div>
  );
}

export default BasicInfo;
