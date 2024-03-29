"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  type Seleted = 0 | 1 | 2 | 3 | 4 | null;
  const pathname = usePathname();

  const [baseUrl, params] = useMemo(() => {
    const params = pathname
      .split("/orgs/")
      [pathname.split("/orgs/").length - 1].split("/")
      .at(1);
    const orgId = pathname.split("/orgs/")[1].split("/")[0];
    const baseUrl = `/merchant/orgs/${orgId}`;
    return [baseUrl, params];
  }, [pathname]);

  const [selected, setSelected] = useState<Seleted>(null); // only 0,1,2,3
  useEffect(() => {
    switch (params) {
      case undefined:
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
    "text-sm font-medium transition-colors hover:text-primary";

  const nonSelectedStyle =
    "text-sm font-medium text-muted-foreground transition-colors hover:text-primary";

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href={`${baseUrl}`}
        onClick={() => setSelected(0)}
        className={selected === 0 ? selectedStyle : nonSelectedStyle}
      >
        儀表板
      </Link>
      <Link
        href={`${baseUrl}/customers`}
        onClick={() => setSelected(1)}
        className={selected === 1 ? selectedStyle : nonSelectedStyle}
      >
        顧客
      </Link>
      <Link
        href={`${baseUrl}/transactions`}
        onClick={() => setSelected(2)}
        className={selected === 2 ? selectedStyle : nonSelectedStyle}
      >
        訂單
      </Link>
      <Link
        href={`${baseUrl}/plans`}
        onClick={() => setSelected(3)}
        className={selected === 3 ? selectedStyle : nonSelectedStyle}
      >
        方案
      </Link>
      <Link
        href={`${baseUrl}/settings`}
        onClick={() => setSelected(3)}
        className={selected === 4 ? selectedStyle : nonSelectedStyle}
      >
        設定
      </Link>
    </nav>
  );
}
