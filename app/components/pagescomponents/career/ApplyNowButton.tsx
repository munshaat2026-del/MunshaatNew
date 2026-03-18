import { Locale } from "@/types";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
function ApplyNowButton({ locale,careerId }: { locale: Locale,careerId:string }) {
 const isArabic= locale==="ar"

  return (
    
      <Link href={`/application-form/${careerId}`}>
      
        <div className="border-2 border-slate-900 p-8 md:p-10 bg-white">
          <h4 className="text-2xl font-black uppercase tracking-tighter mb-4">
            {isArabic ? "تقدم لهذه" : "Apply for this"}
            <br />
            <span className="text-[#0c479a]">
              {isArabic ? "الوظيفة الآن" : "Position Now"}
            </span>
          </h4>

          <p className="text-[11px] text-slate-500 font-medium mb-10 leading-relaxed">
            {isArabic
              ? "سيقوم فريق الموارد البشرية بمراجعة طلبك والرد عليك في أقرب وقت ممكن."
              : "Our HR team will review your application and get back to you as soon as possible."}
          </p>

          <button className="w-full bg-slate-900 text-white py-5 flex items-center justify-center gap-3 group hover:bg-[#0c479a] transition-all duration-300">
            <span className="font-bold uppercase text-[11px] tracking-[0.2em]">
              {isArabic ? "قدم الآن" : "Apply Now"}
            </span>
       <ArrowRight  size={16} /> 
          </button>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4 text-slate-400">
            <ShieldCheck size={20} className="no-flip" />
            <div className="space-y-0.5">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-600">
                {isArabic ? "بياناتك محمية بالكامل" : "Privacy Protected"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    
  );
}

export default ApplyNowButton;
