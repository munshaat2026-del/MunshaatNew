"use server";
import { type ParkingRequestsCreateInput } from "@/types/index";
import { addParkingRequest } from "@/app/server/parkingsRequests/services";
import { revalidatePath } from "next/cache";
export const submitParkingRequestAction = async (
  data: ParkingRequestsCreateInput,
) => {
  try {
    const result = await addParkingRequest(data);
    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/requests`);
      return {
        success: true,
        message: result.message,
        status: result.status,
      };
    }

    return {
      success: false,
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Submitting Your Parking Request",
      status: 500,
    };
  }
};
