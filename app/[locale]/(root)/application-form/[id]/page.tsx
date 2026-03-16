import { getCareerByIdAndLocale } from '@/app/server/careers/services'
import { notFound } from 'next/navigation'
import NewApplicationForm from '@/components/applications/submittingApplications/SubmitNewApplication'
import {newApplicationAction} from "../(actions)/newApplication"


interface Props {
    params: Promise<{id:string ,locale:"en"| "ar"}>
}
async function page({params}:Props) {
 const id= (await params).id
 const locale= (await params).locale
 const selectedCareer= await getCareerByIdAndLocale(id,locale)
 if(selectedCareer.data===null) return notFound()
  return (
    <NewApplicationForm action={newApplicationAction}  locale={locale} career={selectedCareer.data}/>
  )
}

export default page