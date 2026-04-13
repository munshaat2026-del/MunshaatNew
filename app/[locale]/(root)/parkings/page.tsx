import ParkingHero from "@/app/components/pagescomponents/parkings/ParkingHero";
import ParkingFeatures from "@/app/components/pagescomponents/parkings/ParkingFeatures";
import { submitParkingRequestAction } from "./(actions)/submitParkingRequestAction";
import SubmitParkingForm from "@/components/parking-request-form/SubmitParkingRequestForm";
import { Locale } from "@/types";
import { getAllParkingsByLocale } from "@/app/server/parkings/services";
import { notFound } from "next/navigation";
import { generatePageMetadata } from "@/lib/constants/metadata";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("parkings", (await params).locale);
}
interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function ParkingLeasing({ params }: Props) {
   const {  locale } = await params;

  

  const  parkingData = await getAllParkingsByLocale(locale)
  if ( !parkingData.data) {
    notFound();
  }
  const primaryColor = "#0c479a";

 

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <ParkingHero primaryColor={primaryColor} locale={locale}/>
      <ParkingFeatures primaryColor={primaryColor} locale={locale} />
      <SubmitParkingForm
        locale={locale}
        action={submitParkingRequestAction}
        parkingData={parkingData.data}
      />
      
    </div>
  );
}