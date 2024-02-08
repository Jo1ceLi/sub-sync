"use client";

import { Button } from "@/registry/new-york/ui/button";

export function JoinButton({
  oid,
  join,
}: {
  oid: string;
  join: () => Promise<void>;
}) {
  const onJoin = async () => {
    await join();
  };
  return <Button onClick={onJoin}>JOIN!</Button>;
}
