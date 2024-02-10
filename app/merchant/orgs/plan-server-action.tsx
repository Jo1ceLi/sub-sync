"use server";

import { z } from "zod";
import { formSchema } from "./components/plan-form";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const postPlanAction = async (
  oid: string,
  values: z.infer<typeof formSchema>
) => {
  "use server";
  const token = cookies().get("utoken");
  const res = await fetch(`${process.env.BACKEND_HOST}/api/orgs/${oid}/plans`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    console.log("okokok");
    revalidatePath("/merchant/orgs/[id]");
  }
};
