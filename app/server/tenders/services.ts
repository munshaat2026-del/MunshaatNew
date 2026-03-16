import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";
import { TenderCreateInput, TenderUpdateInput } from "@/types";

const utapi = new UTApi();

// Create new tender
export const newTender = async (data: TenderCreateInput) => {
  try {
    const result = await prisma.tender.create({
      data,
    });

    revalidateTag("tenders", "max");
    return {
      data: result,
      message: "New Tender Has Been Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error: ", error);

    return {
      data: error,
      message: "Error In Adding Tender",
      status: 500,
    };
  }
};

//Get all tenders
export const getAllTenders = unstable_cache(
  async () => {
    try {
      const result = await prisma.tender.findMany({
        orderBy: { created_at: "desc" },
      });
      return {
        data: result,
        message: "All Tenders",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error In Getting All Tenders",
        status: 500,
      };
    }
  },
  ["all-tender"],
  {
    tags: ["tenders"],
  },
);

// Get tender by id (cached wrapper)

export const getTenderById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.tender.findUnique({ where: { id } });
        if (!result)
          return { data: null, message: "Tender not found", status: 409 };
        return {
          data: result,
          message: "Tender fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching tender", status: 500 };
      }
    },
    [`tender-by-id-${id}`],
    { tags: ["tenders"] },
  );

  return cachedFn();
};

// Get tender by slug (cached)
export const GetTenderBySlug = (slug: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.tender.findUnique({ where: { slug } });
        if (!result)
          return { data: null, message: "Tender not found", status: 409 };
        return {
          data: result,
          message: "Tender fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching tender", status: 500 };
      }
    },
    [`tender-by-slug-${slug}`],
    { tags: ["tenders"] },
  );

  return cachedFn();
};

// Edit / update tender
export const editTender = async (id: string, data: TenderUpdateInput) => {
  try {
    const existing = await prisma.tender.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Tender Not Found",
        status: 409,
      };

    if (
      data.pdf_file &&
      existing.pdf_file &&
      data.pdf_file !== existing.pdf_file
    ) {
      const pdfKey = existing.pdf_file.split("/f/")[1];
      if (pdfKey) {
        try {
          await utapi.deleteFiles(pdfKey);
        } catch (err) {
          console.error("UTApi deleteFiles error:", err);
        }
      }
    }

    const result = await prisma.tender.update({ where: { id }, data });
    revalidateTag("tenders", "max");
    return {
      data: result,
      message: "Tender Has Been Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating Tender",
      status: 500,
    };
  }
};

// Delete tender
export const deleteTender = async (id: string) => {
  try {
    const existing = await prisma.tender.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Tender Not Found",
        status: 409,
      };

    const result = await prisma.tender.delete({ where: { id } });

    const pdfKey = existing.pdf_file?.split("/f/")[1];
    if (pdfKey) {
      try {
        await utapi.deleteFiles(pdfKey);
      } catch (err) {
        console.error("UTApi deleteFiles error:", err);
      }
    }

    revalidateTag("tenders", "max");
    return {
      data: result,
      message: "Tender Has Been Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting Tender",
      status: 500,
    };
  }
};

const today = new Date();

const startOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
);

const endOfToday = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1,
);

// Get all tenders translated by locale
export const getAllTendersByLocale = (locale: string) =>
  unstable_cache(
    async () => {
      try {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const result = await prisma.tender.findMany({
          where: { closing_date: { gte: startOfToday} },
          orderBy: { created_at: "desc" },
        });

        if (!result) return { data: [], status: 200 };

        const translated = result.map((t) => ({
          id: t.id,
          name: locale === "en" ? t.name_en : t.name_ar,
          description: locale === "en" ? t.description_en : t.description_ar,
          slug: t.slug,
          pdf_file: t.pdf_file,
          created_at: t.created_at,
          opening_date: t.opening_date,
          closing_date: t.closing_date,
        }));

        return {
          data: translated,
          message: `Tenders fetched successfully in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.error("Database Error:", error);
        return {
          data: [],
          message: "Error In Getting Tenders",
          status: 500,
        };
      }
    },
    [`tenders-${locale}`, new Date().toISOString().slice(0, 10)],
    { tags: ["tenders"] },
  )();

// Get tender by id translated by locale
export const getTenderByIdByLocale = (id: string, locale: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const t = await prisma.tender.findUnique({ where: { id } });
        if (!t) return { data: null, message: "Tender not found", status: 409 };

        const translated = {
          id: t.id,
          name: locale === "en" ? t.name_en : t.name_ar,
          description: locale === "en" ? t.description_en : t.description_ar,
          slug: t.slug,
          pdf_file: t.pdf_file,
          created_at: t.created_at,
          opening_date: t.opening_date,
          closing_date: t.closing_date,
        };

        return {
          data: translated,
          message: `Tender fetched successfully in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.error("Database Error:", error);
        return { data: null, message: "Error fetching tender", status: 500 };
      }
    },
    [`tenders-${id}-${locale}`],
    { tags: ["tenders"] },
  );

  return cachedFn();
};
