import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrgForm } from "./edit-org-form";

async function getOrgById(id: string, token: string) {
  const res = await fetch(`http://localhost:8080/api/org/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await res.json();
  return data;
}

export async function DialogDemo(props: { orgId: string; token: string }) {
  const org = await getOrgById(props.orgId, props.token);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Org</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          {/* <DialogDescription>
            {`Make changes to your profile here. Click save when you're done.`}
          </DialogDescription> */}
        </DialogHeader>

        <OrgForm org={org} />
        {/* 
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export type Org = {
  id: string;
  name: string;
  description: string;
  app_id: string;
  app_key: string;
  partner_key: string;
  non_3D_mid: string;
  mid_with_3D: string;
};
