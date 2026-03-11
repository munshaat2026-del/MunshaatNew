"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { type TenderGetPayload } from "@/types";

export const TenderColumns: ColumnDef<TenderGetPayload>[] = [
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
  // Opening Date
  // =====================
  {
    accessorKey: "opening_date",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        Opening Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("opening_date") as Date | null;

      return (
        <span>
          {date ? new Date(date).toLocaleDateString() : "—"}
        </span>
      );
    },
    enableSorting: true,
  },

  // =====================
  // Closing Date
  // =====================
  {
    accessorKey: "closing_date",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        Closing Date
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("closing_date") as Date;

      return (
        <span className="font-medium">
          {new Date(date).toLocaleDateString()}
        </span>
      );
    },
    enableSorting: true,
  },


  // =====================
  // Created At
  // =====================
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | null;

      return (
        <span>
          {date ? new Date(date).toLocaleDateString() : "—"}
        </span>
      );
    },
    meta: { hiddenByDefault: true },
  },
];