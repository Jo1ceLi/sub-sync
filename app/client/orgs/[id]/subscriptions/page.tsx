import PlanCard from "@/app/components/plan-card";
import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import SubBtn from "../plans/sub-btn";
import { Plan, Card as CardType } from "@/types";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  FormSchema,
  PlanRadioGroupForm,
} from "@/app/client/components/plan-radio-form";
import { cookies, headers } from "next/headers";
import { Card } from "@/components/ui/card";
import { z } from "zod";
// import Plan from "./[pid]/page";

export default async function OrgID({ params }: { params: any }) {
  const getPlans = async () => {
    const token = cookies().get("utoken") ?? cookies().get("ctoken");
    const url = headers().get("x-url");
    if (url && token) {
      const splits = url.split("/orgs/");
      const orgId = splits[1].substring(0, 36);
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/orgs/${orgId}/plans`,
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

  const subscribe = async (values: z.infer<typeof FormSchema>) => {
    "use server";
    const token = cookies().get("ctoken");
    // ✅ This will be type-safe and validated.
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${params["id"]}/plans/${values.planId}/subscribe`,
      {
        method: "POST",
        body: JSON.stringify({
          cardId: values.cardId,
        }),
        headers: {
          Authorization: "Bearer " + token!.value,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("val=", values);
    console.log("res", res.status);
    console.log("res json", await res.json());
    if (res.ok) {
      console.log("okokok");
    }
  };
  const plans = (await getPlans()) as Plan[];
  const cards = await getCards();
  return (
    <>
      {/* <Card className="flex flex-1 m-5 p-5 justify-evenly"> */}
      <PlanRadioGroupForm
        plans={plans}
        cards={cards}
        subscribeAction={subscribe}
      />
      {/* <Card className="m-2 p-5 w-1/2">
          <CardContent>
          </CardContent>
        </Card> */}
      {/* <Card className="m-2 bg-yellow-500 w-1/2">dd</Card> */}
      {/* </Card> */}
      {/* <Card className="flex flex-col flex-1 m-5">
        <RecentSubscriptions />
      </Card> */}
    </>
  );
}
