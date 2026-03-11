"use client";
import { useState } from "react";
import { Button } from "./ui/button";

interface ExportButtonProps {
  realEstateId?: string|null;
  parkingId?: string|null;
  name?: string | null;
  requestId?: string | null;
  email:string|null;
  phoneNumber:string|null;
  excelFileName?:string;
  
  className?: string;
  
}

export default function ExportButton({
  realEstateId,
  name,
  requestId,
  email,phoneNumber,
  parkingId,
 excelFileName,
  className = "",
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);
   console.log("parkingId: ",parkingId);
   console.log("realEstateId: ",realEstateId);
   
  const handleExport = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (realEstateId) params.set("realEstateId", realEstateId);
      if (name) params.set("name", name);
      if (requestId) params.set("requestId", requestId);
      if (phoneNumber) params.set("phoneNumber", phoneNumber);
      if (email) params.set("email", email);
      if (parkingId) params.set("parkingId", parkingId);

      const url = realEstateId? `/api/requests/export?${params.toString()}`: `/api/requests/exportParkingRequests?${params.toString()}`

      const res = await fetch(url, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;

      // set a filename
      const fileName = `Requests on ${excelFileName ?? "all"}.xlsx`
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Export error", err);
      alert("Export failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={loading}
      className={`px-4 py-2 rounded-md bg-[white] text-[#397a34] hover:bg-gray-100 font-semibold shadow ${className}`}
      type="button"
    >
      {loading ? "Preparing..." : "Export to Excel"}
    </Button>
  );
}
