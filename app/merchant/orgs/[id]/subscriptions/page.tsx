import { useAuth } from "@/app/api/[auth]/auth";
import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import { Card } from "@/components/ui/card";
import { Transaction } from "@/types";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function Subscriptions({
  params,
}: {
  params: { id: string };
}) {
  const session = await useAuth("user");
  const getTransactions = async () => {
    const response = await fetch(
      `${process.env.BACKEND_HOST}/api/orgs/${params.id}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${session!.token}`,
        },
      }
    );
    if (response.ok) {
      const data = (await response.json()) as Transaction[];
      return data;
    } else if (response.status == 403) {
      redirect("/merchant/orgs");
    }
    return [];
  };

  const txs = await getTransactions();
  console.log("txs", txs);
  return (
    <Card className="flex flex-col flex-1 m-5">
      <DataTable columns={columns} data={txs} />
      {/* <RecentSubscriptions /> */}
    </Card>
  );
}
