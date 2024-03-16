import { redirect } from "next/navigation";
import type { Org } from "@/app/merchant/orgs/org-form";
import { getAuth } from "@/app/api/[auth]/auth";
import { ClientHome } from "@/components/client-home";

export default async function OrgID({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const getOrgsByClientToken = async () => {
    if (session?.token) {
      const res = await fetch(`${process.env.BACKEND_HOST}/api/client/orgs`, {
        headers: { Authorization: "Bearer " + session.token },
      });
      const orgs = (await res.json()) as any[];
      const oid = params.id;
      if (orgs.some((o: any) => o.id === oid) === false) {
        redirect(`/client/orgs/${oid}/join`);
      } else {
        return orgs.filter((o) => o.id === oid)[0] as Org;
      }
    }
  };

  const session = await getAuth("client");
  const org = (await getOrgsByClientToken()) as Org;
  return <ClientHome params={params} searchParams={searchParams} />;
}
