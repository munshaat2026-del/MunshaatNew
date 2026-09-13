"use server";

import { type SubmitParkingRequestData } from "@/types/index";
import { addParkingRequest } from "@/app/server/parkingsRequests/services";
import { sendParkingRequestConfirmationEmail } from "./sendEmailAfterSubmission";
import { revalidatePath } from "next/cache";

export const submitParkingRequestAction = async (
  data: SubmitParkingRequestData,
) => {
  try {
    const result = await addParkingRequest(data);

    if (result.status === 201) {
      if (data.email) {
        await sendParkingRequestConfirmationEmail(data.email);
      }

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
    console.error("Error In Submitting Your Parking Request:", error);

    return {
      success: false,
      message: "Error In Submitting Your Parking Request",
      status: 500,
    };
  }
};
