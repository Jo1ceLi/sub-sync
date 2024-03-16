import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { JoinForm } from "./join-form";
import { getAuth } from "@/app/api/[auth]/auth";

export default async function Home({ params }: { params: { id: string } }) {
  const joinAction = async (val: { phone: string }) => {
    "use server";
    const token = cookies().get("ctoken");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}/join`,
        {
          method: "POST",
          body: JSON.stringify(val),
          headers: {
            Authorization: "Bearer " + token.value,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        redirect(`/client/orgs/${oid}`);
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

  const session = await getAuth("client");
  const org = await getOrgById();

  return (
    <Card className="m-5 p-5 w-[350px]">
      <CardTitle className="ml-5">
        HI {session?.user.name} YOU ARE INVITED TO {org.name}
      </CardTitle>

      <CardContent className="mt-5">
        <JoinForm submit={joinAction} />
      </CardContent>
    </Card>
  );
}
