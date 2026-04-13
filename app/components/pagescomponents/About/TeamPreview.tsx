
import { Locale,TranslatedMembers } from '@/types';
import { ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { aboutdata } from "@/app/data/aboutdata";

interface TeamPreviewProps {
  primaryColor: string;
    locale:Locale;
    data:TranslatedMembers[]
}

export default function TeamPreview({ primaryColor ,locale,data }: TeamPreviewProps) {
  const aboutData = aboutdata[locale].teamSection;
  const isAr = locale === "ar";

  return (
    <section className="py-24 px-6 bg-[#fcfcfc]" >
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Minimalist */}
        <div className={`mb-20 flex flex-col  md:flex-row md:items-end  md:justify-center justify-between gap-6 `}>
          <div className="space-y-4">
           
            <h2 className="text-4xl  md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              {aboutData.titlePart1} 
            </h2>
          </div>
         
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((member, i) => (
            <div key={i} className="group relative ">
              
              {/* Image Box */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <img
                  src={member.image??""}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 "
                  alt={member.name??"Memebr Name"}
                />
                
                {/* Floating Arrow Badge */}
              
              </div>

              {/* The Inset Card */}
              <div className={`relative -mt-12 mx-4 p-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl ${isAr ? 'text-right' : 'text-left'}`}>
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {member.name}
                </h4>
                <div className={`flex items-center gap-2 mt-1 `}>
                  <div className="w-4 h-[2px]" style={{ backgroundColor: primaryColor }}></div>
                  <p className="text-slate-400 text-[10px] font-bold  tracking-widest">
                    {member.position}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}