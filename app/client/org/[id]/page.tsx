import { cookies } from "next/headers";
import CreateCard from "../../components/create-card-card";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Card {
  id: string;
  alias: string;
  funding: string;
  network: string;
  last_four: string;
  expiry: string;
  rank: string;
}

export default async function OrgID({ params }: { params: any }) {
  const createcardaction = async (prime: string) => {
    "use server";
    const token = cookies().get("token");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/org/${oid}/cards`,
        {
          method: "POST",
          body: JSON.stringify({
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

  const getCards = async () => {
    const token = cookies().get("token");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/org/${oid}/cards`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        const cards = (await res.json()) as Card[];
        return cards;
      }
    }
  };

  const cards = await getCards();
  return (
    <>
      <div className="container mx-auto">
        HELLO FROM ORG {params.id}
        <div className="grid lg:grid-cols-2 gap-4">
          <CreateCard createcardaction={createcardaction} />
          {cards?.map((c) => {
            return (
              <Card key={c.id}>
                <CardHeader>
                  <CardTitle>信用卡</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Label className="font-bold">發卡網路</Label>
                  <div className="text-slate-600">{c.network}</div>
                  <Label className="font-bold">末四碼</Label>
                  <div className="text-slate-600">{c.last_four}</div>
                  <Label className="font-bold">卡種</Label>
                  <div className="text-slate-600"> {c.funding}</div>
                  <Label className="font-bold">到期年月</Label>
                  <div className="text-slate-600">{c.expiry}</div>
                </CardContent>
              </Card>
            );
          })}
          <Card></Card>
        </div>
      </div>
    </>
  );
  //TODO: BIND CARD PAGE
}
