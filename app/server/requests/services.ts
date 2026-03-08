import prisma from "@/lib/prisma";
import { Prisma } from "@/app/generated/prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";

type RequestCreateInput = Prisma.requestsCreateInput;

// Submit New Request
export const addRequest = async (data: RequestCreateInput) => {
  try {
    const RequestCreateInput = await prisma.requests.create({
      data: {
        ...data,
        name: data.name.trim().toLocaleLowerCase(),
        email: data.email?.trim().toLocaleLowerCase(),
        phone_number: data.phone_number.trim(),
      },
    });
    revalidateTag("requests", "max");
    return {
      status: 201,
      message: "Request created successfully",
      data: RequestCreateInput,
    };
  } catch (error) {
    console.error("Error In Add Request error:", error);
    return {
      status: 500,
      message: "Failed to create request",
      data: null,
    };
  }
};

// Delete Request
export const deleteRequest = async (id: string) => {
  try {
    const request = await prisma.requests.delete({
      where: { id },
    });
    revalidateTag("requests", "max");
    return {
      status: 201,
      message: "Request deleted successfully",
      data: request,
    };
  } catch (error) {
    console.error("Delete Request error:", error);
    return {
      status: 500,
      message: "Failed to delete Request",
      data: null,
    };
  }
};

// Get All Requests
export const getAllRequests = unstable_cache(
  async () => {
    async () => {
      try {
        const result = await prisma.requests.findMany({
          include: {
            real_estates: true,
            parkings: true,
          },
          orderBy: {
            created_at: "desc",
          },
        });

        return {
          data: result,
          message: "All Requests",
          status: 200,
        };
      } catch (error) {
        console.error("Get all requests error:", error);
        return {
          data: null,
          message: "Error In Getting Requests",
          status: 500,
        };
      }
    };
  },
  ["all-requests"],
  { tags: ["requests"], revalidate: 3600 },
)();

// Get Request By Type
export const getRequestsByRequestType = async (
  requestType: "real_estates" | "parkings",
) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.requests.findMany({
          where: { request_type: requestType },
          include: {
            real_estates: true,
            parkings: true,
          },
          orderBy: {
            created_at: "desc",
          },
        });

        return {
          data: result,
          status: 200,
          message: `All Requests By This Type: ${requestType}`,
        };
      } catch (error) {
        console.error("Get Requests by type error:", error);
        return {
          data: null,
          status: 500,
          message: `Error In Getting All Requests By This Type: ${requestType}`,
        };
      }
    },
    [`requests-by-type-${requestType}`],
    { tags: ["requests"], revalidate: 3600 },
  )();

// Get Request By ID
export const getRequestById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const requestType = await prisma.requests.findUnique({
          where: { id },
          select: {
            id: true,
            request_type: true,
          },
        });

        if(!requestType) return {
            data: null,
            status: 409,
            message: `No Request Found`,
          };

        if (requestType?.request_type === "parkings") {
          const result = await prisma.requests.findUnique({
            where: { id },
            include: {
              parkings: true,
            },
          });
          return {
            data: result,
            status: 200,
            message: `Parking => Request By This ID: ${id}`,
          };
        } else {
          const result = await prisma.requests.findUnique({
            where: { id },
            include: {
              real_estates: true,
            },
          });
          return {
            data: result,
            status: 200,
            message: `Real Estate => Request By This ID: ${id}`,
          };
        }
      } catch (error) {
        console.error("Get Request by id error:", error);
        return {
          data: null,
          status: 500,
          message: `Error In Gtting The Request By This ID: ${id}`,
        };
      }
    },
    [`request-by-id-${id}`],
    { tags: ["requests"], revalidate: 3600 },
  )();

export const getRequestsCountByType = async (
  requestType: "real_estates" | "parkings",
) => {
  try {
    const result = await prisma.requests.count({
      where: { request_type: requestType },
    });
    return {
      data: result,
      message: `Number Of Requests On ${requestType}`,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: `Error In Getting The Number Of Requests On ${requestType}`,
      status: 500,
    };
  }
};

type RequestFilters = {
  requestId?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  name: string | null;
  realEstateId?: string | null;
  parkingId?: string | null;
};

const DEFAULT_PAGE_SIZE = 10;

type RequestsWhereInput = NonNullable<
  Parameters<typeof prisma.requests.findMany>[0]
>["where"];

export const getAllrequestsByFilters = (
  pageNumber = 1,
  filters?: RequestFilters,
  pageSize = DEFAULT_PAGE_SIZE,
) =>
  unstable_cache(
    async () => {
      const page = Math.max(1, Number(pageNumber) || 1);
      const skip = (page - 1) * pageSize;

      const where: RequestsWhereInput = {};
      if (filters?.realEstateId) {
        where.real_estate_id = filters.realEstateId;
      }

      if (filters?.parkingId) {
        where.parking_id = filters.parkingId;
      }
      if (filters?.email) {
        where.email = filters.email;
      }

      if (filters?.name) {
        where.name = filters.name;
      }

      if (filters?.requestId) {
        where.id = filters.requestId;
      }

      if (filters?.phoneNumber) {
        where.phone_number = {
          contains: filters.phoneNumber,
          mode: "insensitive",
        };
      }
      try {
        const [data, total] = await Promise.all([
          prisma.requests.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { created_at: "desc" },
            include: {
              real_estates: { select: { name_en: true } },
              parkings: { select: { name_en: true } },
            },
          }),
          prisma.requests.count({ where }),
        ]);
        return {
          data,
          total,
          totalPages: Math.ceil(total / pageSize),
          message: "Request fetched",
          status: 200,
        };
      } catch (error) {
        console.error("getAllRequest error:", error);
        return {
          data: [],
          total: 0,
          totalPages: 0,
          message: "Error fetching request",
          status: 500,
        };
      }
    },
    [
      `requests-page-${pageNumber}-ps-${pageSize}-f-${JSON.stringify(
        filters ?? {},
      )}`,
    ],
    { tags: ["requests"], revalidate: 60 },
  )();
