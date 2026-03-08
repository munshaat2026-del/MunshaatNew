import { ShieldCheck, ArrowRight, Zap } from "lucide-react";

interface ParkingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
}

interface ParkingPricingProps {
  primaryColor: string;
  plans: ParkingPlan[];
}

export default function ParkingPricing({
  primaryColor,
  plans,
}: ParkingPricingProps) {
  return (
    <section className="py-32 px-6 md:px-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header - Institutional Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 border-b border-slate-900 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px]" style={{ backgroundColor: primaryColor }}></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Rate Card 2026</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              SUBSCRIPTION <br />
              <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>PROTOCOLS.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] max-w-xs leading-loose italic">
            Select an operational tier optimized for individual mobility or corporate fleet management.
          </p>
        </div>

        {/* Pricing Grid - Monolithic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-l border-t border-slate-900">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-12 border-r border-b border-slate-900 transition-all duration-500 group ${
                plan.isPopular ? "bg-slate-50" : "bg-white"
              }`}
            >
              {/* Popular Badge - Industrial Tag */}
              {plan.isPopular && (
                <div 
                  className="absolute top-0 right-0 px-4 py-1 text-[8px] font-black uppercase tracking-widest text-white italic"
                  style={{ backgroundColor: primaryColor }}
                >
                  Priority Tier
                </div>
              )}

              {/* Plan Header */}
              <div className="space-y-2 mb-12">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Contract Type</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:italic transition-all">
                  {plan.name}
                </h3>
              </div>

              {/* Price Block */}
              <div className="mb-12 pb-8 border-b border-slate-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">SAR</span>
                  <span className="text-5xl font-black tracking-tighter text-slate-900 italic">
                    {plan.price}
                  </span>
                </div>
                <p className="text-[9px] font-black text-[#0c479a] uppercase tracking-widest mt-2">
                  per {plan.period} // Fixed Rate
                </p>
              </div>

              {/* Features List - Technical Specs */}
              <ul className="space-y-5 mb-16">
                {plan.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-900 transition-colors"
                  >
                    <div className="mt-0.5 w-1.5 h-1.5 bg-slate-200 group-hover:bg-[#0c479a] shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA Button - Solid Institutional Action */}
              <button
                className="w-full py-6 font-black text-[10px] uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 group/btn"
                style={{
                  backgroundColor: plan.isPopular ? "#0a0f1a" : "transparent",
                  color: plan.isPopular ? "#fff" : "#0a0f1a",
                  border: plan.isPopular ? "none" : "1px solid #0a0f1a",
                }}
              >
                Initialize Plan <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
              
              {/* Decorative Tech Detail */}
              <div className="mt-8 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Zap size={12} className="text-slate-400" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Compliance Footer */}
        <div className="mt-12 text-center">
           <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.5em]">
             * Terms of service and spatial regulations apply to all subscription tiers.
           </p>
        </div>
      </div>
    </section>
  );
}