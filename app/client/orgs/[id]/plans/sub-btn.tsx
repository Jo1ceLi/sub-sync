"use client";
import { Button } from "@/registry/new-york/ui/button";
import { usePathname, useRouter } from "next/navigation";

import { MouseEventHandler } from "react";

type Props = {
  pid?: string;
  text?: string;
};

export default function SubBtn(props: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const clickSubscribe: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.preventDefault();
    router.push(`${pathname}/${props.pid}`);
  };
  return <Button onClick={clickSubscribe}>訂閱</Button>;
}
