import AboutHero from "@/app/components/pagescomponents/About/AboutHero";
import CoreValues from "@/app/components/pagescomponents/About/CoreValues";
import ExecutiveQuote from "@/app/components/pagescomponents/About/ExecutiveQuote";
import ImpactSection from "@/app/components/pagescomponents/About/ImpactSection";
import TeamPreview from "@/app/components/pagescomponents/About/TeamPreview";
import OurComplexes from "@/app/components/pagescomponents/About/OurComplexes";
import ContactUs from "@/app/components/contactus"
import { notFound } from "next/navigation";
import {getAllParkingsByLocale} from "@/app/server/parkings/services"
import type { Locale } from "@/types";
interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function AboutUs({params}:Props) {
  const primaryColor = "#0c479a";
    const { locale } = await params;
      
      const response = await (await getAllParkingsByLocale(locale))();
      const complexdata = response?.data;
    
      if (!complexdata) return notFound();
    
    
  

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <AboutHero primaryColor={primaryColor} />
      <CoreValues primaryColor={primaryColor} />
            <OurComplexes complexdata={complexdata}/>

      <ImpactSection primaryColor={primaryColor} />
            <ExecutiveQuote primaryColor={primaryColor} />

      <TeamPreview primaryColor={primaryColor} />
      <ContactUs/>
    </div>
  );
}