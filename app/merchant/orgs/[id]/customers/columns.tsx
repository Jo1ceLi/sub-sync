"use client";

import { ColumnDef } from "@tanstack/react-table";
import type { Customer } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  CustomerActions,
  EditCustomerDialog,
} from "@/app/merchant/components/customer-actions";

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "picture",
    header: "",
    cell: ({ row }) => {
      const pic = row.getValue("picture") as string;
      const altname = row.getValue("name") as string;
      return (
        <Image
          className="rounded-full"
          style={{
            aspectRatio: "1/1",
            objectFit: "cover",
          }}
          alt={altname}
          src={pic}
          width={35}
          height={35}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "姓名",
  },
  {
    accessorKey: "phone",
    header: "電話",
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return (
        <a className="text-blue-500 hover:underline" href={`tel:${phone}`}>
          {phone}
        </a>
      );
    },
  },

  {
    accessorKey: "note",
    header: "備註",
  },
  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "sub_count",
    header: "訂閱數",
  },
  {
    accessorKey: "joined_at",
    header: "加入時間",
    cell: ({ row }) => {
      return new Date(row.getValue("joined_at")).toLocaleDateString();
    },
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) =>
      "#" + String(row.getValue("id")).slice(0, 6).toUpperCase(),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const params = useParams();
      const orgId = params.id as string;

      const customerInfo = {
        name: row.getValue("name") as string,
        note: row.getValue("note") as string,
        email: row.getValue("email") as string,
        phone: row.getValue("phone") as string,
      };
      return (
        <>
          <EditCustomerDialog
            orgId={orgId}
            cid={id}
            customerInfo={customerInfo}
          >
            <CustomerActions orgId={orgId} cid={id} />
          </EditCustomerDialog>
        </>
      );
    },
  },
];
