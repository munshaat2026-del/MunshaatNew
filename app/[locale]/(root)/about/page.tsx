import AboutHero from "@/app/components/pagescomponents/About/AboutHero";
import CoreValues from "@/app/components/pagescomponents/About/CoreValues";
import ExecutiveQuote from "@/app/components/pagescomponents/About/ExecutiveQuote";
import ImpactSection from "@/app/components/pagescomponents/About/ImpactSection";
import TeamPreview from "@/app/components/pagescomponents/About/TeamPreview";
import OurComplexes from "@/app/components/pagescomponents/About/OurComplexes";
import ContactUs from "@/app/components/contactus"

export default function AboutUs() {
  const primaryColor = "#0c479a";

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <AboutHero primaryColor={primaryColor} />
      <CoreValues primaryColor={primaryColor} />
            <OurComplexes/>

      <ImpactSection primaryColor={primaryColor} />
            <ExecutiveQuote primaryColor={primaryColor} />

      <TeamPreview primaryColor={primaryColor} />
      <ContactUs/>
    </div>
  );
}