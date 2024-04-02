"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const editCustomer = async (orgId: string, cid: string, body: any) => {
  "use server";
  const token = cookies().get("utoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${orgId}/customers/${cid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      revalidatePath("/merchant/orgs/[id]/customers", "page");
      return res.status;
    }
  }
};
