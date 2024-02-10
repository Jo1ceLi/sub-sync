import { Button } from "@/registry/new-york/ui/button";
import { CreatePlanDialog } from "../components/create-plan-dialog";
import { postPlanAction } from "../plan-server-action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cookies, headers } from "next/headers";

interface Plan {
  id: string;
  name: string;
  description: string;
  amount: number;
  interval: number;
  currency: string;
}

export default async function OrgPlanPage() {
  const getPlans = async () => {
    const token = cookies().get("token");
    const url = headers().get("x-url");
    if (url && token) {
      const oid = url.split("/")[url.split("/").length - 1];
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/orgs/${oid}/plans`,
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
      <div className="">
        <div className="grid grid-rows-5 h-dvh">
          <div id="top" className="container p-2 flex justify-between">
            <p>1</p>
            <CreatePlanDialog action={postPlanAction} />
          </div>
          <div
            id="middle"
            className="container items-center grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-1 gap-4 row-span-3 bg-slate-100"
          >
            {plans?.map((p) => (
              <>
                <Card id={p.id} className="bg-slate-200 w-[320px] h-[320px]">
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
                        return <></>;
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
                    <Button className="bg-slate-800">編輯</Button>
                    <Button className="bg-slate-800">刪除</Button>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
          <div id="bottom" className="">
            03
          </div>
        </div>
      </div>
    </>
  );
}
