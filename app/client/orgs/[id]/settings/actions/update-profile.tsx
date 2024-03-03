"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { formSchema } from "../components/client-form";

export const updateClientProfile = async (
  values: z.infer<typeof formSchema>
) => {
  "use server";
  const token = cookies().get("ctoken");
  const res = await fetch(`${process.env.BACKEND_HOST}/api/auth/profile`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    revalidatePath("/client/orgs/[id]/settings", "page");
    return true;
  }
  return false;
};
