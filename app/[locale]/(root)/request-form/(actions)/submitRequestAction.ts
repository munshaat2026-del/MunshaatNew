"use server";
import { type RequestsCreateInput } from "@/types/index";
import { addRequest } from "@/app/server/requests/services";
export const submitRequestAction = async (data: RequestsCreateInput) => {
  try {
    const result = await addRequest(data);
    if (result.status === 201)
      return {
        success: true,
        message: result.message,
        status: result.status,
      };

    return {
      success: false,
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Submitting Your Request",
      status: 500,
    };
  }
};
