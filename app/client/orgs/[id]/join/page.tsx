import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { JoinForm } from "./join-form";
import { getAuth } from "@/app/api/[auth]/auth";

export default async function Home({ params }: { params: { id: string } }) {
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

  //如果已經加入, 會跳轉到該組織
  const getOrgsByClientToken = async () => {
    const token = cookies().get("ctoken");
    if (token) {
      const res = await fetch(`${process.env.BACKEND_HOST}/api/client/orgs`, {
        headers: { Authorization: "Bearer " + token.value },
      });
      const orgs = (await res.json()) as any[];
      const oid = params.id;
      if (orgs.some((o: any) => o.id === oid)) {
        redirect(`/client/orgs/${oid}`);
      }
    }
  };

  const session = await getAuth("client");
  const org = await getOrgById();
  await getOrgsByClientToken();

  return (
    <Card className="m-5 p-5 w-[350px]">
      <CardTitle className="ml-5">
        HI {session?.user.name} 您被邀請至 {org.name}
      </CardTitle>

      <CardContent className="mt-5">
        <JoinForm orgId={org.id} defaultName={session?.user.name} />
      </CardContent>
    </Card>
  );
}
