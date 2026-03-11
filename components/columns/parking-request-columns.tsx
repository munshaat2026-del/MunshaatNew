"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ParkingRequestsGetPayload } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown} from "lucide-react";

export const ParkingsRequestColumns: ColumnDef<ParkingRequestsGetPayload>[] = [
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
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),

    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <span className="font-medium text-gray-800">
            {row.original.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Phone Number
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.phone_number}</div>
    ),
    meta: { hiddenByDefault: true },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Email
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "plan",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1"
      >
        Plan
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-700">{row.original.plan}</div>
    ),
    meta: { hiddenByDefault: true },
  },
 
];
