import { Locale } from '@/types'
import React from 'react'
import {getCareersByLocale} from "@/app/server/careers/services"
import AllCareersPage from "@/app/components/pagescomponents/career/AllCareerPage"
import { generatePageMetadata } from "@/lib/constants/metadata";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  return generatePageMetadata("careers", (await params).locale);
}

interface Props{
  params:Promise<{locale:Locale}>
}
async function page({params}:Props) {
const {locale}= await params
  const allCareers=   (await getCareersByLocale(locale)).data

  return (
    <div>
      <AllCareersPage careers={allCareers} locale={locale} />
    </div>
  )
}

export default page