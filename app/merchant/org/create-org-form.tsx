"use client";

import { z } from "zod";
import { OrgForm, formSchema } from "./org-form";

export function CreateOrgForm({
  create,
}: {
  create: (values: z.infer<typeof formSchema>) => Promise<void>;
}) {
  return <OrgForm action={create} />;
}
