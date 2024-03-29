"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const joinOrg = async (
  orgId: string,
  data: {
    name: string;
    phone: string;
    email?: string;
  }
) => {
  "use server";
  const token = cookies().get("ctoken");
  if (token && orgId) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/join`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: "Bearer " + token.value,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      redirect(`/client/orgs/${orgId}`);
    }
  }
};
