"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps & {
  loginurl: string;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  async function googleLogin(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    //redirect to google auth
    event.preventDefault();
    setIsLoading(true);
    router.push(props.loginurl);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={googleLogin}
      >
        {<Icons.google className="mr-2 h-4 w-4" />}
        Google
      </Button>
    </div>
  );
}
