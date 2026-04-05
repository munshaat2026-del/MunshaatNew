import {
  fetchStoreSlugs,
  fetchOfficeSlugs,
  fetchDepotSlugs,
  fetchCareerSlugs,
  fetchParkingSlugs,
} from "@/lib/sitemap.prisma";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const locales = ["en", "ar"] as const;

export default async function sitemap() {
  const now = new Date();

  // Helper to generate localized URLs
  const withLocales = (path: string) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
    }));

  // Static pages
  const staticPaths = [
    "",
    "/about",
    "/stores",
    "/offices",
    "/depot",
    "/parkings",
    "/tenders",
    "/careers",
    "/comingsoon", 
    "/contact",
  ];

  const staticPages = staticPaths.flatMap((path) => withLocales(path));

  // Fetch dynamic slugs
  const storeSlugs = await fetchStoreSlugs();
  const officeSlugs = await fetchOfficeSlugs();
  const depotSlugs = await fetchDepotSlugs();
  const careerSlugs = await fetchCareerSlugs();
  const parkingSlugs = await fetchParkingSlugs();

  // Dynamic pages helper
  const mapDynamic = (items: { slug: string }[], base: string) =>
    items.flatMap((item) =>
      locales.map((locale) => ({
        url: `${SITE_URL}/${locale}${base}/${item.slug}`,
        lastModified: now,
      }))
    );

  const storePages = mapDynamic(storeSlugs, "/stores");
  const officePages = mapDynamic(officeSlugs, "/offices");
  const depotPages = mapDynamic(depotSlugs, "/depot");
  const careerPages = mapDynamic(careerSlugs, "/careers");
  const parkingPages = mapDynamic(parkingSlugs, "/parkings");

  return [
    ...staticPages,
    ...storePages,
    ...officePages,
    ...depotPages,
    ...careerPages,
    ...parkingPages,
  ];
}