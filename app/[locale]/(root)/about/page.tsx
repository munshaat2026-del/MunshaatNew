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
import { sendEmailAction } from "@/app/[locale]/(root)/about/(actions)/sendEmailAction";
import TeamDirectory from "@/app/components/pagescomponents/About/NotMainMemebrs";
import { getAllClientsByLocale } from "@/app/server/clients/services";
import OurClients from "@/app/components/pagescomponents/About/OurClients";

import { generatePageMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("about", (await params).locale);
}

interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function AboutUs({ params }: Props) {
  const primaryColor = "#0c479a";
  const { locale } = await params;

  const [mainMembers, notMainMemebrs, parkings, clients] = await Promise.all([
    getMainMembersByLocale(locale),
    getNotMainMembersByLocale(locale),
    getAllParkingsByLocale(locale),
    getAllClientsByLocale(locale),
  ]);

  const complexdata = parkings?.data;

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      {/* 1. About Us Section */}
      <div id="about-us" className="scroll-mt-28">
        <AboutHero primaryColor={primaryColor} locale={locale} />
      </div>

      <CoreValues primaryColor={primaryColor} locale={locale} />

      {/* 2. Our Complexes Section */}
      {complexdata && (
        <div id="our-complexes" className="scroll-mt-28">
          <OurComplexes complexdata={complexdata} />
        </div>
      )}

      <ExecutiveQuote primaryColor={primaryColor} locale={locale} />

      {/* 3. Our Team Section (Groups both main and directory members) */}
      <div id="our-team" className="scroll-mt-28">
        {mainMembers.data && (
          <TeamPreview
            primaryColor={primaryColor}
            locale={locale}
            data={mainMembers.data}
          />
        )}
        {notMainMemebrs.data && (
          <TeamDirectory
            primaryColor={primaryColor}
            locale={locale}
            data={notMainMemebrs.data}
          />
        )}
      </div>

      {/* 4. Our Clients Section */}
      {clients.data && clients.data?.length > 0 && (
        <div id="our-clients" className="scroll-mt-28">
          <OurClients locale={locale} clients={clients.data} />
        </div>
      )}

      <ContactUs locale={locale} action={sendEmailAction} />
    </div>
  );
}
