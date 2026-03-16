// lib/metadata.ts
import type { Metadata } from "next";

// ---- Environment & Base Info ----
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  "Real State Establishment And Complexs Company";
export const APP_NAME = SITE_TITLE;
export const SITE_TAGLINE =
  "Offices, Stores & Depots for Rent — Commercial & Administrative Leasing";
export const HOME_DESCRIPTION_EN =
  "A modern commercial real-estate manager offering offices, retail stores, depots and parking spaces for rent in Amman. Professional asset management aligned with institutional standards and national policy.";
export const HOME_DESCRIPTION_AR =
  "ﺗُﻌﺪ ﺷﺮﻛﺔ اﻟﻤﻨﺸﺂت واﻟﻤﺠﻤﻌﺎت اﻟﻌﻘﺎرﻳﺔ اﻟﺬراع اﻟﻌﻘﺎري لﻟﺤﻜﻮﻣﺔ اﻷردﻧﻴﺔ، وﺗﻌﻤﻞ ﻋﻠﻰ إدارة واﺳﺘﺜﻤﺎر اﻷﺻﻮل اﻟﻌﻘﺎرﻳﺔ ﻟﻠﻐﺮاﺽ اﻟﺘﺠﺎري وﺍﻹداري.";

// Use both english and arabic keywords for SEO
export const COMMON_KEYWORDS = [
  // English
  "offices for rent",
  "stores for rent",
  "depots for rent",
  "commercial property leasing",
  "office space amman",
  "retail space amman",
  "warehouse for rent",
  "parking spaces for rent",
  "commercial real estate",
  "property management",
  "asset management",
  "business spaces",
  "industrial depot leasing",

  // Arabic
  "مكاتب للإيجار",
  "محلات تجارية للإيجار",
  "مستودعات للإيجار",
  "مواقف سيارات للإيجار",
  "عقارات تجارية",
  "تأجير المكاتب",
  "مساحات تجارية",
  "تأجير المستودعات",
] as const;

// ---- Defaults / Root metadata ----
export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: APP_NAME,
  description: HOME_DESCRIPTION_EN,
  icons: {
    icon: `${SITE_URL}/favicon.ico`,
    shortcut: `${SITE_URL}/favicon.ico`,
    apple: `${SITE_URL}/logo.png`,
  },
  openGraph: {
    type: "website",
    locale: "en-US",
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    siteName: SITE_TITLE,
    url: SITE_URL,
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    images: [`${SITE_URL}/logo.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

// ---- Home metadata ----
export const HOME_METADATA: Metadata = {
  title: `${APP_NAME} — Commercial Leasing in Amman`,
  description: HOME_DESCRIPTION_EN,
  keywords: COMMON_KEYWORDS.join(", "),
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    locale: "en-US",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — Offices, Stores & Depots`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: HOME_DESCRIPTION_EN,
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

// ---- Static pages (About / Contact / Careers / Tenders / Parkings / Coming Soon) ----
export const ABOUT_METADATA: Metadata = {
  title: `${SITE_TITLE} — About Us`,
  description: HOME_DESCRIPTION_EN,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — About Us`,
    description: HOME_DESCRIPTION_EN,
    url: `${SITE_URL}/about`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_TITLE} — About Us`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_TITLE} — About Us`,
    description: HOME_DESCRIPTION_EN,
  },
};

export const CONTACT_METADATA: Metadata = {
  title: `${SITE_TITLE} — Contact`,
  description: HOME_DESCRIPTION_EN,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Contact`,
    description: HOME_DESCRIPTION_EN,
    url: `${SITE_URL}/contact`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
};

export const CAREERS_METADATA: Metadata = {
  title: `${SITE_TITLE} — Careers`,
  description: `Find career opportunities at ${SITE_TITLE}.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Careers`,
    description: `Find career opportunities at ${SITE_TITLE}.`,
    url: `${SITE_URL}/careers`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
};

export const TENDERS_METADATA: Metadata = {
  title: `${SITE_TITLE} — Tenders`,
  description: `Public tenders and procurement opportunities from ${SITE_TITLE}.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Tenders`,
    description: `Public tenders and procurement opportunities from ${SITE_TITLE}.`,
    url: `${SITE_URL}/tenders`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
};

export const PARKINGS_METADATA: Metadata = {
  title: `${SITE_TITLE} — Parkings`,
  description: `Available parking spaces and parking leases in Amman.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Parkings`,
    description: `Available parking spaces and parking leases in Amman.`,
    url: `${SITE_URL}/parkings`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
};

export const COMING_SOON_METADATA: Metadata = {
  title: `${SITE_TITLE} — Coming Soon`,
  description: `Upcoming properties and announcements.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — Coming Soon`,
    description: `Upcoming properties and announcements.`,
    url: `${SITE_URL}/coming-soon`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
};

// ---- Properties listing pages (stores / offices / depot) ----
// Generic listing page metadata factory
export const LISTING_METADATA = (typeLabel: string, path = ""): Metadata => ({
  title: `${SITE_TITLE} — ${typeLabel}`,
  description: `Available ${typeLabel.toLowerCase()} for rent in Amman.`,
  keywords: COMMON_KEYWORDS.join(", "),
  openGraph: {
    title: `${SITE_TITLE} — ${typeLabel}`,
    description: `Available ${typeLabel.toLowerCase()} for rent in Amman.`,
    url: `${SITE_URL}/${path}`,
    siteName: SITE_TITLE,
    locale: "en-US",
    type: "website",
  },
});

// ---- Dynamic metadata generator for detail pages (e.g. stores/[slug], offices/[slug], depot/[slug], careers/[slug]) ----
export const generateDynamicMetadata = {
  page: (opts: {
    type: "store" | "office" | "depot" | "career" | "parking";
    name: string;
    description?: string;
    slug: string;
    imageUrl?: string;
    locale?: "en" | "ar";
  }): Metadata => {
    const locale = opts.locale === "ar" ? "ar-JO" : "en-US";
    const defaultDesc =
      opts.type === "career"
        ? `Career: ${opts.name} at ${SITE_TITLE}`
        : `${opts.name} — ${opts.type} available for rent`;

    const description = opts.description || defaultDesc;
    const typeLabel =
      opts.type === "store"
        ? "Store"
        : opts.type === "office"
        ? "Office"
        : opts.type === "depot"
        ? "Depot"
        : opts.type === "career"
        ? "Career"
        : "Parking";

    const keywords = [
      SITE_TITLE,
      opts.name,
      typeLabel,
      ...Array.from(COMMON_KEYWORDS),
    ];

    return {
      title: `${opts.name} | ${typeLabel} — ${SITE_TITLE}`,
      description,
      keywords: keywords.join(", "),
      openGraph: {
        title: `${opts.name} | ${SITE_TITLE}`,
        description,
        type: "article",
        siteName: SITE_TITLE,
        locale,
        images: [
          {
            url: opts.imageUrl ? opts.imageUrl : `${SITE_URL}/og-image.jpg`,
            width: 1200,
            height: 630,
            alt: opts.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${opts.name} | ${SITE_TITLE}`,
        description,
        images: [opts.imageUrl ? opts.imageUrl : `${SITE_URL}/og-image.jpg`],
      },
    };
  },
};
/*
// ---- Exports for convenience ----
export {
  HOME_METADATA,
  ABOUT_METADATA,
  CONTACT_METADATA,
  CAREERS_METADATA,
  TENDERS_METADATA,
  PARKINGS_METADATA,
  COMING_SOON_METADATA,
  LISTING_METADATA,
  COMMON_KEYWORDS,
};*/