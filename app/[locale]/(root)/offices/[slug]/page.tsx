import { BookingHeader } from "@/app/components/pagescomponents/offices/detailsComponents/RequestHeader";
import { OfficeGallery } from "@/app/components/pagescomponents/offices/detailsComponents/OfficeGallery";
import { OfficeDetails } from "@/app/components/pagescomponents/offices/detailsComponents/OfficeDetails";
import { getAllRealEstatesBySlugByLocale } from "@/app/server/real_estates/services";
import { Locale } from "@/types";
import { notFound } from "next/navigation";

interface Props {
    params:Promise<{slug:string,locale:Locale}>
}

import { generateDynamicMetadata } from "@/lib/constants/metadata";

export async function generateMetadata({ params }:Props) {
  const { locale, slug } = await params;
  const office = (await getAllRealEstatesBySlugByLocale(slug,locale,"office")).data;

  return generateDynamicMetadata.page({
    type: "office",
    name:office?.name??"",
    description:office?.description,
    slug,
    imageUrl: office?.cover_image,
    locale,
  });
}
export default async function OfficeBookingPage({ params }: Props) {
    const {locale,slug}= await params
    const realEstate= (await getAllRealEstatesBySlugByLocale(slug,locale,"office")).data
    const images= realEstate?.real_estate_images.map((ele)=> ele.image_url)
    if(!realEstate) return notFound()
        const {name,address} = realEstate
        
  const primaryColor = "#0c479a";


  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <BookingHeader locale={locale} primaryColor={primaryColor} name={name} address={address} />
        {images &&  <OfficeGallery images={images} locale={locale} />}
        <OfficeDetails locale={locale} primaryColor={primaryColor} realEstate={realEstate} />
      </div>
    </div>
  );
}