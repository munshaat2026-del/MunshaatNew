import { Locale, TranslatedComingSoon } from "@/types";
import { BarChart3, CalendarDays, Milestone } from "lucide-react";

function ComingSoonEvent({ locale, data }: { locale: Locale, data: TranslatedComingSoon }) {
  const isAr = locale === "ar";

  const estimatedDate = data.estimated_date ? new Date(data.estimated_date) : null;
  const isFutureDate = estimatedDate && estimatedDate > new Date();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const content = {
    targetDate: isAr ? "تاريخ الإطلاق المتوقع" : "Target Launch Date",
    completion: isAr ? "معدل الإنجاز" : "Completion Rate"
  };  

  return (
    <div
      className="min-h-[75vh] bg-white border border-slate-200 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] max-w-7xl mx-auto mb-20 mt-28 flex flex-col overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >    
      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* Content Side */}
        <div className="lg:w-[45%] p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
               
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.05] tracking-tighter uppercase">
                {data.title}
              </h1>
            </div>

            <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
              {data.description}
            </p>

            <div className="space-y-1">
              {/* 2. Dynamic Grid: Switches to 1 column if date is hidden */}
              <div className={`grid ${isFutureDate ? 'grid-cols-2' : 'grid-cols-1'} gap-px bg-slate-200 border border-slate-200`}>
                
                {/* Completion Metric */}
                <div className="bg-slate-50 p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-[#0c479a] no-flip" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                       {content.completion}
                    </span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 tabular-nums">
                    {data.completion_rate}%
                  </p>
                </div>

                {/* Date Metric: Only rendered if valid and in the future */}
                {isFutureDate && (
                  <div className="bg-slate-50 p-6 space-y-3 border-s border-slate-200 lg:border-s-0">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-[#0c479a] no-flip" />
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                         {content.targetDate}
                      </span>
                    </div>
                    <p className="text-xl font-black text-slate-900 leading-tight">
                      {formatDate(estimatedDate)}
                    </p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 overflow-hidden relative">
                <div 
                  className="h-full bg-[#0c479a] transition-all duration-1000"
                  style={{ width: `${data.completion_rate}%` }}
                />
              </div>
              
          
            </div>
          </div>
        </div>

        {/* Visual Side */}
        <div className="lg:w-[55%] relative min-h-125 overflow-hidden group">
          <img
            src={data.image}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-[#0c479a]/10" />

          {/* 3. Conditional Floating Badge */}
          {isFutureDate && (
            <div className="absolute top-10 left-10">
              <div className="bg-white/90 backdrop-blur-md px-5 py-3 border-l-4 border-[#0c479a] shadow-2xl">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {isAr ? "نافذة الإطلاق" : "Launch Window"}
                </p>
                <p className="text-sm font-black text-slate-900 uppercase">
                  {formatDate(estimatedDate)}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ComingSoonEvent;