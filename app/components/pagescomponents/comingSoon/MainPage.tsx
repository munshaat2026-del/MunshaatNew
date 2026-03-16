
import { Locale, type TranslatedComingSoon } from "@/types/index";
import NoComingSoonEvents from "./NoComingSoonEvents";
import ComingSoonEvent from "./ComingSoonEvent";

interface Props {
  data: TranslatedComingSoon | null;
  locale: Locale;
}

export default function ComingSoonPage({ data, locale }: Props) {

  //  CASE 1: NO DATA FOUND (Attractive Empty State)
  if (!data) {
    return <NoComingSoonEvents locale={locale} />;
  }

  // --- CASE 2: DATA EXISTS (Coming Soon Layout) ---
  return <ComingSoonEvent locale={locale} data={data} />;
}
