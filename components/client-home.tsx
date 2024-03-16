import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import type {
  Card as CardType,
  Customer,
  Subscription,
  Transaction,
} from "@/types";
import { Button } from "@/registry/new-york/ui/button";
import { Icons } from "@/components/icons";
import { redirect } from "next/navigation";
import { getAuth } from "@/app/api/[auth]/auth";
import Link from "next/link";
import { SubscriptionPlanCard } from "@/app/client/orgs/[id]/subscriptions/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientCourseCard from "@/app/client/components/course-card";
import ClientPlansCard from "@/app/client/components/sub-plan-card";

export async function ClientHome({ params }: { params: any }) {
  const orgId = params["id"];
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

  const getTransactions = async () => {
    if (orgId) {
      const response = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${session!.token}`,
          },
        }
      );
      if (response.ok) {
        const data = (await response.json()) as Transaction[];
        return data;
      } else if (response.status == 403) {
        redirect("/merchant/orgs");
      }
      return [];
    }
  };

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

  const session = await getAuth("client");
  const cards = await getCards();
  const card = cards?.[0];

  const txs = await getTransactions();
  const sub = await getSubscription();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <SubscriptionPlanCard session={session} orgId={orgId}>
          <Button asChild size="sm">
            <Link href={`/client/orgs/${orgId}/subscriptions`}>變更</Link>
          </Button>
        </SubscriptionPlanCard>
        <PaymentMethodCard card={card} orgId={orgId} />
      </div>

      <Tabs defaultValue="subscription">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">訂閱方案</TabsTrigger>
          <TabsTrigger value="course">課程</TabsTrigger>
        </TabsList>
        <TabsContent value="subscription">
          <ClientPlansCard />
        </TabsContent>
        <TabsContent value="course">
          <ClientCourseCard />
        </TabsContent>
      </Tabs>

      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">最近交易紀錄</CardTitle>
          <Button size="sm">更多</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {txs && txs.length > 0 ? (
              txs.map((tx) => {
                return (
                  <Card key={tx.id}>
                    <CardContent className="pt-6 md:flex gap-4">
                      <Icons.calendar className="w-6 h-6" />
                      <div className="font-semibold">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm">Monthly Subscription</div>
                      <div className="text-sm">{tx.description}</div>
                      <div className="ml-auto font-semibold">{`$${tx.amount}`}</div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="font-semibold text-sm">無交易紀錄</div>
            )}
          </div>
        </CardContent>
      </Card> */}
    </main>
  );
}

function PaymentMethodCard({
  card,
  orgId,
}: {
  card: CardType | undefined;
  orgId: string;
}) {
  if (card === undefined) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            請先新增付款方式
          </CardTitle>
          <Button asChild size="sm">
            <Link href={`/client/orgs/${orgId}/billing`}>新增</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-4">
              <Icons.creditCard className="w-6 h-6" />
              <div>**** **** **** ****</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold">卡片別名</div>
              <div>---</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold">Expires</div>
              <div>
                {"----"}/{"--"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">付款方式</CardTitle>
        <Button asChild size="sm">
          <Link href={`/client/orgs/${orgId}/billing`}>更新</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-4">
            <Icons.creditCard className="w-6 h-6" />
            <div>**** **** **** {card.last_four}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold">卡片別名</div>
            <div>{card.alias}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold">有效期限</div>
            <div>
              {card.expiry.substring(0, 4)}/{card.expiry.substring(4)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
