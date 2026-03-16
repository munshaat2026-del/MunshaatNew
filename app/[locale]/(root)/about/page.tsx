import AboutHero from "@/app/components/pagescomponents/About/AboutHero";
import CoreValues from "@/app/components/pagescomponents/About/CoreValues";
import ExecutiveQuote from "@/app/components/pagescomponents/About/ExecutiveQuote";
import ImpactSection from "@/app/components/pagescomponents/About/ImpactSection";
import TeamPreview from "@/app/components/pagescomponents/About/TeamPreview";
import OurComplexes from "@/app/components/pagescomponents/About/OurComplexes";
import ContactUs from "@/app/components/contactus";
import { notFound } from "next/navigation";
import { getAllParkingsByLocale } from "@/app/server/parkings/services";
import {
  getMainMembersByLocale,
  getNotMainMembersByLocale,
} from "@/app/server/ourTeam/services";
import type { Locale } from "@/types";
import {sendEmailAction} from "@/app/[locale]/(root)/about/(actions)/sendEmailAction"
import TeamDirectory from "@/app/components/pagescomponents/About/NotMainMemebrs"
import { getAllClientsByLocale } from "@/app/server/clients/services";
import OurClients from "@/app/components/pagescomponents/About/OurClients";
interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function AboutUs({ params }: Props) {
  const primaryColor = "#0c479a";
  const { locale } = await params;


  const [mainMembers, notMainMemebrs, parkings,clients] = await Promise.all([
    getMainMembersByLocale(locale),
    getNotMainMembersByLocale(locale),
    getAllParkingsByLocale(locale),
    getAllClientsByLocale(locale)
  ]);

  console.log("clients: ",clients);
  

  const complexdata = parkings?.data;

  if (!complexdata) return notFound();
  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <AboutHero primaryColor={primaryColor} />
      <CoreValues primaryColor={primaryColor} />
      <OurComplexes complexdata={complexdata} />

      <ImpactSection primaryColor={primaryColor} />
      <ExecutiveQuote primaryColor={primaryColor} />

      {mainMembers.data && <TeamPreview primaryColor={primaryColor}locale={locale} data={mainMembers.data}/>}
      {notMainMemebrs.data && <TeamDirectory primaryColor={primaryColor}locale={locale} data={notMainMemebrs.data}/>}
      {clients.data && clients.data?.length>0 &&  <OurClients locale={locale} clients={clients.data} />}
        <ContactUs locale={locale} action={sendEmailAction} />
    </div>
  );
}
