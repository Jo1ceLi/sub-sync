"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const redeemVoucher = async ({
  orgId,
  voucherId,
  clientId,
}: {
  orgId: string;
  voucherId: string;
  clientId: string;
}) => {
  "use server";
  const token = cookies().get("utoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${orgId}/vouchers/${voucherId}/redeem`,
      {
        method: "POST",
        body: JSON.stringify({ clientId: clientId }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      }
    );
    if (res.ok) {
      revalidatePath("/merchant/orgs/[id]/customers/[cid]", "page");
      return res.status;
    }
  }
};

export const editVoucher = async (
  orgId: string,
  voucherId: string,
  body: any
) => {
  "use server";
  const token = cookies().get("utoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${orgId}/vouchers/${voucherId}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      }
    );
    if (res.ok) {
      revalidatePath("/merchant/orgs/[id]/plans", "page");
      return res.status;
    }
  }
  return;
};
