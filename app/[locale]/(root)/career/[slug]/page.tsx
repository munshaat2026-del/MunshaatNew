
import { notFound } from "next/navigation";
import {  getCareerBySlugAndLocale } from "@/app/server/careers/services";
import { Locale } from "@/types";
import SingleJobPage from "@/app/components/pagescomponents/career/SingleCareerPage"
interface Props {
  params: Promise<{ slug: string,locale:Locale }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { slug,locale } = await params;
const job= (await getCareerBySlugAndLocale(slug,locale)).data
console.log("job: ",job);

  if (job===null) return notFound();

  return (
    <div>
      <SingleJobPage locale={locale} job={job} />
    </div>
  );
}