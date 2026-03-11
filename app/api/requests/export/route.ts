import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { getAllrequestsByFilters } from "@/app/server/requests/services";
import { type RequestsGetPayload } from "@/types/index";
import { getAllParkingrequestsByFilters } from "@/app/server/parkingsRequests/services";

type Filters = {
  realEstateId?: string | null;
  name?: string | null;
  email: string | null;
  phoneNumber: string | null;
  requestId?: string | null;
};

function formatHumanDateTime(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";

  try {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Amman",
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const filters: Filters = {
      realEstateId: params.get("realEstateId") ?? null,
      name: params.get("name") ?? null,
      phoneNumber: params.get("phoneNumber"),
      requestId: params.get("requestIdId") ?? null,
      email: params.get("email") ?? null,
    };

    const allRows: RequestsGetPayload[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res =  await getAllrequestsByFilters(page, {
        requestId: filters.requestId ?? null,
        name: filters.name ?? null,
        phoneNumber: filters.phoneNumber,
        email: filters.email ?? null,
        realEstateId:filters.realEstateId??null
      })

      const data = res.data ?? [];
      totalPages = res.totalPages ?? 1;
      allRows.push(...data );
      page++;
    } while (page <= totalPages);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Requests");

    sheet.columns = filters.realEstateId?[
      { header: "Request ID", key: "requestId", width: 40 },
      { header: "Name", key: "firstName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Plan", key: "plan", width: 20 },
      { header: "Real Estate Name", key: "realEstate", width: 30 },
      { header: "Submitted At", key: "createdAt", width: 25 },
    ] : [
      { header: "Request ID", key: "requestId", width: 40 },
      { header: "Name", key: "firstName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Plan", key: "plan", width: 20 },
      { header: "Parking Name", key: "parking", width: 30 },
      { header: "Submitted At", key: "createdAt", width: 25 },
    ]
    for (const app of allRows) {
      sheet.addRow({
        requestId: app.id ?? "",
        firstName: app?.name ?? "",
        email: app?.email ?? "",
        phone: app.phone_number ?? "",
        plan: app.plan ?? "",
        createdAt: formatHumanDateTime(app.created_at),
        realEstate: app.real_estates?.name_en,
        
       
        
      });
    }

    sheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    const bufferNode = Buffer.from(buffer as ArrayBuffer);

    const safeProgram = (filters.realEstateId ?? "all").replace(
      /[^a-z0-9-_]/gi,
      "_",
    );
    const fileName = `Requests-${safeProgram}.xlsx`;

    return new Response(bufferNode, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    console.error("Export to Excel failed:", {
      message: err?.message ?? err,
      stack: err?.stack ?? null,
    });

    const body = {
      error: "ExportToExcelFailed",
      message: err?.message ?? "Unknown error during Excel export",
    };
    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
