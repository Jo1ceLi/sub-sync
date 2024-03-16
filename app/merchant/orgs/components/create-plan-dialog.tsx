"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/registry/new-york/ui/button";
import { cloneElement, useState } from "react";

export function CreatePlanDialog({
  text,
  children,
}: {
  text: string;
  children: any;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{text}</DialogTitle>
        </DialogHeader>
        {cloneElement(children, { setOpen })}
      </DialogContent>
    </Dialog>
  );
}
