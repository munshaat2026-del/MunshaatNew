import {  useFormContext } from "react-hook-form";
import z from "zod";
import { createContactSchema } from "@/app/server/email/emailSchema";
import { aboutdata } from "@/app/data/aboutdata";
import { Locale } from "@/types";
import { Send, AlertCircle } from "lucide-react";

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

function BasicInfo({ locale }: { locale: Locale }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ContactFormValues>();

  const data = aboutdata[locale].contact;
  const isAr = locale === "ar";

  return (
    <div className="space-y-10 gap-5 grid grid-cols-1 md:grid-cols-2" dir={isAr ? "rtl" : "ltr"}>
      <div>
        {/* Full Name */}
        <div className="group space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            {data.form.fullName}
          </label>
          <input
            {...register("name")}
            type="text"
            className={`w-full bg-transparent border-b py-3 text-sm font-black uppercase tracking-tighter outline-none transition-colors 
              ${errors.name ? "border-red-600 focus:border-red-600" : "border-black focus:border-[#0c479a]"}`}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
              <AlertCircle size={12} className="text-red-600" />
              <span>{errors.name.message}</span>
            </p>
          )}
        </div>
      </div>

     
        {/* Email */}
        <div className="group space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            {data.form.email}
          </label>
          <input
            {...register("email")}
            type="email"
            className={`w-full bg-transparent border-b py-3 text-sm font-black uppercase tracking-tighter outline-none transition-colors 
              ${errors.email ? "border-red-600 focus:border-red-600" : "border-black focus:border-[#0c479a]"}`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
              <AlertCircle size={12} className="text-red-600" />
              <span>{errors.email.message}</span>
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="group space-y-2 col-span-1 md:col-span-2">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
            {data.form.subject}
          </label>
          <input
            {...register("subject")}
            type="text"
            className={`w-full bg-transparent border-b py-3 text-sm font-black uppercase tracking-tighter outline-none transition-colors 
              ${errors.subject ? "border-red-600 focus:border-red-600" : "border-black focus:border-[#0c479a]"}`}
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
              <AlertCircle size={12} className="text-red-600" />
              <span>{errors.subject.message}</span>
            </p>
          )}
        </div>
    

      {/* Message */}
      <div className="group space-y-2 col-span-1 md:col-span-2">
        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
          {data.form.message}
        </label>
        <textarea
          {...register("message")}
         
          className={`w-full bg-transparent border-b  text-sm font-black   outline-none transition-colors 
            ${errors.message ? "border-red-600 focus:border-red-600" : "border-black focus:border-[#0c479a]"}`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
            <AlertCircle size={12} className="text-red-600" />
            <span>{errors.message.message}</span>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full py-5 col-span-1 md:col-span-2 bg-[#0c479a] text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-black transition-all overflow-hidden disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center gap-4">
          {isSubmitting ? "Sending..." : data.form.submit}
          {!isSubmitting && (
            <Send
              size={14}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
          )}
        </span>
      </button>
    </div>
  );
}

export default BasicInfo;
