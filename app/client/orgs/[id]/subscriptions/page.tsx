import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import { Plan, Card as CardType, Subscription, Customer } from "@/types";
import {
  FormSchema,
  PlanRadioGroupForm,
} from "@/app/client/components/plan-radio-form";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";
import { Session, getAuth } from "@/app/api/[auth]/auth";
import { redirect } from "next/navigation";
import { ClientSettingsForm } from "../settings/components/client-form";

export default async function OrgID({ params }: { params: any }) {
  const orgId = params["id"];

  const getPlans = async () => {
    if (orgId) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans`,
        {
          headers: {
            Authorization: "Bearer " + session!.token,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    }
  };

  const getCards = async () => {
    if (orgId) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/cards`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session!.token,
          },
        }
      );
      if (res.ok) {
        const cards = (await res.json()) as CardType[];
        return cards;
      }
    }
  };

  const subscribe = async (values: z.infer<typeof FormSchema>) => {
    "use server";
    const token = cookies().get("ctoken");
    // ✅ This will be type-safe and validated.
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${values.planId}/subscribe`,
      {
        method: "POST",
        body: JSON.stringify({
          cardId: values.cardId,
        }),
        headers: {
          Authorization: "Bearer " + token!.value,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      revalidatePath(`/client/orgs/${orgId}`);
      revalidatePath(`/client/orgs/${orgId}/subscriptions`);
      return res.status;
    }
    return res.status;
  };

  const session = await getAuth("client");
  const plans = (await getPlans()) as Plan[];
  const cards = await getCards();

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <SubscriptionPlanCard session={session} orgId={orgId} />
        </div>
      </main>
      <PlanRadioGroupForm
        plans={plans}
        cards={cards}
        subscribeAction={subscribe}
      />

      {/* <div className="p-4">
        <ClientSettingsForm user={session?.user} />
      </div> */}
      {/* <RecentSubscriptions /> */}
    </>
  );
}

export async function SubscriptionPlanCard({
  session,
  orgId,
  children,
}: {
  session: Session | undefined;
  orgId: string;
  children?: React.ReactNode;
}) {
  const getSubscription = async () => {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/subscription`,
      {
        headers: {
          Authorization: `Bearer ${session!.token}`,
        },
      }
    );
    if (response.ok) {
      const data = (await response.json()) as Customer;
      if (data.subscription_plan_id === null) {
        return undefined;
      } else {
        return {
          subscription_status: data.subscription_status,
          subscription_renewal_date: data.subscription_renewal_date,
          subscription_plan_id: data.subscription_plan_id,
          plan_name: data.plan_name,
        };
      }
    } else if (response.status == 403) {
      redirect("/merchant/orgs");
    }
  };
  const sub = await getSubscription();
  if (sub === undefined) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">目前訂閱方案</CardTitle>
          <Button size="sm">
            <Link href={`/client/orgs/${orgId}/subscriptions`}>訂閱</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-4">
              <div className="font-semibold">方案</div>
              <div>----</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold">狀態</div>
              <div>----</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold">續訂日期</div>
              <div>----/--/--</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">目前訂閱方案</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="font-semibold">方案</div>
            <div>{sub.plan_name}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold">狀態</div>
            <div>{sub.subscription_status}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold">續訂日期</div>
            <div>
              {new Date(
                sub.subscription_renewal_date as string
              ).toLocaleDateString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
