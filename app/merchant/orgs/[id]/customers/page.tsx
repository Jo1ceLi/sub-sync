import JoinOrgQRCode from "@/app/merchant/components/join-org-qrcode";
import { MerchantCRM } from "@/components/merchant-crm";
import { headers } from "next/headers";

export default async function MerchantCustomer() {
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  return (
    <>
      <MerchantCRM />
      <JoinOrgQRCode hostname={protocol + "://" + hostname!} />
    </>
  );
}
