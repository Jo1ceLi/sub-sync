"use client";

import { usePathname } from "next/navigation";

export function Title() {
  const pathname = usePathname();
  let title = "首頁";
  const params = pathname
    .split("/orgs/")
    [pathname.split("/orgs/").length - 1].split("/")
    .at(1);
  switch (params) {
    case undefined:
      title = "首頁";
      break;
    case "subscriptions":
      title = "訂閱";
      break;
    case "billing":
      title = "帳單";
      break;
    case "settings":
      title = "設定";
      break;
  }
  return <h1 className="font-semibold text-lg">{title}</h1>;
}
