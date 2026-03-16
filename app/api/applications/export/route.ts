import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { getAllApplicationsByFilters } from "@/app/server/applications/services";
import {ApplicationGetPayloadWithCareer} from "@/types/index"

type Filters = {
  careerId?: string | null;
  city?: string | null;
  minAge?: number | null;
  maxAge?: number | null;
  applicationId?: string | null;
};



function formatDateOnly(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // YYYY-MM-DD
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

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
    // Fallback
    return d.toLocaleString();
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const filters: Filters = {
      careerId: params.get("careerId") ?? undefined,
      city: params.get("city") ?? undefined,
      minAge: params.get("minAge") ? Number(params.get("minAge")) : undefined,
      maxAge: params.get("maxAge") ? Number(params.get("maxAge")) : undefined,
      applicationId: params.get("applicationId") ?? undefined,
    };

    // collect all pages
    const allRows: ApplicationGetPayloadWithCareer[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await getAllApplicationsByFilters(page, {
        careerId: filters.careerId ?? null,
        city: filters.city ?? null,
        minAge: filters.minAge ?? null,
        maxAge: filters.maxAge ?? null,
        applicationId: filters.applicationId ?? null,
      });

      const data = res.data ?? [];
      totalPages = res.totalPages ?? 1;
      allRows.push(...data);
      page++;
    } while (page <= totalPages);

    // build workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Applications");

    // define columns (customize fields to match your application object)
    sheet.columns = [
      { header: "Application ID", key: "applicationId", width: 40 },
      { header: "Full Name", key: "fullName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Address", key: "address", width: 20 },
      { header: "City", key: "city", width: 20 },
      { header: "Career Name", key: "careerName", width: 30 },
      { header: "Submitted At", key: "createdAt", width: 25 },
      { header: "Major", key: "major", width: 20 },
      { header: "Marital Status", key: "marital_status", width: 20 },
      { header: "Date Of Birth", key: "dateOfBirth", width: 15 },
      { header: "National Number", key: "national_number", width: 15 },
       { header: "Nationality", key: "nationality", width: 15 },
        { header: "Place Of Birth", key: "place_of_birth", width: 15 },
         { header: "CV", key: "cv", width: 20 },
    ];

    // normalize each application into the columns above
    for (const app of allRows) {
      sheet.addRow({
        applicationId: app.id ?? "",
        fullName: app?.full_name ?? "",
        email: app?.email ?? "",
        phone: app.phone_number ?? "",
        address: app.address ?? "",
        city: app.city ?? "",
        careerName: app.careers?.position_en ?? "",
        marital_status: app.marital_status ?? "",
        major: app.major ?? "",
        dateOfBirth: formatDateOnly(app.date_of_birth),
        createdAt: formatHumanDateTime(app.applied_at),
        national_number: app.national_number ?? "",
        nationality: app.nationality ?? "",
        place_of_birth: app.place_of_birth ?? "",
        cv: app.cv ??"",

      });
    }

    // optional: make header bold
    sheet.getRow(1).font = { bold: true };

    // generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const bufferNode = Buffer.from(buffer as ArrayBuffer);

    const safeProgram = (filters.careerId ?? "all").replace(/[^a-z0-9-_]/gi, "_");
    const fileName = `applications-${safeProgram}.xlsx`;

    return new Response(bufferNode, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    // better console logging for debugging
    console.error("Export to Excel failed:", {
      message: err?.message ?? err,
      stack: err?.stack ?? null,
    });

    // return JSON with helpful error message (useful for frontend)
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
