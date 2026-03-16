import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";
import {type ParkingRequestsCreateInput} from "@/types/index"

// Submit New Request
export const addParkingRequest = async (data: ParkingRequestsCreateInput) => {
  try {
    const RequestCreateInput = await prisma.parkings_requests.create({
      data: {
        ...data,
        name: data.name.trim().toLocaleLowerCase(),
        email: data.email?.trim().toLocaleLowerCase(),
        phone_number: data.phone_number.trim(),
      },
    });
    revalidateTag("parkings-requests", "max");
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
export const deleteParkingRequest = async (id: string) => {
  try {
    const request = await prisma.parkings_requests.delete({
      where: { id },
    });
    revalidateTag("parkings-requests", "max");
    return {
      status: 201,
      message: "parkings requests deleted successfully",
      data: request,
    };
  } catch (error) {
    console.error("Delete Parking Request error:", error);
    return {
      status: 500,
      message: "Failed to delete Request",
      data: null,
    };
  }
};

// Get All Requests
export const getAllParkingRequests = unstable_cache(
  async () => {
    async () => {
      try {
        const result = await prisma.parkings_requests.findMany({
          include: {
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
  ["all-parkings-requests"],
  { tags: ["parkings-requests"], revalidate: 3600 },
)();


// Get Request By ID
export const getParkingRequestById = async (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.parkings_requests.findUnique({
          where: { id },
         select:{
            parking_id:true,
            name:true,
            phone_number:true,
            plan:true,
            parkings:true,
            email:true,
            created_at:true,
            identity_image:true,
            license_image:true, id:true
            
         }
        });
        return {
          data: result,
          status: 200,
          message: `Parking Request By This ID: ${id}`,
        };
      } catch (error) {
        console.error("Get Parking Request by id error:", error);
        return {
          data: null,
          status: 500,
          message: `Error In Gtting The Parking Request By This ID: ${id}`,
        };
      }
    },
    [`parkings-request-by-id-${id}`],
    { tags: ["parkings-requests"], revalidate: 3600 },
  )();

export const getParkingRequestsCount = async (
) => {
  try {
    const result = await prisma.parkings_requests.count({});
    return {
      data: result,
      message: `Number Of parkings requests`,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: `Error In Getting The Number Of Parkings Requests`,
      status: 500,
    };
  }
};

type RequestFilters = {
  requestId?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  name: string | null;
  parkingId?: string | null;
};

const DEFAULT_PAGE_SIZE = 10;

type RequestsWhereInput = NonNullable<
  Parameters<typeof prisma.parkings_requests.findMany>[0]
>["where"];

export const getAllParkingrequestsByFilters = (
  pageNumber = 1,
  filters?: RequestFilters,
  pageSize = DEFAULT_PAGE_SIZE,
) =>
  unstable_cache(
    async () => {
      const page = Math.max(1, Number(pageNumber) || 1);
      const skip = (page - 1) * pageSize;

      const where: RequestsWhereInput = {};
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
          prisma.parkings_requests.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { created_at: "desc" },
            include: {
              parkings: { select: { name_en: true,id:true } },
            },
          }),
          prisma.parkings_requests.count({ where }),
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
      `parkings-requests-page-${pageNumber}-ps-${pageSize}-f-${JSON.stringify(
        filters ?? {},
      )}`,
    ],
    { tags: ["parkings-requests"], revalidate: 60 },
  )();
