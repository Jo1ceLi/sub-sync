"use server";

import { getAuth } from "@/app/api/[auth]/auth";
import { ClientSubscription, SubscriptionCardInfo } from "@/types";
import { redirect } from "next/navigation";

//displayCount=0時, 全部顯示
export const clientGetSubscription =
  (orgId: string, displayCount: number | undefined) =>
  async (): Promise<
    SubscriptionCardInfo[] | SubscriptionCardInfo | undefined
  > => {
    "use server";
    const session = await getAuth("client");
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/subscription`,
      {
        headers: {
          Authorization: `Bearer ${session!.token}`,
        },
      }
    );
    if (response.ok) {
      const data = (await response.json()) as ClientSubscription[];
      if (!data || data.length === 0) {
        return undefined;
      } else if (displayCount === undefined) {
        return {
          subscription_status: data[0].subscription_status,
          subscription_renewal_date: data[0].subscription_renewal_date,
          subscription_plan_id: data[0].subscription_plan_id,
          plan_name: data[0].plan_name,
        };
      } else if (displayCount === 0) {
        return data.map((sub) => ({
          subscription_status: sub.subscription_status,
          subscription_renewal_date: sub.subscription_renewal_date,
          subscription_plan_id: sub.subscription_plan_id,
          plan_name: sub.plan_name,
        }));
      }
    } else if (response.status == 403) {
      redirect("/merchant/orgs");
    }
  };
