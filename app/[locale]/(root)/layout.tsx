


import {Footer} from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FontSwitcher from "@/app/components/fontswitcher/FontSwitcher";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';
import {getComingSoonCount} from "@/app/server/coming_soon/services"
import { Suspense } from "react";
import Loading from "@/app/loading";

type Props = {
  children: React.ReactNode;
  params:Promise< { locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

const count= (await getComingSoonCount()).data
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;


  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FontSwitcher locale={locale}>
        <div className="flex flex-col min-h-screen " dir={dir}>
          <Navbar isComingSoon={count>0? true:false} />
          <main className="flex-1">
       
           <Suspense fallback={<Loading/>}> {children}</Suspense>
          </main>
          <Footer />
        </div>
      </FontSwitcher>
    </NextIntlClientProvider>
  );
}
