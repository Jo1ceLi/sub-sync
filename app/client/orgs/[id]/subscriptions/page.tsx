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
import { revalidatePath } from "next/cache";
// import Plan from "./[pid]/page";

export default async function OrgID({ params }: { params: any }) {
  const getPlans = async () => {
    const token = cookies().get("ctoken");
    if (token) {
      const orgId = params["id"];
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
    if (res.ok) {
      revalidatePath("/client/orgs/" + params["id"]);
      return res.status;
    }
    return res.status;
  };
  const plans = (await getPlans()) as Plan[];
  const cards = await getCards();
  return (
    <>
      {/* 您目前的會期, xxxxx */}

      <PlanRadioGroupForm
        plans={plans}
        cards={cards}
        subscribeAction={subscribe}
      />

      <Card className="flex flex-col flex-1 m-5">
        <RecentSubscriptions />
      </Card>
    </>
  );
}
