import { redirect } from "next/navigation";
import type { Org } from "@/app/merchant/orgs/org-form";
import { useAuth } from "@/app/api/[auth]/auth";
import { ClientHome } from "@/components/client-home";

export default async function OrgID({ params }: { params: any }) {
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

  const session = await useAuth("client");
  const org = (await getOrgsByClientToken()) as Org;
  return (
    <>
      <ClientHome params={params} />
      <div className="container mx-auto">
        Hello! Welcome to {org.name}!<p>{org.description}!</p>
        <div className="grid lg:grid-cols-2 gap-4"></div>
      </div>
    </>
  );
}
