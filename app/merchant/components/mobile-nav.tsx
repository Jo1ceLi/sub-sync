"use client";

import { useEffect, useState } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/registry/new-york/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MobileNav({ currentUrl }: { currentUrl: string }) {
  const [open, setOpen] = useState(false);
  type Seleted = 0 | 1 | 2 | 3 | 4 | null;
  const pathname = usePathname();
  const params = pathname.split("/")[pathname.split("/").length - 1];

  const [selected, setSelected] = useState<Seleted>(0); // only 0,1,2,3
  useEffect(() => {
    switch (params) {
      case "home":
        setSelected(0);
        break;
      case "customers":
        setSelected(1);
        break;
      case "transactions":
        setSelected(2);
        break;
      case "plans":
        setSelected(3);
        break;
      case "settings":
        setSelected(4);
        break;
      default:
        setSelected(0);
    }
  }, [params]);
  const selectedStyle =
    "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50";
  const nonSelectedStyle =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href={currentUrl}
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          {/* <span className="font-bold">{siteConfig.name}</span> */}
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <div className="flex h-[60px] items-center px-6">
              <Link className="flex items-center gap-2 font-semibold" href="#">
                <Icons.package2 className="h-6 w-6" />
                <span className="">Sub-Sync Inc</span>
              </Link>
            </div>
            <nav className="grid items-start px-4 text-sm font-medium">
              <MobileLink
                href={`${currentUrl}`}
                className={selected === 0 ? selectedStyle : nonSelectedStyle}
                onOpenChange={setOpen}
              >
                <Icons.home className="h-4 w-4" />
                首頁
              </MobileLink>
              <MobileLink
                className={selected === 1 ? selectedStyle : nonSelectedStyle}
                href={`${currentUrl}/customers`}
                onOpenChange={setOpen}
              >
                <Icons.users className="h-4 w-4" />
                客戶
              </MobileLink>
              <MobileLink
                className={selected === 2 ? selectedStyle : nonSelectedStyle}
                href={`${currentUrl}/transactions`}
                onOpenChange={setOpen}
              >
                <Icons.package2 className="h-4 w-4" />
                訂單
              </MobileLink>
              <MobileLink
                className={selected === 3 ? selectedStyle : nonSelectedStyle}
                href={`${currentUrl}/plans`}
                onOpenChange={setOpen}
              >
                <Icons.calendar className="h-4 w-4" />
                方案
              </MobileLink>
              <MobileLink
                className={selected === 2 ? selectedStyle : nonSelectedStyle}
                href={`${currentUrl}/settings`}
                onOpenChange={setOpen}
              >
                <Icons.clock className="h-4 w-4" />
                設定
              </MobileLink>
            </nav>
          </div>
          <div className="flex flex-col space-y-2"></div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
