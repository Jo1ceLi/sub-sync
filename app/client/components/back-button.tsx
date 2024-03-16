"use client";

import { Button } from "@/registry/new-york/ui/button";
import { ResetIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="mt-2"
      variant="outline"
      size="icon"
    >
      <ResetIcon className="h-4 w-4" />
    </Button>
  );
}
