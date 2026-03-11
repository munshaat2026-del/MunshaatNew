"use server";

import { authOptions } from "@/app/auth/authoptions";
import { newComingSoon } from "@/app/server/coming_soon/services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import type {ComingSoonCreateInput} from "@/types/index"

export const addComingSoonAction = async (data:  ComingSoonCreateInput) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session)
      return {
        success: false,
        status: 401,
        message: "Please login",
      };

    if (session.user.role !== "admin")
      return {
        success: false,
        status: 403,
        message: "You are not allowed to perfor this action",
      };

    const result = await newComingSoon(data);
    if (result.status === 201){
       revalidatePath("/admin/dashboard/coming-soon")
      return {
        success: true,
        status: result.status,
        message: result.message,
      };
    }
    
    return {
      success: false,
      status: result.status,
      message: result.message,
    };
  } catch (error) {
    console.log("error: ",error);
    
    return {
      success: false,
      status: 500,
      message: "Error in adding the coming soon",
    };
  }
};
