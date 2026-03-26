import HeroSection from "@/app/components/pagescomponents/Home/HeroSection";
import LogosSection from "@/app/components/pagescomponents/Home/LogosSection";
import StatsSection from "@/app/components/pagescomponents/Home/StatsSection";
import ServicesSection from "@/app/components/pagescomponents/Home/ServicesSection";
import WhyUsSection from "@/app/components/pagescomponents/Home/WhyUsSection";
import {HOME_METADATA} from "@/lib/constants/metadata"


export const metadata= HOME_METADATA

export default function Page() {
  const primaryColor = "#0c479a";



  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <HeroSection />
      <ServicesSection primaryColor={primaryColor} />
      <WhyUsSection primaryColor={primaryColor} />
    </div>
  );
}