"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCard from "@/app/client/components/create-card-card";
import { useState } from "react";

export function CreateCardDialog({
  org,
  createcardaction,
  session,
}: {
  org: any;
  createcardaction: any;
  session: any;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          新增付款方式
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="h-2" />
        <CreateCard
          org={org}
          createcardaction={createcardaction}
          user={session?.user}
        />
      </DialogContent>
    </Dialog>
  );
}
