"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const redeemCourse = async ({
  orgId,
  courseId,
  clientId,
}: {
  orgId: string;
  courseId: string;
  clientId: string;
}) => {
  "use server";
  const token = cookies().get("utoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${orgId}/vouchers/${courseId}/redeem`,
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
