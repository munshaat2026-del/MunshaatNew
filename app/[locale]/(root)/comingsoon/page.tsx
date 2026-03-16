import { getAllComingSoonByLocale } from '@/app/server/coming_soon/services'
import { Locale } from '@/types'
import ComingSoonPage from "@/app/components/pagescomponents/comingSoon/MainPage"

interface Props {
  params: Promise<{ locale: Locale }>
}

async function page({ params }: Props) {
  const { locale } = await params;
  const response = await getAllComingSoonByLocale(locale);
  const comingSoonData = response?.data;

  // Handle zero rows by passing null; the component will show default content
  const data = comingSoonData && comingSoonData.length > 0 ? comingSoonData[0] : null;

  return (
    <ComingSoonPage data={data} locale={locale} />
  )
}

export default page