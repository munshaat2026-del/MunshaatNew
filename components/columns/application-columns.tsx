"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ApplicationGetPayload } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";

export const ApplicationColumns: ColumnDef<ApplicationGetPayload>[] = [
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
  // Full Name
  // =====================
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Full Name
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("full_name") as string;
      return <div className="font-medium text-gray-800">{name}</div>;
    },
    enableSorting: true,
  },

  // =====================
  // Email
  // =====================
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.email}</div>,
    enableSorting: false,
  },

  // =====================
  // Phone Number
  // =====================
  {
    accessorKey: "phone_number",
    header: "Phone Number",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.phone_number}</div>,
    enableSorting: false,
  },

  // =====================
  // Date of Birth
  // =====================
  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) =>
      row.original.date_of_birth
        ? new Date(row.original.date_of_birth).toLocaleDateString()
        : "—",
    enableSorting: true,
  },

  // =====================
  // City
  // =====================
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.city}</div>,
    enableSorting: false,
  },

  // =====================
  // Marital Status
  // =====================
  {
    accessorKey: "marital_status",
    header: "Marital Status",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.marital_status}</div>,
    enableSorting: false,
    meta:{hiddenByDefault:true}
  },

  // =====================
  // Major
  // =====================
  {
    accessorKey: "major",
    header: "Major",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.major}</div>,
    enableSorting: false,
  },

  // =====================
  // Address
  // =====================
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.address}</div>,
    enableSorting: false,
    meta: { hiddenByDefault: true },
  },

  // =====================
  // National Number
  // =====================
  {
    accessorKey: "national_number",
    header: "National Number",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.national_number}</div>,
    enableSorting: false,
    meta: { hiddenByDefault: true },
  },

  // =====================
  // Nationality
  // =====================
  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.nationality}</div>,
    enableSorting: false,
    meta:{hiddenByDefault:true}
  },

  // =====================
  // Place of Birth
  // =====================
  {
    accessorKey: "place_of_birth",
    header: "Place of Birth",
    cell: ({ row }) => <div className="text-sm text-gray-700">{row.original.place_of_birth}</div>,
    enableSorting: false,
    meta:{hiddenByDefault:true}
  },

  // =====================
  // Applied At
  // =====================
  {
    accessorKey: "applied_at",
    header: "Applied At",
    cell: ({ row }) =>
      row.original.applied_at
        ? new Date(row.original.applied_at).toLocaleDateString()
        : "—",
    enableSorting: true,
  },

  // =====================
  // CV
  // =====================
  {
    accessorKey: "cv",
    header: "CV",
    cell: ({ row }) => (
      <a
        href={row.original.cv}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline"
      >
        View CV
      </a>
    ),
    enableSorting: false,
  },

  // =====================
  // Is Shown
  // =====================
  {
    accessorKey: "is_shown",
    header: "Shown",
    cell: ({ row }) => <div>{row.original.is_shown ? "Yes" : "No"}</div>,
    enableSorting: false,
  },
];