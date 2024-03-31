import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SevenDaysInsight } from "@/app/merchant/orgs/components/seven-days-insight";
import { RecentSales } from "../components/recent-sales";
import { getAuth } from "@/app/api/[auth]/auth";
import { Insight } from "@/types";

export default async function DashboardPage({
  params,
}: {
  params: { id: string };
}) {
  const getInsights = async () => {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${params.id}/insights`,
      {
        headers: {
          Authorization: `Bearer ${session!.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = (await response.json()) as Insight;
      return data;
    }
  };

  const session = await getAuth("user");
  const insights = await getInsights();

  function dowToString(dow: number) {
    switch (dow) {
      case 0:
        return "週日";
      case 1:
        return "週一";
      case 2:
        return "週二";
      case 3:
        return "週三";
      case 4:
        return "週四";
      case 5:
        return "週五";
      case 6:
        return "週六";
      default:
        return "未知";
    }
  }

  const mergeDailyRevenue = () => {
    const merged = insights?.txs.curr.map((currItem) => {
      const prevItem = insights?.txs.prev.find(
        (prevItem) => prevItem.dow === currItem.dow
      );
      return {
        本期: currItem.total_amount,
        curr_d_transaction_date: currItem.d_transaction_date,
        上期: prevItem ? prevItem.total_amount : 0,
        prev_d_transaction_date: prevItem ? prevItem.d_transaction_date : null,
        dow: dowToString(currItem.dow),
      };
    });
    return merged;
  };

  const merged = mergeDailyRevenue();

  const TWDollar = new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">儀表板</h2>

        <div className="flex items-center space-x-2">
          {/* <CalendarDateRangePicker /> */}
          {/* <Button>Download</Button> */}
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">7日數據</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            商業分析{" "}
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            洞察報表{" "}
          </TabsTrigger>
          {/* <TabsTrigger value="notifications" disabled>
            Notifications{" "}
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">本期營收</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {TWDollar.format(
                    Number(
                      insights?.revenue.filter((r) => r.period === "curr")[0]
                        .revenue
                    )
                  )}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">上期營收</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {TWDollar.format(
                    Number(
                      insights?.revenue.filter((r) => r.period === "prev")[0]
                        .revenue
                    )
                  )}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  新增用戶數
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    insights?.new_customers.filter(
                      (nc) => nc.period === "curr"
                    )[0].count
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  上期新增用戶數:{" "}
                  {
                    insights?.new_customers.filter(
                      (nc) => nc.period === "prev"
                    )[0].count
                  }
                </p>
              </CardContent>
            </Card>
            {/* {訂閱} */}
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Subscriptions
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  新用戶平均消費額
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {TWDollar.format(
                    Number(
                      insights?.purchase_value.filter(
                        (pv) => pv.period === "curr"
                      )[0].pv
                    ) /
                      Number(
                        insights?.new_customers.filter(
                          (nc) => nc.period === "curr"
                        )[0].count
                      )
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  上期新用戶平均消費額:{" "}
                  {TWDollar.format(
                    Number(
                      insights?.purchase_value.filter(
                        (pv) => pv.period === "prev"
                      )[0].pv
                    ) /
                      Number(
                        insights?.new_customers.filter(
                          (nc) => nc.period === "prev"
                        )[0].count
                      )
                  )}
                </p>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card> */}
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card> */}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* <Card className="col-span-4"> */}
            <Card className="col-span-5">
              <CardHeader>
                <CardTitle>每日營收</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <SevenDaysInsight chartdata={merged} />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>
                  營收分佈
                  <span className="ml-3 text-xs text-slate-600 font-medium">
                    {"即將推出"}
                  </span>
                </CardTitle>
                {/* <CardDescription>
                  You made 265 sales this month.
                </CardDescription> */}
              </CardHeader>
              <CardContent className="blur-sm">
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
