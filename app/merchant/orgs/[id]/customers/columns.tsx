"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types";
import Image from "next/image";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "client_id",
    header: "ID",
    cell: ({ row }) =>
      "#" + String(row.getValue("client_id")).slice(0, 6).toUpperCase(),
  },
  {
    accessorKey: "picture",
    header: "Pic",
    cell: ({ row }) => {
      const pic = row.getValue("picture") as string;
      const altname = row.getValue("name") as string;
      return (
        <Image
          className="rounded-full"
          style={{
            aspectRatio: "32/32",
            objectFit: "cover",
          }}
          alt={altname}
          src={pic}
          width={45}
          height={45}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },

  {
    accessorKey: "plan_name",
    header: "Plan Name",
    cell: ({ row }) => {
      return row.getValue("plan_name") || "No Plan";
    },
  },
  {
    accessorKey: "subscription_status",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("subscription_status") || "---";
    },
  },
  {
    accessorKey: "subscription_renewal_date",
    header: "Renewal Date",
    cell: ({ row }) => {
      return row.getValue("subscription_renewal_date") || "---";
    },
  },
  {
    accessorKey: "joined_at",
    header: "Joined At",
    cell: ({ row }) => {
      return new Date(row.getValue("joined_at")).toLocaleDateString();
    },
  },
  // {
  //   accessorKey: "subscription_plan_id",
  //   header: "Plan ID",
  // },
];
