"use server";

import { getAuth } from "@/app/api/[auth]/auth";
import { revalidatePath } from "next/cache";

export const cancelSubscription = async (orgId: string, planId: string) => {
  "use server";
  const session = await getAuth("client");
  const response = await fetch(
    `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${planId}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.token}`,
      },
    }
  );
  if (response.ok) {
    revalidatePath(`/client/orgs/${orgId}`, "page");
    revalidatePath(`/client/orgs/${orgId}/subscriptions`, "page");
    return response.status;
  }
};

export const resumeSubscription = async (orgId: string, planId: string) => {
  "use server";
  const session = await getAuth("client");
  const response = await fetch(
    `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${planId}/subscribe/existing-card`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session!.token}`,
      },
    }
  );
  if (response.ok) {
    revalidatePath(`/client/orgs/${orgId}`, "page");
    revalidatePath(`/client/orgs/${orgId}/subscriptions`, "page");
    return response.status;
  }
};
