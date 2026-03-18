
import { notFound } from "next/navigation";
import {  getCareerBySlugAndLocale } from "@/app/server/careers/services";
import { Locale } from "@/types";
import SingleJobPage from "@/app/components/pagescomponents/career/SingleCareerPage"
import { generateDynamicMetadata } from "@/lib/constants/metadata";
interface Props {
  params: Promise<{ slug: string,locale:Locale }>;
}



export async function generateMetadata({ params }:Props) {
  const { locale, slug } = await params;
  const career = (await getCareerBySlugAndLocale(slug,locale)).data;

  return generateDynamicMetadata.page({
    type: "career",
    name:career?.position??"",
    description:career?.description,
    slug,
    imageUrl: career?.image,
    locale,
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { slug,locale } = await params;
const job= (await getCareerBySlugAndLocale(slug,locale)).data

  if (job===null) return notFound();

  return (
    <div>
      <SingleJobPage locale={locale} job={job} />
    </div>
  );
}