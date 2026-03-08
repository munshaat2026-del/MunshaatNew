import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";
import {Locale, ParkingsCreateInput ,parkingsUpdateInput} from "@/types/index"

const utapi = new UTApi();



// Add a new parking
export const addParking = async (data: ParkingsCreateInput) => {
  try {
    const parking = await prisma.parkings.create({ data });
    revalidateTag("parkings", "max");
    return { status: 201, message: "Parking added", data: parking };
  } catch (error) {
    console.error("Error adding parking:", error);
    return { status: 500, message: "Failed to add parking", data: null };
  }
};

// Edit parking by ID
export const editParking = async (id: string, data: parkingsUpdateInput) => {
  try {
    const parking = await prisma.parkings.update({
      where: { id },
      data,
    });
    revalidateTag("parkings", "max");
    return { status: 201, message: "Parking updated", data: parking };
  } catch (error) {
    console.error("Error updating parking:", error);
    return { status: 500, message: "Failed to update parking", data: null };
  }
};

// Delete parking by ID
export const deleteParking = async (id: string) => {
  try {
    const parking = await prisma.parkings.delete({ where: { id } });
    const imageKey = parking.image?.split("/f/")[1];
    if (imageKey) utapi.deleteFiles(imageKey);
    revalidateTag("parkings", "max");
    return { status: 201, message: "Parking deleted", data: parking };
  } catch (error) {
    console.error("Error deleting parking:", error);
    return { status: 500, message: "Failed to delete parking", data: null };
  }
};

// Get all parkings
export const getAllParkings = unstable_cache(
  async () => {
    try {
      const parkings = await prisma.parkings.findMany({
        orderBy: { created_at: "desc" },
      });
      return {
        data: parkings,
        message: "All parkings",
        status: 200,
      };
    } catch (error) {
      console.error("Error fetching parkings:", error);
      return {
        data: null,
        message: "Error fetching parkings",
        status: 500,
      };
    }
  },
  ["all-parkings"],
  { tags: ["parkings"], revalidate: 3600 },
);

// Get all parkings with requests
export const getAllParkingsWithRequest = unstable_cache(
  async () => {
    try {
      const parkings = await prisma.parkings.findMany({
        orderBy: { created_at: "desc" },
        select: {
          requests: { select: { id: true } },
          id: true,
          name_en: true,
          image: true,
          description_en: true,
        },
      });
      return {
        data: parkings,
        message: "All parkings with requests",
        status: 200,
      };
    } catch (error) {
      console.error("Error fetching parkings:", error);
      return {
        data: null,
        message: "Error fetching parkings",
        status: 500,
      };
    }
  },
  ["all-parkings-with-requests"],
  { tags: ["parkings"], revalidate: 3600 },
);

// Get parking by ID
export const getParkingById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const parking = await prisma.parkings.findUnique({
          where: { id },
        });
        return {
          data: parking,
          message: `Parking of this id: ${id}`,
          status: 200,
        };
      } catch (error) {
        console.error("Error fetching parking by ID:", error);
        return {
          data: null,
          message: `Error fetching parking by ID: ${id}`,
          status: 500,
        };
      }
    },
    [`parking-by-id-${id}`],
    { tags: ["parkings"], revalidate: 3600 },
  )();

export const getParkingByIdPartially = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const parking = await prisma.parkings.findUnique({
          where: { id },
          select: {
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            address_ar: true,
            address_en: true,
            image: true,
          },
        });
        return {
          data: parking,
          message: `Parking of this id: ${id}`,
          status: 200,
        };
      } catch (error) {
        console.error("Error fetching parking by ID:", error);
        return {
          data: null,
          message: `Error fetching parking by ID: ${id}`,
          status: 500,
        };
      }
    },
    [`parking-by-id-partially-${id}`],
    { tags: ["parkings"], revalidate: 3600 },
  )();

export const getParkingNameById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.parkings.findFirst({
          where: { id },
          select: { id: true, name_en: true },
        });
        return {
          data: result,
          message: `Parking Name By This ID:${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: `Error In Getting Parking Name By This ID:${id}`,
          status: 500,
        };
      }
    },
    [`parking-name-by-id-${id}`],
    { tags: ["parkings"], revalidate: 3600 },
  )();


  export const getAllParkingsByLocale = async (locale: Locale) =>
  unstable_cache(
    async () => {
      const isArabic = locale === "ar";
      try {
        const parkings = await prisma.parkings.findMany({
          orderBy: { created_at: "desc" },
        });

        const translatedParkings = parkings.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: isArabic ? p.name_ar : p.name_en,
          description: isArabic ? p.description_ar : p.description_en,
          address: isArabic ? p.address_ar : p.address_en,
          location_link: p.location_link,
          image: p.image,
          total_spots: p.total_spots,
          price_monthly: p.price_monthly,
          price_yearly: p.price_yearly,
        }));

        return {
          data: translatedParkings,
          message: "All Parkings Translated",
          status: 200,
        };
      } catch (error) {
        console.error("Error fetching parkings:", error);
        return {
          data: null,
          message: "Error In Getting All Parkings Translated",
          status: 500,
        };
      }
    },
    [`all-parkings-by-locale-${locale}`],
    { tags: ["parkings"], revalidate: 3600 },
  );


  export const getParkingByIdByLocale = async (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      const isArabic = locale === "ar";
      try {
        const parking = await prisma.parkings.findUnique({
          where: { id },
        });

        if (!parking)
          return {
            data: null,
            message: "No Parking Found",
            status: 409,
          };

        return {
          data: {
            id: parking.id,
            slug: parking.slug,
            name: isArabic ? parking.name_ar : parking.name_en,
            description: isArabic ? parking.description_ar : parking.description_en,
            address: isArabic ? parking.address_ar : parking.address_en,
            location_link: parking.location_link,
            image: parking.image,
            total_spots: parking.total_spots,
            price_monthly: parking.price_monthly,
            price_yearly: parking.price_yearly,
          },
          message: "Parking By Id Translated",
          status: 200,
        };
      } catch (error) {
        console.error("Error fetching parking by id:", error);
        return {
          data: null,
          message: "Error In Getting Parking By Id Translated",
          status: 500,
        };
      }
    },
    [`all-parkings-by-id-${id}-by-locale-${locale}`],
    { tags: ["parkings"], revalidate: 3600 },
  );
