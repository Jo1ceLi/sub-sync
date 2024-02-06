import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { formSchema } from "./org-form";
import { CreateOrgForm } from "./create-org-form";

export async function CreateOrgDialog(props: { token: string }) {
  // const org = await getOrgById(props.orgId, props.token);

  const createOrg = async (values: z.infer<typeof formSchema>) => {
    "use server";
    console.log("server values", values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await fetch(`http://localhost:8080/api/org`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("okokok");
      revalidatePath("/merchant/org");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Org</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Org</DialogTitle>
        </DialogHeader>
        <CreateOrgForm create={createOrg} />
      </DialogContent>
    </Dialog>
  );
}
