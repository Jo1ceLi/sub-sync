import { getAuth } from "@/app/api/[auth]/auth";
import { BackButton } from "@/app/client/components/back-button";
import { CoursePricingCombobox } from "@/app/client/components/course-pricing-combobox";
import { PlanPricingCombobox } from "@/app/client/components/plan-pricing-combobox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import type { Card as CardType, Course, Plan } from "@/types";
import { ResetIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Checkout({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orgId = params["id"];
  const type = searchParams["type"] as CheckoutTypeMap | undefined;
  const productId = searchParams["id"] as string | undefined; //共用在course or subscription

  const session = await getAuth("client");
  const getCourse = async () => {
    if (productId && orgId && type === "course") {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/courses/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session!.token,
          },
        }
      );
      if (res.ok) {
        return (await res.json()) as Course;
      } else {
        notFound();
      }
    }
  };

  const getPlan = async () => {
    if (productId && orgId) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session!.token,
          },
        }
      );
      if (res.ok) {
        const plans = (await res.json()) as Plan[];
        const plan = plans.filter((p) => p.id === productId).at(0);
        if (plan) {
          return plan;
        } else {
          notFound();
        }
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

  const org = await getOrgById();
  const cards = await getCards();

  let course: Course | undefined;
  let plan: Plan | undefined;
  if (!type) {
    notFound();
  } else if (type === "course") {
    course = await getCourse();
  } else if (type === "subscription") {
    plan = await getPlan();
  }
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        {course ? (
          <Card className="">
            <CardHeader className="grid pt-2">
              <BackButton />
              <CardTitle className="justify-self-center text-2xl">
                購買 {course.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <CoursePricingCombobox
                  pricing={course.pricing}
                  org={org}
                  cards={cards}
                  courseId={productId}
                />
              </div>
            </CardContent>
          </Card>
        ) : plan ? (
          <Card className="">
            <CardHeader className="grid pt-2">
              <BackButton />
              <CardTitle className="justify-self-center text-2xl">
                訂閱 {plan.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <PlanPricingCombobox
                  cards={cards}
                  org={org}
                  planId={productId}
                />
                {/* {TODO 訂閱內容！！！！} */}
              </div>
            </CardContent>
          </Card>
        ) : (
          <>NULL</>
        )}
      </div>
    </main>
  );
}

const CheckoutType = ["course", "subscription"] as const;
type CheckoutTypeMap = (typeof CheckoutType)[number];
