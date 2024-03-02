import { OrgForm } from "./components/org-form";
import { patchOrgAction } from "../../org-server-action";
import { getOrgsData } from "../../page";

export default async function Settings({ params }: { params: { id: string } }) {
  const orgs = await getOrgsData();
  const org = orgs.find((org) => org.id === params.id);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">設定</h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      <OrgForm org={org} action={patchOrgAction} />
    </>
  );
}
