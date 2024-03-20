import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import { Plan, Card as CardType, SubscriptionCardInfo } from "@/types";
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
import { getAuth } from "@/app/api/[auth]/auth";
import { clientGetSubscription } from "@/app/client/components/actions/get-clinet-sub";

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
  const clientSub = await clientGetSubscription(orgId, 0)();

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <SubscriptionPlanCard
            orgId={orgId}
            subscriptionCardInfo={clientSub}
          />
        </div>
      </main>
      <PlanRadioGroupForm
        plans={plans}
        cards={cards}
        subscribeAction={subscribe}
      />

      {/* <RecentSubscriptions /> */}
    </>
  );
}

export async function SubscriptionPlanCard({
  subscriptionCardInfo,
  orgId,
  children,
}: {
  subscriptionCardInfo:
    | SubscriptionCardInfo
    | SubscriptionCardInfo[]
    | undefined;
  orgId: string;
  children?: React.ReactNode;
}) {
  const sub = subscriptionCardInfo;
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
    <>
      {sub instanceof Array ? (
        sub.map((s) => (
          <Card key={s.subscription_plan_id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                目前訂閱方案
              </CardTitle>
              {children}
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center gap-4">
                  <div className="font-semibold">方案</div>
                  <div>{s.plan_name}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-semibold">狀態</div>
                  <div>{s.subscription_status}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-semibold">續訂日期</div>
                  <div>
                    {new Date(
                      s.subscription_renewal_date as string
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
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
      )}
    </>
  );
}
