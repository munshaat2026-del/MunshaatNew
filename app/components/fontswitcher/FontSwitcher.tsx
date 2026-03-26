"use client";

import { Noto_Sans, Cairo } from "next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const cairoArabic = Cairo({
  subsets: ["arabic"],
  // Cairo offers a wide range of weights (200-900)
  weight: ["400", "500", "600", "700"], 
  display: "swap",
});

export default function FontSwitcher({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const isArabic = locale === "ar";
  const fontClass = isArabic ? cairoArabic.className : notoSans.className;

  return (
    <div
      className={fontClass}
      style={{
        // Essential fixes for the iOS "disconnected letters" bug
        letterSpacing: isArabic ? "0" : "normal",
        fontVariantLigatures: isArabic ? "common-ligatures" : "normal",
        textRendering: "optimizeLegibility",
        wordBreak: isArabic ? "keep-all" : "normal",
      }}
    >
      {children}
    </div>
  );
}