import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditOrgForm } from "./edit-org-form";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { formSchema } from "./org-form";

async function getOrgById(id: string, token: string) {
  const res = await fetch(`${process.env.BACKEND_HOST}/api/org/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await res.json();
  return data;
}

export async function EditOrgDialog(props: { orgId: string; token: string }) {
  const org = await getOrgById(props.orgId, props.token);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    "use server";
    console.log("server values", values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/org/${props.orgId}`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
        headers: {
          Authorization: "Bearer " + props.token,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      console.log("okokok");
      revalidatePath("/merchant/org");
    }
  };

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

        <EditOrgForm org={org} update={onSubmit} />
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
