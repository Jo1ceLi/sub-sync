import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import type { Card as CardType } from "@/app/client/orgs/[id]/page";
import { Button } from "@/registry/new-york/ui/button";
import { cookies } from "next/headers";
import { Icons } from "@/components/icons";

export async function ClientHome({ params }: { params: any }) {
  const getCards = async () => {
    const token = cookies().get("ctoken");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}/cards`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        const cards = (await res.json()) as CardType[];
        return cards;
      }
    }
  };
  const cards = await getCards();
  const card = cards?.[0];
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Subscription Plan
            </CardTitle>
            <Button size="sm">Change Plan</Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-4">
                <div className="font-semibold">Plan</div>
                <div>Pro</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">Status</div>
                <div>Active</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">Renewal Date</div>
                <div>March 25, 2023</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Payment Method
            </CardTitle>
            <Button size="sm">Update</Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-4">
                <Icons.creditCard className="w-6 h-6" />
                <div>**** **** **** {card?.last_four}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">Alias</div>
                <div>{card?.alias}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-semibold">Expires</div>
                <div>
                  {card?.expiry.substring(0, 4)}/{card?.expiry.substring(4)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">
            Recent Transactions
          </CardTitle>
          <Button size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Card>
              <CardContent className="flex items-center gap-4">
                <Icons.calendar className="w-6 h-6" />
                <div className="font-semibold">March 25, 2023</div>
                <div className="text-sm">Monthly Subscription</div>
                <div className="ml-auto font-semibold">$25.00</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4">
                <Icons.calendar className="w-6 h-6" />
                <div className="font-semibold">March 25, 2023</div>
                <div className="text-sm">Monthly Subscription</div>
                <div className="ml-auto font-semibold">$25.00</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4">
                <Icons.calendar className="w-6 h-6" />
                <div className="font-semibold">March 25, 2023</div>
                <div className="text-sm">Monthly Subscription</div>
                <div className="ml-auto font-semibold">$25.00</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
