"use server";

import { z } from "zod";
import { formSchema } from "./components/edit-plan-form";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createVoucherFormSchema } from "@/app/merchant/components/create-voucher-form";

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
    revalidatePath("/merchant/orgs/[id]", "page");
  }
};

export const updatePlanAction = async (
  oid: string,
  planId: string,
  values: z.infer<typeof formSchema>
) => {
  "use server";
  const token = cookies().get("utoken");
  const res = await fetch(
    `${process.env.BACKEND_HOST}/api/orgs/${oid}/plans/${planId}`,
    {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + token!.value,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    console.log("okokok");
    revalidatePath("/merchant/orgs/[id]", "page");
  }
};

export const postVoucherAction = async (
  oid: string,
  values: z.infer<typeof createVoucherFormSchema>
) => {
  "use server";
  const token = cookies().get("utoken");
  const res = await fetch(
    `${process.env.BACKEND_HOST}/api/orgs/${oid}/vouchers`,
    {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + token!.value,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    console.log("okokok");
    revalidatePath("/merchant/orgs/[id]", "page");
  }
};
