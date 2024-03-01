"use client";

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
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@radix-ui/react-label";
import { PlanForm } from "../orgs/components/plan-form";
import { useState } from "react";
import { Plan } from "@/types";

export function EditPlanDialog({
  plan,
  action,
}: {
  plan: Plan;
  action: (...args: any) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          編輯方案
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編輯方案</DialogTitle>
          <DialogDescription>
            <h4 className="text-base text-red-500">
              請注意：<p>編輯方案後，所有訂閱此方案的用戶將會受到影響。</p>
            </h4>
          </DialogDescription>
        </DialogHeader>
        <PlanForm action={action} setOpen={setOpen} plan={plan} />
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
