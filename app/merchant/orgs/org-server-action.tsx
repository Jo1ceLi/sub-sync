"use server";

import { z } from "zod";
import { formSchema } from "./org-form";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const patchOrgAction = async (
  id: string,
  values: z.infer<typeof formSchema>
) => {
  "use server";
  // Do something with the form values.
  const token = cookies().get("utoken");
  // ✅ This will be type-safe and validated.
  const res = await fetch(`${process.env.BACKEND_HOST}/api/orgs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    console.log("okokok");
    revalidatePath("/merchant/orgs");
  }
};

export const postOrgAction = async (values: z.infer<typeof formSchema>) => {
  "use server";
  const token = cookies().get("utoken");
  console.log("values from post action", values);
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  const res = await fetch(`${process.env.BACKEND_HOST}/api/orgs`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    console.log("okokok");
    revalidatePath("/merchant/orgs");
  }
};

export const deleteAction = async (id: string) => {
  "use server";
  const token = cookies().get("utoken");
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  const res = await fetch(`${process.env.BACKEND_HOST}/api/orgs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token!.value,
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    revalidatePath("/merchant/orgs");
  }
};
