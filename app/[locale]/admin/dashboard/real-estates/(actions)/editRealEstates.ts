"use server";

import { authOptions } from "@/app/auth/authoptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { editRealEstate } from "@/app/server/real_estates/services";
import type {RealEstateUpdateInput} from "@/types/index"

export const updateRealEstatesAction = async (
 id: string,
  data:RealEstateUpdateInput,
   
   updatedImages:{id:string,image_url:string}[] |null
) => {
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
        message: "Your not allowed to perform this action",
      };

    const result = await editRealEstate(id, data,updatedImages);
    if (result.status === 201) {
      revalidatePath("/admin/dashboard/real-estates");
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
      message: "Error in updating real estates",
    };
  }
};
