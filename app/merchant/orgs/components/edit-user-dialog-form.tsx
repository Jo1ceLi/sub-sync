"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditUserProfileForm } from "./user-form";

export default function EditUserProfileDialogForm({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);

  return (
    <Dialog
      open={showEditProfileDialog}
      onOpenChange={setShowEditProfileDialog}
    >
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>

        <EditUserProfileForm
          user={user}
          onOpenChange={setShowEditProfileDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
