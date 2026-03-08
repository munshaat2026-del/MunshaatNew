"use server";

import { authOptions } from "@/app/auth/authoptions";
import { addNewRealEstates } from "@/app/server/real_estates/services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import type {RealEstateCreateInput} from "@/types/index"

export const addRealEstatesAction = async (data:  RealEstateCreateInput,images:{image_url:string}[]) => {
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

    const result = await addNewRealEstates(data,images);
    if (result.status === 201){
       revalidatePath("/admin/dashboard/real-estates")
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
    return {
      success: false,
      status: 500,
      message: "Error in adding the real estates",
    };
  }
};
