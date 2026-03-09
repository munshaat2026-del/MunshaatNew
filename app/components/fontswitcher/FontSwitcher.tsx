"use client";

import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
});

export default function FontSwitcher({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const fontClass = locale === "ar" ? notoSansArabic.className : notoSans.className;

  return <div className={fontClass}>{children}</div>;
}