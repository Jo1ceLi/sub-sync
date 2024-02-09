"use client";

import { Button } from "@/registry/new-york/ui/button";

export function DeleteCardButton({
  id,
  text,
  deletecard,
}: {
  id: string;
  text: string;
  deletecard: (id: string) => Promise<void>;
}) {
  const onClick = async () => {
    await deletecard(id);
  };
  return <Button onClick={onClick}>{text}</Button>;
}
