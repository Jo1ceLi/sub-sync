"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { cloneElement, useState } from "react";

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DialogParent({
  text,
  className,
  children,
}: DialogProps & { text: string; children: React.ReactElement }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)} variant="outline">
          {text}
        </Button>
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
