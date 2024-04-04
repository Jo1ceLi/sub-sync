import { Card as CardType, Course, Plan } from "@/types";
import { cookies } from "next/headers";
import { BackButton } from "@/app/client/components/back-button";
import { CoursePricingCombobox } from "@/app/client/components/course-pricing-combobox";
import { PlanPricingCombobox } from "@/app/client/components/plan-pricing-combobox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

export default async function Checkout({ params }: { params: any }) {
  const orgId = params["id"];
  const type = params["type"];
  const productId = params["productid"];

  const getPlan = async () => {
    const token = cookies().get("ctoken");
    if (token) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        return (await res.json()) as Plan;
      }
    }
  };

  const getOrgById = async () => {
    const token = cookies().get("ctoken");
    if (orgId && token) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}`,
        {
          headers: { Authorization: "Bearer " + token.value },
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
    if (token && orgId) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/cards`,
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

  const getCourse = async () => {
    const token = cookies().get("ctoken");
    if (productId && orgId && type === "course" && token) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/vouchers/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        return (await res.json()) as Course;
      }
    }
  };

  const org = await getOrgById();
  const cards = await getCards();
  const plan = await getPlan();
  const course = await getCourse();

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
        ) : (
          <></>
        )}
        {plan ? (
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
          <></>
        )}
      </div>
    </main>
  );
}
