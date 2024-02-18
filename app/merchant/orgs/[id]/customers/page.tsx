import { useAuth } from "@/app/api/[auth]/auth";
import JoinOrgQRCode from "@/app/merchant/components/join-org-qrcode";
import { MerchantCRM } from "@/components/merchant-crm";
import { Customer } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
  console.log("cusotmers", customers);
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return (
    <>
      <MerchantCRM customers={customers} />
      <JoinOrgQRCode hostname={protocol + "://" + hostname!} />
    </>
  );
}
