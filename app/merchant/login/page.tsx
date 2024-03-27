import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "@/app/merchant/components/user-auth-form";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
  const loginurl = `${process.env.BACKEND_HOST}/api/auth/login/google`;
  const deletecookieaction = async () => {
    "use server";
    cookies().delete("utoken");
  };
  return (
    <>
      <div className="container relative flex min-h-dvh flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Sub Sync Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;在用過Sub-Sync後,
                管理事業再也不是那個令人苦惱的麻煩事.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">登入</h1>
              {/* <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p> */}
            </div>
            <UserAuthForm
              loginurl={loginurl}
              deletecookieaction={deletecookieaction}
            />
            <p className="px-8 text-center text-sm text-muted-foreground">
              繼續登入等同您同意Sub-Sync的
              <p>
                <Link
                  className="underline underline-offset-2"
                  href="https://www.privacypolicies.com/live/0493ba7d-5827-4602-a2f9-ac77f81df26e"
                >
                  使用條款和隱私權政策
                </Link>
                .
              </p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
