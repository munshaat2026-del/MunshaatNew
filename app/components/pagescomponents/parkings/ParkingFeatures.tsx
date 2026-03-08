import { ShieldCheck, Smartphone, Zap, CreditCard } from "lucide-react";

interface ParkingFeaturesProps {
  primaryColor: string;
}

export default function ParkingFeatures({ primaryColor }: ParkingFeaturesProps) {
  const features = [
    {
      title: "ANPR Access",
      desc: "License plate recognition for hands-free entry.",
      icon: Smartphone,
    },
    {
      title: "24/7 Security",
      desc: "Thermal imaging and round-the-clock patrol.",
      icon: ShieldCheck,
    },
    {
      title: "EV Stations",
      desc: "High-speed charging bays for electric vehicles.",
      icon: Zap,
    },
    {
      title: "Easy Billing",
      desc: "Automated monthly invoicing and digital payments.",
      icon: CreditCard,
    },
  ];

  return (
    <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto bg-white border-b border-slate-100">
      {/* Header Info - Meta Tag Style */}
      <div className="mb-16 flex items-center gap-4">
        <div className="w-12 h-[2px]" style={{ backgroundColor: primaryColor }}></div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          Infrastructure Specs // Area P-01
        </span>
      </div>

      {/* Features Grid - Sharp Linear Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-l border-slate-100">
        {features.map((item, i) => (
          <div 
            key={i} 
            className="group p-10 border-r border-b border-slate-100 hover:bg-slate-50 transition-all duration-500 relative overflow-hidden"
          >
            {/* Index Number - Technical Detail */}
            <span className="absolute top-6 right-6 text-[8px] font-black text-slate-200 group-hover:text-slate-400 transition-colors uppercase tracking-widest">
              SYS_0{i + 1}
            </span>

            <div className="space-y-8 relative z-10">
              {/* Icon - Sharp Square Frame */}
              <div
                className="w-14 h-14 flex items-center justify-center border border-slate-100 bg-white group-hover:border-slate-900 transition-all duration-500 shadow-sm"
                style={{ color: primaryColor }}
              >
                <item.icon size={22} strokeWidth={1.5} />
              </div>

              {/* Text Content */}
              <div className="space-y-3">
                <h4 className="font-black text-base uppercase tracking-tighter text-slate-900">
                  {item.title}
                </h4>

                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-loose">
                  {item.desc}
                </p>
              </div>

              {/* Visual Accent - Dynamic Line */}
              <div className="w-0 h-[1px] bg-slate-900 group-hover:w-full transition-all duration-700 opacity-20"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Technical Footnote */}
      <div className="mt-12 flex justify-between items-center opacity-30">
        <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">
          All systems integrated via RM Central Hub
        </p>
        <div className="flex gap-2 text-[8px] font-black text-slate-400 uppercase">
          <span>LAT: 24.7136</span>
          <span>LON: 46.6753</span>
        </div>
      </div>
    </section>
  );
}