import { Card as CardType } from "@/types";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreateCard from "@/app/client/components/create-card-card";
import { Label } from "@/components/ui/label";
import { DeleteCardButton } from "@/app/client/components/delete-card-btn";
import PlanCard from "@/app/components/plan-card";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  const deleteCardAction = async (id: string) => {
    "use server";
    const token = cookies().get("ctoken");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}/cards/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        revalidatePath("/client/orgs/" + oid);
      }
    }
  };
  const cards = await getCards();

  return (
    <div className="container mx-auto">
      {/* Hello! Welcome to {org.name}!<p>{org.description}!</p> */}
      <div className="grid lg:grid-cols-2 gap-4">
        <CreateCard createcardaction={createcardaction} />

        {cards?.map((c) => {
          return (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle>信用卡</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Label className="font-bold self-center">卡片別名</Label>
                <div className="text-slate-600">
                  {c.alias === "" ? c.id : c.alias}
                </div>
                <Label className="font-bold self-center">發卡網路</Label>
                <div className="text-slate-600">{c.network}</div>
                <Label className="font-bold self-center">末四碼</Label>
                <div className="text-slate-600">{c.last_four}</div>
                <Label className="font-bold self-center">卡種</Label>
                <div className="text-slate-600"> {c.funding}</div>
                <Label className="font-bold self-center">到期年月</Label>
                <div className="text-slate-600">{c.expiry}</div>
              </CardContent>
              <CardFooter>
                <DeleteCardButton
                  text="刪除"
                  id={c.id}
                  deletecard={deleteCardAction}
                />
              </CardFooter>
            </Card>
          );
        })}
        {/* <PlanCard>
          <></>
        </PlanCard> */}
      </div>
    </div>
  );
}
