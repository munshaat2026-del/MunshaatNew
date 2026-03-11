"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { type ComingSoonGetPayload } from "@/types";

export const ComingSoonColumns: ColumnDef<ComingSoonGetPayload>[] = [
  // =====================
  // Select column
  // =====================
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // =====================
  // Title EN
  // =====================
  {
    accessorKey: "title_en",
    header: "Title (EN)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title_en")}</div>
    ),
  },

  // =====================
  // Title AR
  // =====================
  {
    accessorKey: "title_ar",
    header: "Title (AR)",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title_ar")}</div>
    ),
    meta: { hiddenByDefault: true },
  },

 // =====================
// Description EN
// =====================
{
  accessorKey: "description_en",
  header: "Description (EN)",
  cell: ({ row }) => {
    const desc = row.original.description_en;
    return (
      <div className="truncate max-w-xs">
        {desc.length > 35 ? desc.slice(0, 35) + "..." : desc}
      </div>
    );
  },
},

// =====================
// Description AR
// =====================
{
  accessorKey: "description_ar",
  header: "Description (AR)",
  cell: ({ row }) => {
    const desc = row.original.description_ar;
    return (
      <div className="truncate max-w-xs">
        {desc.length > 35 ? desc.slice(0, 35) + "..." : desc}
      </div>
    );
  },
  meta: { hiddenByDefault: true },
},
  // =====================
  // Estimated Date
  // =====================
  {
    accessorKey: "estimated_date",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Estimated Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("estimated_date") as Date | null;
      return <span>{date ? new Date(date).toLocaleDateString() : "—"}</span>;
    },
    enableSorting: true,
  },
];