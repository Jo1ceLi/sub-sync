"use client";

import { Button } from "@/registry/new-york/ui/button";

export function JoinButton({ join }: { join: () => Promise<void> }) {
  const onJoin = async () => {
    await join();
  };
  return <Button onClick={onJoin}>JOIN!</Button>;
}
