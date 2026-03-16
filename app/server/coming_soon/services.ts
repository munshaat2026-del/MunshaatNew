import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import { ComingSoonCreateInput, ComingSoonUpdateInput } from "@/types";
import { UTApi } from "uploadthing/server";
import { count } from "console";
const utapi = new UTApi();
// Create new coming soon item
export const newComingSoon = async (data: ComingSoonCreateInput) => {
  try {
    // Check if a Coming Soon already exists
    const existing = await prisma.coming_soon.count();

    if (existing > 0) {
      return {
        data: null,
        message: "A Coming Soon event already exists. You can only have one.",
        status: 500,
      };
    }

    const result = await prisma.coming_soon.create({
      data,
    });

    revalidateTag("coming-soon", "max");

    return {
      data: result,
      message: "New Coming Soon Item Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error:", error);

    return {
      data: null,
      message: "Error Adding Coming Soon Item",
      status: 500,
    };
  }
};

// Get all coming soon items
export const getAllComingSoon = unstable_cache(
  async () => {
    try {
      const result = await prisma.coming_soon.findMany({});

      return {
        data: result,
        message: "All Coming Soon Items",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error Getting Coming Soon Items",
        status: 500,
      };
    }
  },
  ["all-coming-soon"],
  {
    tags: ["coming-soon"],
  },
);

// Get coming soon by id
export const getComingSoonById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.coming_soon.findUnique({
          where: { id },
        });

        if (!result)
          return {
            data: null,
            message: "Coming Soon Item Not Found",
            status: 409,
          };

        return {
          data: result,
          message: "Coming Soon Item fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching Coming Soon Item",
          status: 500,
        };
      }
    },
    [`coming-soon-${id}`],
    { tags: ["coming-soon"] },
  );

  return cachedFn();
};

// Update coming soon item
export const editComingSoon = async (
  id: string,
  data: ComingSoonUpdateInput,
) => {
  try {
    const existing = await prisma.coming_soon.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "Coming Soon Item Not Found",
        status: 409,
      };

    const result = await prisma.coming_soon.update({
      where: { id },
      data,
    });
    if (data.image && existing.image && data.image !== existing.image) {
      const imageKey = existing.image.split("/f/")[1];
      if (imageKey) {
        try {
          await utapi.deleteFiles(imageKey);
        } catch (err) {
          console.error("UTApi deleteFiles error:", err);
        }
      }
    }
    revalidateTag("coming-soon", "max");

    return {
      data: result,
      message: "Coming Soon Item Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error Updating Coming Soon Item",
      status: 500,
    };
  }
};

// Delete coming soon item
export const deleteComingSoon = async (id: string) => {
  try {
    const existing = await prisma.coming_soon.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "Coming Soon Item Not Found",
        status: 409,
      };
    const result = await prisma.coming_soon.delete({
      where: { id },
    });
    const imageKey = existing.image.split("/f/")[1];
    if (imageKey) {
      try {
        await utapi.deleteFiles(imageKey);
      } catch (err) {
        console.error("UTApi deleteFiles error:", err);
      }
    }
    revalidateTag("coming-soon", "max");
    return {
      data: result,
      message: "Coming Soon Item Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error Deleting Coming Soon Item",
      status: 500,
    };
  }
};

// Get all coming soon items translated by locale
export const getAllComingSoonByLocale = (locale: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.coming_soon.findMany({
          orderBy: { created_at: "desc" },
        });

        if (result.length === 0)
          return {
            data: null,
            message: "No Coming Soon Items Found",
            status: 409,
          };
        const translated = result.map((item) => ({
          id: item.id,
          title: locale === "en" ? item.title_en : item.title_ar,
          description:
            locale === "en" ? item.description_en : item.description_ar,
          image: item.image,
          estimated_date: item.estimated_date,
          completion_rate: item.completion_rate,
        }));

        return {
          data: translated,
          message: `Coming Soon items fetched in ${locale}`,
          status: 200,
        };
      } catch (error) {
        console.log("error: ", error);

        return {
          data: null,
          message: "Error Getting Coming Soon Items",
          status: 500,
        };
      }
    },
    [`coming-soon-${locale}`],
    {
      tags: ["coming-soon"],
      revalidate: 3600,
    },
  )();

// Get coming soon by id translated by locale
export const getComingSoonByIdByLocale = (id: string, locale: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const item = await prisma.coming_soon.findUnique({
          where: { id },
        });

        if (!item)
          return {
            data: null,
            message: "Coming Soon Item Not Found",
            status: 409,
          };

        const translated = {
          id: item.id,
          name: locale === "en" ? item.title_en : item.title_ar,
          description:
            locale === "en" ? item.description_en : item.description_ar,
          image: item.image,
          estimated_date: item.estimated_date,
          completion_rate: item.completion_rate,
        };

        return {
          data: translated,
          message: `Coming Soon Item fetched in ${locale}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error Fetching Coming Soon Item",
          status: 500,
        };
      }
    },
    [`coming-soon-${id}-${locale}`],
    {
      tags: ["coming-soon"],
      revalidate: 3600,
    },
  );

  return cachedFn();
};


export const getComingSoonCount = () => 
   unstable_cache(
    async () => {
      try {
        const itemCount = await prisma.coming_soon.count({});
        return {
          data: itemCount,
          message: `Number Of Coming Soon Items`,
          status: 200,
        };
      } catch (error) {
        return {
          data: 0,
          message: "Error Fetching Number Of Coming Soon Items",
          status: 500,
        };
      }
    },
    [`coming-soon-count`],
    {
      tags: ["coming-soon"],
      revalidate: 3600,
    },
  )();

