import { Icons } from "@/components/icons";
import {
  CardTitle,
  CardContent,
  CardHeader,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { cookies } from "next/headers";
import { Plan, SubscriptionCardInfo } from "@/types/index";
import { H2 } from "@/components/typography";
import { buttonVariants } from "@/registry/new-york/ui/button";
import Link from "next/link";
import { clientGetSubscription } from "./actions/get-clinet-sub";
import { cn } from "@/lib/utils";

export default async function ClientPlansCard({ orgId }: { orgId: string }) {
  const getPlans = async () => {
    const token = cookies().get("ctoken");
    if (token) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans`,
        {
          headers: {
            Authorization: "Bearer " + token!.value,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    }
  };
  const plans = (await getPlans()) as Plan[];

  const clientSub = (await clientGetSubscription(
    orgId,
    0
  )()) as SubscriptionCardInfo[];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          訂閱方案
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans &&
            plans.length > 0 &&
            plans.map((p) => {
              const isSubscribed =
                (clientSub &&
                  clientSub.some((s) => s.subscription_plan_id === p.id)) ||
                false;
              return (
                <>
                  <Card key={p.id}>
                    <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                      <H2 className="font-semibold">{p.name}</H2>
                    </CardHeader>
                    <CardContent className="p-4 grid gap-2">
                      <div className="flex items-center gap-4">
                        <Icons.trendingup className="w-6 h-6" />
                        <div className="grid gap-1.5">
                          <h3 className="font-semibold">
                            ${p.amount} /{p.interval}天
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                        </div>
                      </div>
                      <div className="grid gap-1.5">
                        <ul className="pl-4 list-disc list-outside">
                          {p.description
                            .split("- ")
                            .map((d, idx) =>
                              idx > 0 ? <li key={idx}>{d}</li> : null
                            )}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-1 justify-center">
                      <Link
                        href={`/client/orgs/${orgId}/checkout?type=subscription&id=${p.id}`}
                        className={cn(
                          "w-full",
                          buttonVariants({ variant: "default" }),
                          isSubscribed && "pointer-events-none opacity-50"
                        )}
                      >
                        {/* 依據不同場景, 訂閱可能會變成 "升級" or "降級" */}
                        {isSubscribed ? "目前訂閱的方案" : "訂閱"}
                      </Link>
                    </CardFooter>
                  </Card>
                </>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
