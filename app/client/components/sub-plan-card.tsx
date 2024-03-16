import { Icons } from "@/components/icons";
import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import { cookies, headers } from "next/headers";
import { Plan } from "@/types/index";
import { H2 } from "@/components/typography";

export default async function ClientPlansCard() {
  const getPlans = async () => {
    const token = cookies().get("ctoken");
    const url = headers().get("x-url");
    if (url && token) {
      const splits = url.split("/orgs/");
      const orgId = splits[1].substring(0, 36);
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
  const plans = (await getPlans()) as Plan[];
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          訂閱方案
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans &&
            plans.length > 0 &&
            plans.map((p) => (
              <>
                <Card key={p.id}>
                  <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                    <H2 className="font-semibold">{p.name}</H2>
                  </CardHeader>
                  <CardContent className="p-4 grid gap-2">
                    <div className="flex items-center gap-4">
                      <Icons.trendingup className="w-6 h-6" />
                      <div className="grid gap-1.5">
                        <h3 className="font-semibold">
                          ${p.amount} /{p.interval}天
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400"></p>
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <ul className="pl-4 list-disc list-outside">
                        {p.description
                          .split("- ")
                          .map((d, idx) =>
                            idx > 0 ? <li key={idx}>{d}</li> : null
                          )}
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
