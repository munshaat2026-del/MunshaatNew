import HeroSection from "@/app/components/pagescomponents/Home/HeroSection";
import ServicesSection from "@/app/components/pagescomponents/Home/ServicesSection";
import WhyUsSection from "@/app/components/pagescomponents/Home/WhyUsSection";
import { getSettingByLocale } from "@/app/server/settings/services";
import { generatePageMetadata } from "@/lib/constants/metadata";

import { Locale } from "@/types";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { locale } = await params;
  return generatePageMetadata("home", locale);
};

export default async function Page() {
  const data = await getSettingByLocale("en", "video_in_home_page");

  const primaryColor = "#0c479a";
  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <HeroSection videoUrl={data?.value} />
      <ServicesSection primaryColor={primaryColor} />
      <WhyUsSection primaryColor={primaryColor} />
    </div>
  );
}
