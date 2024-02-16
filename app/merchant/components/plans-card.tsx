import { Icons } from "@/components/icons";
import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { cookies, headers } from "next/headers";
import { Plan } from "@/types/index";
import { CreatePlanDialog } from "../orgs/components/create-plan-dialog";
import { postPlanAction } from "../orgs/plan-server-action";

export default async function PlansCard() {
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
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div>Subscription Plans</div>
          <div>
            <CreatePlanDialog action={postPlanAction} />
          </div>
        </CardTitle>
        {/* <CardContent className="text-sm">
          Manage your subscription plans and pricing.
        </CardContent> */}
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-3 gap-4">
          {plans.map((p) => (
            <>
              <Card key={p.id}>
                <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
                  <h2 className="font-semibold">{p.name}</h2>
                  <Button variant="outline">Edit</Button>
                </CardHeader>
                <CardContent className="p-4 grid gap-2">
                  <div className="flex items-center gap-4">
                    <Icons.trendingup className="w-6 h-6" />
                    <div className="grid gap-1.5">
                      <h3 className="font-semibold">Growth</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upgrade to access more features and increase your
                        productivity.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="pl-4 list-disc list-outside">
                      {p.description
                        .split("- ")
                        .map((d, idx) =>
                          idx > 0 ? <li key={idx}>{d}</li> : null
                        )}
                      {/* <li>{}</li>
                      <li>10 email templates</li>
                      <li>Basic reporting</li> */}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
