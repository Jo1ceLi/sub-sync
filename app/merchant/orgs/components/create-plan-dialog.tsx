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
import { PlanForm } from "./plan-form";

export function CreatePlanDialog({
  action,
}: {
  action: (...args: any) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Plan</DialogTitle>
        </DialogHeader>
        <PlanForm action={action} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
