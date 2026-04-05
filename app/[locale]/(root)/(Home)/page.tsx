import HeroSection from "@/app/components/pagescomponents/Home/HeroSection";
import ServicesSection from "@/app/components/pagescomponents/Home/ServicesSection";
import WhyUsSection from "@/app/components/pagescomponents/Home/WhyUsSection";
import { generatePageMetadata, } from "@/lib/constants/metadata"
import { Locale } from "@/types";

interface Props {
  params:Promise<{locale:Locale}>
}

export const  generateMetadata = async ({params}:Props)=>{
  const {locale}= await params
  return generatePageMetadata("home",locale)

}

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