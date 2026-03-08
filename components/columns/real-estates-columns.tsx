"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import type {RealEstateWithImages} from "@/types/index"

export const RealEstatesColumns: ColumnDef<RealEstateWithImages>[] = [
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
  // Description EN
  // =====================
  {
    accessorKey: "description_en",
    header: ({ column }) => (
      <button
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
        className="flex items-center gap-1"
      >
        Description (EN)
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const text = row.getValue("description_en") as string;
      return (
        <div className="text-gray-800 font-medium">
          {text?.slice(0, 40)}...
        </div>
      );
    },
    enableSorting: true,
  },

  // =====================
  // Type
  // =====================
  {
    accessorKey: "real_estates_type",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize font-medium">
        {row.getValue("real_estates_type") ?? "—"}
      </span>
    ),
  },

  // =====================
  // Price
  // =====================
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number | null;
      const period = row.original.price_period;

      if (!price) return "—";

      return (
        <span className="font-medium">
          {price.toLocaleString()} {period ? `/ ${period}` : ""}
        </span>
      );
    },
  },

  // =====================
  // Size
  // =====================
  {
    accessorKey: "size_sqm",
    header: "Size (sqm)",
    cell: ({ row }) => (
      <span className="font-medium">
        {row.getValue("size_sqm")}
      </span>
    ),
  },

  // =====================
  // Availability
  // =====================
  {
    accessorKey: "is_available",
    header: "Available",
    cell: ({ row }) => (
      <span
        className={`font-medium ${
          row.getValue("is_available")
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {row.getValue("is_available") ? "Yes" : "No"}
      </span>
    ),
  },
  // =====================
  // Created At
  // =====================
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("created_at") as Date | string;
      return (
        <span className="text-sm text-gray-600">
          {date ? new Date(date).toLocaleDateString() : "—"}
        </span>
      );
    },
    meta:{hiddenByDefault:true}
  },
];