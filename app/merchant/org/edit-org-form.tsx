"use client";

import { z } from "zod";
import { Org } from "./edit-org-dialog";
import { OrgForm, formSchema } from "./org-form";

export function EditOrgForm({
  org,
  update,
}: {
  org: Org;
  update: (values: z.infer<typeof formSchema>) => Promise<void>;
}) {
  return <OrgForm org={org} action={update} />;
}
