import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import {
  Locale,
  RealEstateCreateInput,
  RealEstateUpdateInput,
} from "@/types/index";
import { UTApi } from "uploadthing/server";
import { price_period, real_estates_type } from "@/app/generated/prisma/enums";
import { Prisma } from "@/app/generated/prisma/client";

const utapi = new UTApi();

// Add New Real Estate
export const addNewRealEstates = async (
  data: RealEstateCreateInput,
  images: { image_url: string }[],
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const estate = await tx.real_estates.create({
        data,
      });
      if (images?.length) {
        await tx.real_estates_images.createMany({
          data: images.map((img, index) => ({
            ...img,
            real_estates_id: estate.id,
          })),
        });
      }

      return estate;
    });
    revalidateTag("real-estates", "max");
    return {
      status: 201,
      message: "Real estate created successfully",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Error In Adding The Real Estate",
      data: null,
    };
  }
};

// Get all real estates
export const getAllRealEstates = unstable_cache(
  async () => {
    try {
      const estates = await prisma.real_estates.findMany({
        include: {
          real_estates_images: true,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return { data: estates, message: "All Real Estates", status: 200 };
    } catch (error) {
      console.error("Error fetching all real estates:", error);
      return {
        data: null,
        message: "Error In Getting All Real Estates",
        status: 500,
      };
    }
  },
  ["all-real-etsates"],
  { tags: ["real-etsates"], revalidate: 3600 },
);

// Get all real estates with requests
export const getAllRealEstatesWithRequests = unstable_cache(
  async () => {
    try {
      const estates = await prisma.real_estates.findMany({
        select: {
          name_en: true,
          id: true,
          description_en: true,
          real_estates_type: true,
          cover_image: true,
          requests: { select: { id: true } },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      return {
        data: estates,
        message: "All Real Estates With Requests",
        status: 200,
      };
    } catch (error) {
      console.error("Error fetching all real estates:", error);
      return {
        data: null,
        message: "Error In Getting All Real Estates",
        status: 500,
      };
    }
  },
  ["all-real-estates-with-requests"],
  { tags: ["real-estates"], revalidate: 3600 },
);

// Get real estates by type
export const getRealEstatesByType = async (
  type: "store" | "office" | "depot",
) =>
  unstable_cache(
    async () => {
      try {
        const estates = await prisma.real_estates.findMany({
          where: {
            real_estates_type: type,
          },
          include: {
            real_estates_images: true,
          },
          orderBy: {
            created_at: "desc",
          },
        });
        return estates;
      } catch (error) {
        console.error(`Error fetching real estates of type ${type}:`, error);
        return [];
      }
    },
    [`real-estates-by-type-${type}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

// Get real estates by ID
export const getRealEstatesById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const estates = await prisma.real_estates.findUnique({
          where: { id },
          include: {
            real_estates_images: true,
          },
        });
        return { data: estates, message: "Real Estates By ID", status: 200 };
      } catch (error) {
        console.error(`Error fetching real estates of type ${id}:`, error);
        return {
          data: null,
          message: "Error In Getting Real Estates By ID",
          status: 500,
        };
      }
    },
    [`real-estates-by-id-${id}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

// Get real estates by ID
export const getRealEstatesByIdPartially = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const estates = await prisma.real_estates.findUnique({
          where: { id },
          select: {
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            address_ar: true,
            address_en: true,
            cover_image: true,
            floor_number: true,
            size_sqm: true,
          },
        });
        return {
          data: estates,
          message: "Real Estates By ID (Partailly)",
          status: 200,
        };
      } catch (error) {
        console.error(
          `Error fetching real estates (Partailly) of type ${id}:`,
          error,
        );
        return {
          data: null,
          message: "Error In Getting Real Estates By ID (Partailly)",
          status: 500,
        };
      }
    },
    [`real-estates-by-id-partially-${id}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

// Edit real estates
export const editRealEstate = async (
  id: string,
  data: RealEstateUpdateInput,
  updatedImages?: { id?: string; image_url: string }[] | null,
) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const updateRealEstate = await tx.real_estates.update({
        where: { id },
        data,
      });

      if (updatedImages) {
        const keepIds = updatedImages
          .filter((img) => img.id)
          .map((img) => img.id!);
        await tx.real_estates_images.deleteMany({
          where: {
            real_estates_id: id,
            id: { notIn: keepIds },
          },
        });

        const newImages = updatedImages.filter((img) => !img.id);
        if (newImages.length) {
          await tx.real_estates_images.createMany({
            data: newImages.map((img) => ({
              image_url: img.image_url,
              real_estates_id: id,
            })),
          });
        }
      }
      return updateRealEstate;
    });

    revalidateTag("real-estates", "max");
    return {
      status: 201,
      message: "Real estate updated successfully",
      data: result,
    };
  } catch (error) {
    console.log("error: ", error);

    return {
      status: 500,
      message: "Error updating the real estate",
      data: null,
    };
  }
};

// Delete real estates
export const deleteRealEstate = async (id: string) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const images = await tx.real_estates_images.findMany({
        where: { real_estates_id: id },
        select: { image_url: true },
      });
      await tx.real_estates_images.deleteMany({
        where: {
          real_estates_id: id,
        },
      });

      for (const img of images) {
        if (img.image_url) {
          const imageKey = img.image_url?.split("/f/")[1];
          await utapi.deleteFiles(imageKey);
        }
      }
      const estate = await tx.real_estates.delete({
        where: { id },
      });

      const coverImage = await tx.real_estates.findUnique({
        where: { id },
        select: { cover_image: true },
      });
      const coverImageKey = coverImage?.cover_image.split("/f/")[1];
      if (coverImageKey) utapi.deleteFiles(coverImageKey);

      return estate;
    });

    revalidateTag("real-estates", "max");
    return {
      status: 201,
      message: "Real estate deleted successfully",
      data: result,
    };
  } catch (error) {
    console.error("Error deleting real estate:", error);
    return {
      status: 500,
      message: "Error deleting the real estate",
      data: null,
    };
  }
};

export const getRealEstateImages = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.real_estates_images.findMany({
          where: { real_estates_id: id },
          select: { id: true, image_url: true },
        });
        return {
          data: result,
          message: `All Real Estate Images By This ID:${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: `Error In Getting All Real Estate Images By This ID:${id}`,
          status: 500,
        };
      }
    },
    [`all-real-estates-with-images-by-id-${id}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

export const getRealEstateNameById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.real_estates.findFirst({
          where: { id },
          select: { id: true, name_en: true },
        });
        return {
          data: result,
          message: `Real Estate Name By This ID:${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: `Error In Getting Real Estate Name By This ID:${id}`,
          status: 500,
        };
      }
    },
    [`real-estate-name-by-id-${id}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

export const getAllRealEstatesByLocale = async (locale: Locale) =>
  unstable_cache(
    async () => {
      const isArabic = locale === "ar";
      try {
        const estates = await prisma.real_estates.findMany({
          include: {
            real_estates_images: true,
          },
          orderBy: {
            created_at: "desc",
          },
        });

        const translatedEstates = estates.map((ele) => {
          return {
            name: isArabic ? ele.name_ar : ele.name_en,
            description: isArabic ? ele.description_ar : ele.description_en,
            address: isArabic ? ele.address_ar : ele.address_en,
            features: isArabic ? ele.features_ar : ele.features_en,
            price: ele.price,
            price_period: ele.price_period,
            location_link: ele.location_link,
            floor_number: ele.floor_number,
            slug: ele.slug,
            size_sqm: ele.size_sqm,
            real_estates_type: ele.real_estates_type,
            cover_image: ele.cover_image,
          };
        });

        return {
          data: translatedEstates,
          message: "All Real Estates Translated",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Getting All Real Estates Translated",
          status: 500,
        };
      }
    },
    [`all-real-estates-by-locale-${locale}`],
    { tags: ["real-estates"], revalidate: 3600 },
  );

export const getAllRealEstatesBySlugByLocale = async (
  slug: string,
  locale: Locale,
  type:"store" | "office" | "depot",
) =>
  unstable_cache(
    async () => {
      const isArabic = locale === "ar";
      try {
        const estate = await prisma.real_estates.findUnique({
          where: { slug,real_estates_type:type },
          include: {
            real_estates_images: true,
          },
        });

        if (!estate)
          return {
            data: null,
            message: "No Real Estate Found",
            status: 409,
          };
        return {
          data: {
            id: estate.id,
            name: isArabic ? estate.name_ar : estate.name_en,
            description: isArabic
              ? estate.description_ar
              : estate.description_en,
            address: isArabic ? estate.address_ar : estate.address_en,
            features: isArabic ? estate.features_ar : estate.features_en,
            price: estate.price,
            price_period: estate.price_period,
            location_link: estate.location_link,
            floor_number: estate.floor_number,
            slug: estate.slug,
            size_sqm: estate.size_sqm,
           // real_estates_type: estate.real_estates_type,
            cover_image: estate.cover_image,
            real_estate_images:estate.real_estates_images
          },
          message: "Real Estate By Id Translated",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Getting Real Estate By Id Translated",
          status: 500,
        };
      }
    },
    [`all-real-estates-by-slug-${slug}-by-type-${type}-by-locale-${locale}`],
    { tags: ["real-estates"], revalidate: 3600 },
  )();

type filter = {
  minSize?: number;
  maxSize?: number;
  minPrice?: number;
  maxPrice?: number;
  floor?: number;
};

type RealEstateWhereInputs = Prisma.real_estatesWhereInput;

export const getAllRealEstatesByTypeByLocale = async (
  type: "store" | "office" | "depot",
  locale: Locale,
  pageNumber: number,
  filters?: filter,
) =>
  unstable_cache(
    async () => {
      const isArabic = locale === "ar";
      const pageSize = 9;
      const skip = (pageNumber - 1) * pageSize;

      const where: RealEstateWhereInputs = { real_estates_type: type };

      if (filters?.minSize || filters?.maxSize) {
        where.size_sqm = {
          ...(filters?.minSize && { gte: filters.minSize }),
          ...(filters?.maxSize && { lt: filters.maxSize }),
        };
      }

      if (filters?.minPrice || filters?.maxPrice) {
        where.price = {
          ...(filters?.minPrice && { gte: filters.minPrice }),
          ...(filters?.maxPrice && { lte: filters.maxPrice }),
        };
      }

      if (filters?.floor) {
        where.floor_number = filters?.floor;
      }
      try {
        const numberOfPages = await prisma.real_estates.count({ where });
        const estates = await prisma.real_estates.findMany({
          skip,
          take: pageSize,
          where,
          select: {
            id: true,
            name_en: true,
            name_ar: true,
            price_period:true,
            address_en: true,
            slug:true,
            address_ar: true,
            size_sqm: true,
            floor_number: true,
            price:true,
            cover_image:true
          },
        });
        if (estates.length === 0)
          return {
            data: null,
            message: "No Real Estates Found",
            status: 409,
            totlaPages: 0,
          };

        const translatedEstates = estates.map((ele) => {
          return {
            id:ele.id,
            name: isArabic ? ele.name_ar : ele.name_en,
           // description: isArabic ? ele.description_ar : ele.description_en,
            address: isArabic ? ele.address_ar : ele.address_en,
           // features: isArabic ? ele.features_ar : ele.features_en,
            price: ele.price,
            price_period: ele.price_period,
           // location_link: ele.location_link,
            floor_number: ele.floor_number,
          slug: ele.slug,
            size_sqm: ele.size_sqm,
           // real_estates_type: ele.real_estates_type,
            cover_image: ele.cover_image,
          };
        });
        return {
          data: translatedEstates,
          message: "Real Estate By Type Translated",
          status: 200,
          totlaPages: Math.floor(numberOfPages/pageSize),
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Getting Real Estate By Id Translated",
          status: 500,
          totlaPages: 0,
        };
      }
    },
    [
      `all-real-estates-${type}-${locale}-${pageNumber}-${JSON.stringify(filters)}`,
    ],
    { tags: ["real-estates"], revalidate: 3600 },
  )();
