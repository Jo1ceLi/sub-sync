"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { formSchema } from "@/app/client/orgs/[id]/settings/components/client-form";

export const updateUserProfile = async (values: z.infer<typeof formSchema>) => {
  "use server";
  const token = cookies().get("utoken");
  const res = await fetch(`${process.env.BACKEND_HOST}/api/auth/profile`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return true;
  }
  return false;
};
