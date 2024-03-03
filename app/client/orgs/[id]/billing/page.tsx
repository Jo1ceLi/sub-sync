import { Card as CardType } from "@/types";
import { cookies, headers } from "next/headers";
import CreateCard from "@/app/client/components/create-card-card";
import { notFound, redirect } from "next/navigation";
import { CreditCard } from "@/components/credit-card";
import { Card } from "@/components/ui/card";

export default async function ClientBilling({ params }: { params: any }) {
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

  const createcardaction = async (prime: string, alias: string) => {
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

  const cards = await getCards();
  const org = await getOrgById();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <CreateCard org={org} createcardaction={createcardaction} />
        {cards && cards.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">尚無付款方式</h2>
              <p className="text-gray-500">請先新增付款方式</p>
            </div>
          </div>
        ) : (
          <Card className="p-4 md:mt-8 lg:mt-0 flex flex-wrap justify-center gap-4">
            {cards?.map((c) => {
              return <CreditCard key={c.id} card={c} params={params} />;
            })}
          </Card>
        )}
      </div>
    </main>
  );
}
