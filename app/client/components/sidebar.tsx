"use client";

import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar({
  currentUrl,
  orgName,
}: {
  currentUrl: string;
  orgName: string | undefined;
}) {
  type Seleted = 0 | 1 | 2 | 3 | null;
  const pathname = usePathname();
  const params = pathname.split("/")[pathname.split("/").length - 1];

  const [selected, setSelected] = useState<Seleted>(null); // only 0,1,2,3
  useEffect(() => {
    switch (params) {
      case "subscriptions":
        setSelected(1);
        break;
      case "billing":
        setSelected(2);
        break;
      case "settings":
        setSelected(3);
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
    <div
      id="sidebar"
      className="hidden border-r border-gray-200 md:block dark:border-gray-800"
    >
      <div className="flex flex-col gap-2">
        <div className="flex h-[60px] items-center px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Icons.package2 className="h-6 w-6" />
            <span className="">{orgName}</span>
          </Link>
        </div>
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            onClick={() => setSelected(0)}
            className={selected === 0 ? selectedStyle : nonSelectedStyle}
            href={`${currentUrl}`}
          >
            <Icons.home className="h-4 w-4" />
            Home
          </Link>
          <Link
            onClick={() => setSelected(1)}
            className={selected === 1 ? selectedStyle : nonSelectedStyle}
            href={`${currentUrl}/subscriptions`}
          >
            <Icons.users className="h-4 w-4" />
            Subscriptions
          </Link>
          <Link
            onClick={() => setSelected(2)}
            className={selected === 2 ? selectedStyle : nonSelectedStyle}
            href={`${currentUrl}/billing`}
          >
            <Icons.creditCard className="h-4 w-4" />
            Billing
          </Link>
          <Link
            onClick={() => setSelected(3)}
            className={selected === 3 ? selectedStyle : nonSelectedStyle}
            href={`${currentUrl}/settings`}
          >
            <Icons.settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </div>
    </div>
  );
}
