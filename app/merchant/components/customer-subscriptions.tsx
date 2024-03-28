import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import { SubscriptionCardInfo } from "@/types";
import { H2 } from "@/components/typography";
import { PauseIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

type SubStatus = "active" | "cancelled" | "failed";

export default function CustomerSubscriptions({
  plans,
}: {
  plans: SubscriptionCardInfo[];
}) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          訂閱方案
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans && plans.length > 0 ? (
            plans.map((p) => {
              const status: SubStatus =
                p.subscription_status === "active" &&
                new Date(p.subscription_renewal_date).getTime() > Date.now()
                  ? "active"
                  : new Date(p.subscription_renewal_date).getTime() >
                      Date.now() && p.subscription_status === "inactive"
                  ? "cancelled"
                  : "failed";
              //status 0: 訂閱中, 1: 已取消, 2: 扣款失敗已過期

              const subStatusText = (status: SubStatus) => {
                switch (status) {
                  case "active":
                    return "訂閱中";
                  case "cancelled":
                    return "已取消";
                  case "failed":
                    return "扣款失敗已過期";
                }
              };
              const subDateText = (status: SubStatus) => {
                switch (status) {
                  case "active":
                    return "下次扣款日期";
                  case "cancelled":
                    return "訂閱到期日期";
                  case "failed":
                    return "最後扣款日期";
                }
              };
              const subTextColor = (status: SubStatus) => {
                switch (status) {
                  case "active":
                    return "text-green-600";
                  case "cancelled":
                    return "text-orange-400 underline";
                  case "failed":
                    return "text-red-500 underline";
                }
              };
              const subIcon = (status: SubStatus) => {
                switch (status) {
                  case "active":
                    return <CheckIcon className="w-6 h-6 text-green-600" />;
                  case "cancelled":
                    return <PauseIcon className="w-6 h-6 text-orange-400" />;
                  case "failed":
                    return <Cross2Icon className="w-6 h-6 text-red-500" />;
                }
              };

              return (
                <Card key={p.subscription_plan_id}>
                  <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                    <H2 className="font-semibold">{p.plan_name}</H2>
                  </CardHeader>
                  <CardContent className="p-4 grid gap-2">
                    <div className="flex  gap-4 align-middle">
                      {subIcon(status)}
                      {/* <Icons.trendingup className="w-6 h-6" /> */}
                      <div className="grid gap-1.5">
                        <h3 className="font-semibold">
                          訂閱狀態:{" "}
                          <span className={subTextColor(status)}>
                            {subStatusText(status)}
                          </span>
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      {subDateText(status)}:{" "}
                      {new Date(
                        p.subscription_renewal_date
                      ).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="p-4">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">尚無任何訂閱</h2>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
