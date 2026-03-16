// lib/sitemap.prisma.ts

import prisma from "@/lib/prisma";

/**
 * Stores
 */
export async function fetchStoreSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await prisma.real_estates.findMany({
      where:{real_estates_type:"store"},
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching store slugs:", err);
    return [];
  }
}

/**
 * Offices
 */
export async function fetchOfficeSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await prisma.real_estates.findMany({
      where:{real_estates_type:"office"},
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching office slugs:", err);
    return [];
  }
}

/**
 * Depots
 */
export async function fetchDepotSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await prisma.real_estates.findMany({
      where:{real_estates_type:"depot"},
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching depot slugs:", err);
    return [];
  }
}

/**
 * Careers
 */
export async function fetchCareerSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await prisma.careers.findMany({
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching career slugs:", err);
    return [];
  }
}

/**
 * Parkings
 */
export async function fetchParkingSlugs(): Promise<Array<{ slug: string }>> {
  try {
    return await prisma.parkings.findMany({
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching parking slugs:", err);
    return [];
  }
}