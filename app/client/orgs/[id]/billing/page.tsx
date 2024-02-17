import { Card as CardType } from "@/types";
import { cookies } from "next/headers";
import CreateCard from "@/app/client/components/create-card-card";
import { redirect } from "next/navigation";
import { CreditCard } from "@/components/credit-card";

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
              frontend_redirect_url: "https://google.com.tw",
              go_back_url: "https://google.com.tw",
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

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-4">
        <CreateCard createcardaction={createcardaction} />
        {cards?.map((c) => {
          return <CreditCard key={c.id} card={c} params={params} />;
        })}
      </div>
    </div>
  );
}
