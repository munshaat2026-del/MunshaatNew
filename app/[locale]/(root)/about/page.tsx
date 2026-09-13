import AboutHero from "@/app/components/pagescomponents/About/AboutHero";
import CoreValues from "@/app/components/pagescomponents/About/CoreValues";
import ExecutiveQuote from "@/app/components/pagescomponents/About/ExecutiveQuote";
import TeamPreview from "@/app/components/pagescomponents/About/TeamPreview";
import OurComplexes from "@/app/components/pagescomponents/About/OurComplexes";
import ContactUs from "@/app/components/pagescomponents/About/contactComponents/contactus";
import { getAllParkingsByLocale } from "@/app/server/parkings/services";
import {
  getMainMembersByLocale,
  getNotMainMembersByLocale,
} from "@/app/server/ourTeam/services";
import type { Locale } from "@/types";
import { sendEmailAction } from "@/app/[locale]/(root)/about/(actions)/sendEmailAction";
import TeamDirectory from "@/app/components/pagescomponents/About/NotMainMemebrs";
import { getAllClientsByLocale } from "@/app/server/clients/services";
import OurClients from "@/app/components/pagescomponents/About/OurKeyPartners";
import { generatePageMetadata } from "@/lib/constants/metadata";
import GeneralManagerSection from "@/app/components/pagescomponents/About/GeneralManagerSection";
import { directorStatement } from "@/app/data/aboutdata";

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
      <div id="about-us" className="scroll-mt-28">
        <AboutHero primaryColor={primaryColor} locale={locale} />
      </div>

      <CoreValues primaryColor={primaryColor} locale={locale} />

      {complexdata && (
        <div id="our-complexes" className="scroll-mt-28">
          <OurComplexes complexdata={complexdata} />
        </div>
      )}

      {/* Note: By notMainMemebrs i mean the  board-of-directors members */}
      {notMainMemebrs.data && (
        <div id="board-of-directors" className="scroll-mt-28">
          <TeamDirectory
            primaryColor={primaryColor}
            locale={locale}
            data={notMainMemebrs.data}
          />
        </div>
      )}

      {/*<ExecutiveQuote primaryColor={primaryColor} locale={locale} />

      <div id="our-team" className="scroll-mt-28">
        {mainMembers.data && (
          <div id="executive-management" className="scroll-mt-28">
            <TeamPreview
              primaryColor={primaryColor}
              locale={locale}
              data={mainMembers.data}
            />
          </div>
        )}
      </div>*/}

      {/* Note: By mainMemebrs i mean the  executive-management member, which should be Dr.Maroan */}
      <GeneralManagerSection
        primaryColor={primaryColor}
        locale={locale}
        member={mainMembers.data[0]}
        data={directorStatement[locale].quoteSection}
      />

      {clients.data && clients.data.length > 0 && (
        <div id="our-clients" className="scroll-mt-28">
          <OurClients locale={locale} clients={clients.data} />
        </div>
      )}

      <div id="contact">
        {" "}
        <ContactUs locale={locale} action={sendEmailAction} />
      </div>
    </div>
  );
}
