import prisma from "@/lib/prisma";
import { type ApplicationCreateInput } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewApplication = async (data: ApplicationCreateInput) => {
  try {
    const result = await prisma.applications.create({ data });
    revalidateTag("applications", "max");
    return {
      data: result,
      message: "Your Application Was Submitted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Submitting Your Application",
      status: 500,
    };
  }
};

export const getAllApplications = unstable_cache(
  async () => {
    try {
      const result = await prisma.applications.findMany({});
      return { data: result, messsage: "All Applications", status: 200 };
    } catch (error) {
      return {
        data: error,
        messsage: "Error in getting All Applications",
        status: 500,
      };
    }
  },
  ["all-applications"],
  { tags: ["applications"], revalidate: 3600 },
);

export const getApplicationsByCareerId = (careerId: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.applications.findMany({
          where: { career_id: careerId },
          include: { careers: { select: { position_en: true } } },
        });
        return {
          data: result,
          messsage: `All Applications With This Career Id: ${careerId}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          messsage: `Error In Getting Applications With This Career Id: ${careerId}`,
          status: 500,
        };
      }
    },
    [`application-by-career-id-${careerId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

export const getApplicationsByApplicationId = (applicationId: string) =>
  unstable_cache(
    async (applicationId: string) => {
      try {
        const result = await prisma.applications.findMany({
          where: { id: applicationId },
        });
        return {
          data: result,
          messsage: `Application With This Id: ${applicationId}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          messsage: `Error In Getting Application  This Id: ${applicationId}`,
          status: 500,
        };
      }
    },
    [`application-by-application-id-${applicationId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  );

export const deleteApplication = async (id: string) => {
  try {
    const existing = await prisma.applications.findUnique({
      where: { id },
      select: { id: true, cv: true },
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };

    const result = await prisma.applications.delete({
      where: { id },
    });

    const fileKey = existing.cv.split("/f/")[1]; // upload thing requeried the the file key, so i can`t just send the full url to delete the file, i have to get the file key
    const deleteFile = await utapi.deleteFiles(fileKey);
    revalidateTag("applications", "max");
    return {
      data: result,
      message: `Application Deleted Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting The Application",
      status: 500,
    };
  }
};

export const getFilteredApplications = async (
  career_id: string,
  page: number,
) => {
  const limit = 10;
  const skip = limit * (page - 1);
  try {
    const numberOfApplications = await prisma.applications.count({
      where: { career_id },
    });
    const result = await prisma.applications.findMany({
      where: { career_id },
      skip,
      take: limit,
    });
    return {
      totalApplications: numberOfApplications,
      data: result,
      message: "Filtered Applications",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error in getting filtered applications",
      status: 500,
    };
  }
};

export const getApplicationById = async (id: string) => {
  try {
    const result = await prisma.applications.findUnique({
      where: { id },
      include: { careers: true },
    });
    if (!result)
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };
    return {
      data: result,
      message: `Application With This ID: ${id}`,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error In Getting The Application",
      status: 500,
    };
  }
};

export const markApplicationAsShown = async (id: string) => {
  try {
    const existing = await prisma.applications.findUnique({
      where: { id },
    });
    if (!existing) {
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };
    }
    const result = await prisma.applications.update({
      where: { id },
      data: { is_shown: true },
    });
    revalidateTag("applications", "max");
    return {
      data: result,
      message: `Application Marked As Shown Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Marking Application As Shown",
      status: 500,
    };
  }
};

type ApplicationFilters = {
  careerId?: string | null;
  city?: string | null;
  minAge?: number | null;
  maxAge?: number | null;
  applicationId?: string | null;
};

const DEFAULT_PAGE_SIZE = 10;

function birthdateBoundsFromAges(
  minAge?: number | null,
  maxAge?: number | null,
) {
  const today = new Date();
  if (minAge == null && maxAge == null) return null;

  const lower =
    maxAge != null
      ? new Date(
          today.getFullYear() - maxAge,
          today.getMonth(),
          today.getDate(),
        )
      : undefined;

  const upper =
    minAge != null
      ? new Date(
          today.getFullYear() - minAge,
          today.getMonth(),
          today.getDate(),
        )
      : undefined;

  return { lower, upper };
}

type ApplicationsWhereInput = NonNullable<
  Parameters<typeof prisma.applications.findMany>[0]
>["where"];

export const getAllApplicationsByFilters = (
  pageNumber = 1,
  filters?: ApplicationFilters,
  pageSize = DEFAULT_PAGE_SIZE,
) =>
  unstable_cache(
    async () => {
      const page = Math.max(1, Number(pageNumber) || 1);
      const skip = (page - 1) * pageSize;

      // Use the correct Prisma type
      const where: ApplicationsWhereInput = {};

      if (filters?.careerId) {
        where.career_id = filters.careerId;
      }

      if (filters?.applicationId) {
        where.id = filters.applicationId;
      }

      if (filters?.city) {
        where.city = { contains: filters.city, mode: "insensitive" };
      }

      const bounds = birthdateBoundsFromAges(filters?.minAge, filters?.maxAge);
      if (bounds) {
        const { lower, upper } = bounds;
        if (lower && upper) where.date_of_birth = { gte: lower, lte: upper };
        else if (lower) where.date_of_birth = { gte: lower };
        else if (upper) where.date_of_birth = { lte: upper };
      }

      try {
        const [data, total] = await Promise.all([
          prisma.applications.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { applied_at: "desc" },
            include: { careers: { select: { position_en: true,image:true } } },
          }),
          prisma.applications.count({ where }),
        ]);

        return {
          data,
          total,
          totalPages: Math.ceil(total / pageSize),
          message: "Applications fetched",
          status: 200,
        };
      } catch (error) {
        console.error("getAllApplications error:", error);
        return {
          data: null,
          total: 0,
          totalPages: 0,
          message: "Error fetching applications",
          status: 500,
        };
      }
    },
    [
      `applications-page-${pageNumber}-ps-${pageSize}-f-${JSON.stringify(
        filters ?? {},
      )}`,
    ],
    { tags: ["applications"], revalidate: 3600 },
  )();
