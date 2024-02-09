"use client";

import { Button } from "@/registry/new-york/ui/button";
import { deleteAction } from "./org-server-action";

export function DeleteOrgBtn({ id }: { id: string }) {
  const deleteOrg = async () => {
    await deleteAction(id);
  };
  return (
    <Button className="ml-2" onClick={deleteOrg}>
      DELETE
    </Button>
  );
}
