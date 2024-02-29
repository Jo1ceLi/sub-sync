import { useAuth } from "@/app/api/[auth]/auth";
import JoinOrgQRCode from "@/app/merchant/components/join-org-qrcode";
import { MerchantCRM } from "@/components/merchant-crm";
import { Customer } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DataTable } from "@/app/merchant/orgs/[id]/customers/data-table";
import { columns } from "@/app/merchant/orgs/[id]/customers/columns";
import { Card, CardContent } from "@/components/ui/card";

export default async function MerchantCustomer({
  params,
}: {
  params: { id: string };
}) {
  const getCustomers = async () => {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${params.id}/customers`,
      {
        headers: {
          Authorization: `Bearer ${session!.token}`,
        },
      }
    );
    if (response.ok) {
      const data = (await response.json()) as Customer[];
      return data;
    } else if (response.status == 403) {
      redirect("/merchant/orgs");
    }
    return [];
  };
  const session = await useAuth("user");

  const customers = await getCustomers();
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return (
    <>
      <DataTable columns={columns} data={customers}>
        <Card className="flex items-center mt-5">
          <JoinOrgQRCode hostname={protocol + "://" + hostname!} />
          <CardContent>
            <p>請消費者掃描此QR Code </p>
            <p>加入會員</p>
          </CardContent>
        </Card>
      </DataTable>
      {/* <MerchantCRM customers={customers} /> */}
    </>
  );
}
