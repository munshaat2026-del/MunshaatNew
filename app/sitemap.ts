import {
  fetchStoreSlugs,
  fetchOfficeSlugs,
  fetchDepotSlugs,
  fetchCareerSlugs,
  fetchParkingSlugs,
} from "@/lib/sitemap.prisma";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap() {
  const now = new Date();

  // Static pages
  const staticPages = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/stores`, lastModified: now },
    { url: `${SITE_URL}/offices`, lastModified: now },
    { url: `${SITE_URL}/depot`, lastModified: now },
    { url: `${SITE_URL}/parkings`, lastModified: now },
    { url: `${SITE_URL}/tenders`, lastModified: now },
    { url: `${SITE_URL}/careers`, lastModified: now },
    { url: `${SITE_URL}/comingSoon`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
  ];

  // Fetch dynamic slugs
  const storeSlugs = await fetchStoreSlugs();
  const officeSlugs = await fetchOfficeSlugs();
  const depotSlugs = await fetchDepotSlugs();
  const careerSlugs = await fetchCareerSlugs();
  const parkingSlugs = await fetchParkingSlugs();

  // Map dynamic pages
  const storePages = storeSlugs.map((s) => ({
    url: `${SITE_URL}/stores/${s.slug}`,
    lastModified: now,
  }));

  const officePages = officeSlugs.map((o) => ({
    url: `${SITE_URL}/offices/${o.slug}`,
    lastModified: now,
  }));

  const depotPages = depotSlugs.map((d) => ({
    url: `${SITE_URL}/depot/${d.slug}`,
    lastModified: now,
  }));

  const careerPages = careerSlugs.map((c) => ({
    url: `${SITE_URL}/careers/${c.slug}`,
    lastModified: now,
  }));

  const parkingPages = parkingSlugs.map((p) => ({
    url: `${SITE_URL}/parkings/${p.slug}`,
    lastModified: now,
  }));

  return [
    ...staticPages,
    ...storePages,
    ...officePages,
    ...depotPages,
    ...careerPages,
    ...parkingPages,
  ];
}