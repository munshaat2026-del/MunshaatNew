// lib/metadata.ts
import type { Metadata } from "next";

// ---- Environment & Base Info ----
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const SITE_TITLE =
  process.env.NEXT_PUBLIC_SITE_TITLE ||
  "Reeac";
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
  "real estate",
  "real estate Amman",
  "commercial real estate Amman",
  "offices",
  "offices in Amman",
  "offices for rent in Amman",
  "retail shops",
  "retail shops in Amman",
  "shops for rent",
  "shops for rent in Amman",
  "Al Burj Complex",
  "Al Burj Complex Amman",
  "offices in Al Burj Complex",
  "shops in Al Burj Complex",
  "Shabsoog Complex",
  "Shabsoog Complex Amman",
  "offices in Shabsoog Complex",
  "shops in Shabsoog Complex",
  "REEAC",
  "REEAC Jordan",
  "REEAC real estate company",

  // Arabic
  "مكاتب للإيجار",
  "محلات تجارية للإيجار",
  "مستودعات للإيجار",
  "مواقف سيارات للإيجار",
  "عقارات تجارية",
  "تأجير المكاتب",
  "مساحات تجارية",
  "تأجير المستودعات",
  "عقارات",
  "عقارات في عمان",
  "عقارات تجارية",
  "مكاتب",
  "مكاتب في عمان",
  "مكاتب للإيجار في عمان",
  "محلات تجارية",
  "محلات تجارية في عمان",
  "محلات للإيجار",
  "محلات تجارية للإيجار في عمان",
  "مجمع البرج",
  "مجمع البرج عمان",
  "مكاتب مجمع البرج",
  "محلات مجمع البرج",
  "مجمع شابسوغ",
  "مجمع شابسوغ عمان",
  "مكاتب مجمع شابسوغ",
  "محلات مجمع شابسوغ",
  "REEAC",
  "REEAC Jordan",
  "شركة REEAC",
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

// Used for /slug pages 
export const generateDynamicMetadata = {
  page: (opts: {
    type:
      | "store"
      | "office"
      | "depot"
      | "career"
      | "parking"
      | "tender"
      | "comingSoon"
      | "requestForm";
    name: string;
    description?: string; // assume this is already localized (EN/AR) when provided
    slug: string;
    imageUrl?: string;
    locale?: "en" | "ar";
  }): Metadata => {
    const isArabic = opts.locale === "ar";
    const localeTag = isArabic ? "ar-JO" : "en-US";

    // map type -> label (localized)
    const typeLabels: Record<string, { en: string; ar: string }> = {
      store: { en: "Store", ar: "محل تجاري" },
      office: { en: "Office", ar: "مكتب" },
      depot: { en: "Depot", ar: "مستودع" },
      career: { en: "Career", ar: "وظيفة" },
      parking: { en: "Parking", ar: "موقف سيارات" },
      tender: { en: "Tender", ar: "مناقصة" },
      comingSoon: { en: "Coming Soon", ar: "قريباً" },
      requestForm: { en: "Request Form", ar: "نموذج طلب" },
    };

    // human-friendly path segments (used to create canonical/alternate URLs)
    const pathSegments: Record<string, string> = {
      store: "stores",
      office: "offices",
      depot: "depot",
      career: "careers",
      parking: "parkings",
      tender: "tenders",
      comingSoon: "coming-soon",
      requestForm: "request-form",
    };

    // localized default descriptions (fallback when opts.description is not provided)
    const defaultDescs: Record<
      string,
      { en: string; ar: string }
    > = {
      store: {
        en: `${opts.name} — retail store for rent in Amman. Find prime commercial space managed professionally.`,
        ar: `${opts.name} — محل تجاري متوفر للإيجار في عمّان. اختر مساحة تجارية مميزة ومُدارة باحترافية.`,
      },
      office: {
        en: `${opts.name} — office space for rent in Amman. Modern administrative spaces ideal for businesses.`,
        ar: `${opts.name} — مكتب متوفر للإيجار في عمّان. مساحات إدارية حديثة مناسبة للأعمال.`,
      },
      depot: {
        en: `${opts.name} — warehouse/depot available for rent in Amman, suitable for logistics and storage needs.`,
        ar: `${opts.name} — مستودع متوفر للإيجار في عمّان، مناسب للاحتياجات اللوجستية والتخزين.`,
      },
      career: {
        en: `Career opportunity: ${opts.name} at ${SITE_TITLE}. Learn more and apply.`,
        ar: `فرصة وظيفية: ${opts.name} في ${SITE_TITLE}، تعرّف على التفاصيل وقدّم طلبك.`,
      },
      parking: {
        en: `${opts.name} — parking space available for rent in Amman. Secure and convenient parking solutions.`,
        ar: `${opts.name} — موقف سيارات متوفر للإيجار في عمّان. حلول مريحة وآمنة لمواقف السيارات.`,
      },
      tender: {
        en: `Tender: ${opts.name} — procurement opportunity published by ${SITE_TITLE}.`,
        ar: `مناقصة: ${opts.name} — فرصة طرح من قبل ${SITE_TITLE}.`,
      },
      comingSoon: {
        en: `${opts.name} — upcoming property. Stay tuned for a new office/store/depot listing from ${SITE_TITLE}.`,
        ar: `${opts.name} — مشروع قادم. تابع للإعلان عن مكتب/محل/مستودع جديد من ${SITE_TITLE}.`,
      },
      requestForm: {
        en: `${opts.name} — submit your request via the official form at ${SITE_TITLE}.`,
        ar: `${opts.name} — قدّم طلبك عبر النموذج الرسمي لدى ${SITE_TITLE}.`,
      },
    };

    const typeLabel = typeLabels[opts.type][isArabic ? "ar" : "en"];
    const description =
      opts.description || defaultDescs[opts.type][isArabic ? "ar" : "en"];

    // construct page path and alternates
    const segment = pathSegments[opts.type];
    const localizedPath = `${opts.locale ?? "en"}/${segment}/${opts.slug}`;
    const canonicalUrl = `${SITE_URL}/${localizedPath}`;
    const altEn = `${SITE_URL}/en/${segment}/${opts.slug}`;
    const altAr = `${SITE_URL}/ar/${segment}/${opts.slug}`;

    const keywords = [SITE_TITLE, opts.name, typeLabel, ...Array.from(COMMON_KEYWORDS)];

    return {
      title: isArabic
        ? `${opts.name} | ${typeLabel} — ${SITE_TITLE}`
        : `${opts.name} | ${typeLabel} — ${SITE_TITLE}`,
      description,
      keywords: keywords.join(", "),
      alternates: {
        canonical: canonicalUrl,
        languages: {
          en: altEn,
          ar: altAr,
        },
      },
      openGraph: {
        title: `${opts.name} | ${typeLabel} — ${SITE_TITLE}`,
        description,
        url: canonicalUrl,
        siteName: SITE_TITLE,
        locale: localeTag,
        type: "article",
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
        title: `${opts.name} | ${typeLabel} — ${SITE_TITLE}`,
        description,
        images: [opts.imageUrl ? opts.imageUrl : `${SITE_URL}/og-image.jpg`],
      },
    };
  },
};

/* ------------------------------- */

import { Locale } from "@/types";
// Used for pages with locale
type PageKey =
  | "home" // 
  | "offices"
  | "stores"
  | "depots"
  | "parkings"
  | "careers"
  | "about"
  | "contact"
  | "comingSoon"
  | "tenders"
  | "requestForm";

const translations: Record<
  PageKey,
  {
    en: { title: string; description: string };
    ar: { title: string; description: string };
  }
> = {
  offices: {
    en: {
      title: "Offices for Rent",
      description:
        "Browse modern office spaces for rent in Amman. Discover professional administrative environments designed for businesses and organizations.",
    },
    ar: {
      title: "المكاتب للإيجار",
      description:
        "تصفح المكاتب المتوفرة للإيجار في عمّان واكتشف مساحات إدارية حديثة مصممة لتلبية احتياجات الشركات والمؤسسات.",
    },
  },
   home: {
    en: {
      title: "REEAC — Commercial Leasing in Amman",
      description:
        "A modern real estate platform offering offices, retail stores, depots, and parking spaces for rent in Amman. Professionally managed commercial assets.",
    },
    ar: {
      title: "شركة المنشآت والمجمعات العقارية | REEAC",
      description:
        "شركة المنشآت والمجمعات العقارية هي الذراع العقاري المسؤول عن إدارة واستثمار وتأجير الأصول العقارية التجارية والإدارية في الأردن.",
    },
   },

  stores: {
    en: {
      title: "Retail Stores for Rent",
      description:
        "Explore retail stores for rent in prime commercial locations. Find the ideal space to grow your business in professionally managed properties.",
    },
    ar: {
      title: "المحلات التجارية للإيجار",
      description:
        "استكشف المحلات التجارية المتوفرة للإيجار في مواقع تجارية مميزة واختر المساحة المناسبة لتوسيع أعمالك.",
    },
  },

  depots: {
    en: {
      title: "Storage Depots for Rent",
      description:
        "Find storage depots and warehouse spaces for rent in Amman. Ideal for logistics operations, storage solutions, and business needs.",
    },
    ar: {
      title: "مستودعات للإيجار",
      description:
        "اكتشف المستودعات ومساحات التخزين المتوفرة للإيجار في عمّان والمناسبة للأعمال اللوجستية واحتياجات التخزين.",
    },
  },

  parkings: {
    en: {
      title: "Parking Spaces for Rent",
      description:
        "Discover available parking spaces for rent in strategic locations, offering convenient and secure parking solutions.",
    },
    ar: {
      title: "مواقف السيارات للإيجار",
      description:
        "اكتشف مواقف السيارات المتوفرة للإيجار في مواقع استراتيجية توفر حلولاً مريحة وآمنة.",
    },
  },

  careers: {
    en: {
      title: "Careers",
      description:
        "Explore career opportunities and join a professional team working in real estate management and development.",
    },
    ar: {
      title: "الوظائف",
      description:
        "استكشف الفرص الوظيفية وانضم إلى فريق متخصص يعمل في إدارة وتطوير الأصول العقارية.",
    },
  },

  about: {
    en: {
      title: "About Us",
      description:
        "Learn about the Real State Establishment and Complexs Company, the real estate arm responsible for managing commercial assets in Jordan.",
    },
    ar: {
      title: "من نحن",
      description:
        "تعرف على شركة المنشآت والمجمعات العقارية، الذراع العقاري للحكومة الأردنية والمسؤولة عن إدارة واستثمار الأصول العقارية.",
    },
  },

  contact: {
    en: {
      title: "Contact Us",
      description:
        "Contact our team for inquiries about offices, stores, depots, or parking spaces available for rent.",
    },
    ar: {
      title: "اتصل بنا",
      description:
        "تواصل مع فريقنا للاستفسار حول المكاتب أو المحلات أو المستودعات أو مواقف السيارات المتوفرة للإيجار.",
    },
  },

  comingSoon: {
    en: {
      title: "Upcoming Properties",
      description:
        "Stay updated with upcoming real estate projects. Discover new offices, stores, and depots soon available for rent.",
    },
    ar: {
      title: "قريبا",
      description:
        "تابع أحدث المشاريع العقارية القادمة. اكتشف المكاتب والمحلات والمستودعات التي ستكون متاحة للإيجار قريباً.",
    },
  },

  tenders: {
    en: {
      title: "Tenders",
      description:
        "Explore the latest real estate tenders and opportunities published by Real State Establishment and Complexs Company.",
    },
    ar: {
      title: "العطاءات",
      description:
        "استعرض أحدث العطاءات والفرص العقارية المنشورة من قبل شركة المنشآت والمجمعات العقارية.",
    },
  },

  requestForm: {
    en: {
      title: "Submit Your Request",
      description:
        "Submit your request for offices, stores, depots, or parking spaces through our secure online form.",
    },
    ar: {
      title: "نموذج الطلب",
      description:
        "قدّم طلبك للمكاتب أو المحلات أو المستودعات أو مواقف السيارات عبر نموذجنا الإلكتروني الآمن.",
    },
  },
};

export function generatePageMetadata(
  page: PageKey,
  locale: Locale
): Metadata {
  const isArabic = locale === "ar";
  const t = translations[page][isArabic ? "ar" : "en"];
  const isHome = page === "home";

  const basePath = isHome ? `${locale}` : `${locale}/${page}`;

  return {
    title: `${t.title}`,
    description: t.description,

    alternates: {
      canonical: `${SITE_URL}/${basePath}`,
      languages: {
        en: `${SITE_URL}/en${isHome ? "" : `/${page}`}`,
        ar: `${SITE_URL}/ar${isHome ? "" : `/${page}`}`,
      },
    },

    openGraph: {
      title: t.title,
      description: t.description,
      url: `${SITE_URL}/${basePath}`,
      siteName: SITE_TITLE,
      type: "website",
      locale: isArabic ? "ar_JO" : "en_US",
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
      title: t.title,
      description: t.description,
      images: [`${SITE_URL}/logo.png`],
    },
  };
}