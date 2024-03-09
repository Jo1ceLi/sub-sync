"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/registry/new-york/ui/button";
import { useState } from "react";
import { Org, OrgForm } from "./org-form";

export function OrgDialog({
  org,
  action,
}: Readonly<{
  org: Org | null;
  action: (...args: any) => Promise<any>;
}>) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{org ? "編輯" : "新增"}組織</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{org ? "編輯" : "新增"}組織</DialogTitle>
        </DialogHeader>

        <OrgForm org={org} action={action} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
