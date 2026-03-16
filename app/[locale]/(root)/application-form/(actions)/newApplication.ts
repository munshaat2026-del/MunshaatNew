"use server";
import { addNewApplication } from "@/app/server/applications/services";

import { ApplicationCreateInput } from "@/types";
import { revalidatePath } from "next/cache";

export const newApplicationAction = async (data: ApplicationCreateInput) => {
  try {
    const result = await addNewApplication(data);
     revalidatePath(`/admin/dashboard/applications`);
    return {
      success: true,
      message: "Application Submitted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Submitting The Application",
      status: 500,
    };
  }
};
