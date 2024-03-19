"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/types";
import { formatDesc } from "@/lib/utils";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) =>
      "#" + String(row.getValue("id")).slice(0, 6).toUpperCase(),
  },

  {
    accessorKey: "description",
    header: "訂購項目",
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return formatDesc(desc);
    },
  },
  {
    accessorKey: "amount",
    header: "金額",
  },

  {
    accessorKey: "client_name",
    header: "顧客姓名",
  },
  {
    accessorKey: "client_note",
    header: "顧客備註",
    cell: ({ row }) => {
      const note = row.getValue("client_note") as string;
      return note || "無";
    },
  },
  {
    accessorKey: "client_phone",
    header: "顧客手機",
    cell: ({ row }) => {
      const phone = row.getValue("client_phone") as string;
      return phone || "無";
    },
  },
  {
    accessorKey: "created_at",
    header: "訂購時間",
    cell: ({ row }) =>
      new Date(row.getValue("created_at")).toLocaleDateString(),
  },
  {
    accessorKey: "rec_trade_id",
    header: "交易編號",
  },
];
