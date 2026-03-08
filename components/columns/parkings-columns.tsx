"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import type { ParkingsGetPayload } from "@/types"; // adjust path

export const ParkingColumns: ColumnDef<ParkingsGetPayload>[] = [
  // =====================
  // Select column
  // =====================
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // =====================
  // Name EN
  // =====================
  {
    accessorKey: "name_en",
    header: "Name (EN)",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("name_en")}
      </div>
    ),
  },

  // =====================
  // Name AR
  // =====================
  {
    accessorKey: "name_ar",
    header: "Name (AR)",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("name_ar")}
      </div>
    ),
    meta: { hiddenByDefault: true },
  },

  // =====================
  // Address EN
  // =====================
  {
    accessorKey: "address_en",
    header: "Address (EN)",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.getValue("address_en")}
      </div>
    ),
  },

  // =====================
  // Total Spots
  // =====================
  {
    accessorKey: "total_spots",
    header: "Total Spots",
    cell: ({ row }) => {
      const spots = row.getValue("total_spots") as number | null;
      return <span>{spots ?? "—"}</span>;
    },
  },

  // =====================
  // Monthly Price
  // =====================
  {
    accessorKey: "price_monthly",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        Monthly Price
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price_monthly") as number | null;
      return (
        <span className="font-medium">
          {price ? `${price.toLocaleString()} / month` : "—"}
        </span>
      );
    },
    enableSorting: true,
  },

  // =====================
  // Yearly Price
  // =====================
  {
    accessorKey: "price_yearly",
    header: "Yearly Price",
    cell: ({ row }) => {
      const price = row.getValue("price_yearly") as number | null;
      return (
        <span className="font-medium">
          {price ? `${price.toLocaleString()} / year` : "—"}
        </span>
      );
    },
  },

 


];