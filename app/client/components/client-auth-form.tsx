"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { permanentRedirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ClientAuthForm({
  className,
  ...props
}: UserAuthFormProps & { redirecturl: string }) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();
  async function lineLogin(event: React.SyntheticEvent) {
    //redirect to google auth
    event.preventDefault();
    setIsLoading(true);
    router.push(
      `process.env.BACKEND_HOST/api/auth/login/line?redirect_url=${props.redirecturl}`
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={lineLogin}
      >
        {<Icons.line className="mr-2 h-5 w-5" />}
        LINE
      </Button>
    </div>
  );
}
