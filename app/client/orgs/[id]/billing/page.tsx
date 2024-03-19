import { Card as CardType, Transaction } from "@/types";
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { CreditCard } from "@/components/credit-card";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { getAuth } from "@/app/api/[auth]/auth";
import { Button } from "@/registry/new-york/ui/button";
import { Icons } from "@/components/icons";
import { CreateCardDialog } from "@/app/client/components/new-credit-card-dialog";
import { formatDesc } from "@/lib/utils";

export default async function ClientBilling({ params }: { params: any }) {
  const orgId = params["id"];

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

  const getOrgById = async () => {
    const oid = params["id"];
    const token = cookies().get("ctoken");
    if (oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}`,
        {
          headers: { Authorization: "Bearer " + token!.value },
        }
      );
      if (res.ok) {
        return await res.json();
      } else if (res.status === 404) {
        notFound();
      }
    }
  };

  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") || "";
  const domain = headersList.get("x-forwarded-host") || "";
  const pathname = `/client/orgs/${params["id"]}/billing` || "/client/orgs";

  const currentUrl = domain.startsWith("localhost:")
    ? "https://www.google.com"
    : `${protocol}://${domain}${pathname}`;

  const createcardaction = async (
    prime: string,
    {
      name,
      phone_number,
      email,
      alias,
    }: {
      name: string | undefined;
      phone_number: string | undefined;
      email: string | undefined;
      alias: string;
    }
  ) => {
    "use server";
    const token = cookies().get("ctoken");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}/cards`,
        {
          method: "POST",
          body: JSON.stringify({
            alias: alias,
            prime: prime,
            result_url: {
              frontend_redirect_url: currentUrl,
              go_back_url: currentUrl,
            },
            cardholder: {
              phone_number,
              name: name,
              email,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        const body = await res.json();
        redirect(body.url);
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

  const session = await getAuth("client");
  const txs = await getTransactions();
  const cards = await getCards();
  const org = await getOrgById();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4">
        {cards && cards.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">尚無支付方式</h2>
              <p className="text-gray-500 mb-3">請先新增支付方式</p>
              <CreateCardDialog
                org={org}
                createcardaction={createcardaction}
                session={session}
              />
            </div>
          </div>
        ) : (
          <>
            {cards?.map((c) => {
              return <CreditCard key={c.id} card={c} params={params} />;
            })}
            <CreateCardDialog
              org={org}
              createcardaction={createcardaction}
              session={session}
            />
          </>
        )}
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">最近交易紀錄</CardTitle>
          <Button size="sm">更多</Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {txs && txs.length > 0 ? (
              txs.map((tx) => {
                const desc = formatDesc(tx.description);
                return (
                  <Card key={tx.id}>
                    <CardContent className="pt-6 md:flex gap-4">
                      <Icons.calendar className="w-6 h-6" />
                      <div className="font-semibold">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </div>
                      <div className="text-sm">{desc}</div>
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
      </Card>
    </main>
  );
}
