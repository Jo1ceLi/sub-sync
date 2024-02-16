import { cookies, headers } from "next/headers";
import { Plan } from "@/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cloneElement } from "react";

export default async function PlanCard({ children }: { children: any }) {
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
  const plans = (await getPlans()) as Plan[];
  return (
    <>
      {plans?.map((p) => {
        return (
          <>
            <Card key={p.id} className="bg-slate-200 w-[320px] h-[320px]">
              <CardHeader className="">
                <CardTitle>{p.name}</CardTitle>
              </CardHeader>
              <CardContent className=" h-[200px]">
                {p.amount > 0 ? (
                  <>
                    <h1 className="text-3xl mb-8">
                      ${p.amount}
                      <span className="text-sm">/{p.interval}天</span>
                    </h1>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl mb-8">Custom</h1>
                  </>
                )}
                {p.description.split("- ").map((d, idx) => {
                  if (idx === 0) {
                    return null;
                  } else {
                    return (
                      <p key={idx} className="text-neutral-600">
                        - {d}
                      </p>
                    );
                  }
                })}
              </CardContent>
              <CardFooter className="flex pb-3 px-6  justify-between">
                {cloneElement(children, { pid: p.id, key: p.id })}
              </CardFooter>
            </Card>
          </>
        );
      })}
    </>
  );
}
