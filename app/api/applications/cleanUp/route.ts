import { deleteAllExpiredApplications } from "@/app/server/applications/services";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const cleanSecret = process.env.CRON_SECRET;
   const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== cleanSecret) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const result = await deleteAllExpiredApplications();
    return NextResponse.json(result,{status:result.status});
  } catch (error) {
    return NextResponse.json({ message: "Error In Cron" }, { status: 500 });
  }
};
