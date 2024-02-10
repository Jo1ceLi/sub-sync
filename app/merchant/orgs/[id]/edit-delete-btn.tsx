"use client";
import { Button } from "@/registry/new-york/ui/button";
import { usePathname, useRouter } from "next/navigation";

import { MouseEventHandler } from "react";

type Props = {
  pid?: string;
  text?: string;
};

export default function EditDeleteBtn(props: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const clickSubscribe: MouseEventHandler<HTMLButtonElement> | undefined = (
    e
  ) => {
    e.preventDefault();
    console.log("testing", props.pid);
  };
  return (
    <>
      <Button onClick={clickSubscribe}>編輯</Button>
      <Button onClick={clickSubscribe}>刪除</Button>
    </>
  );
}
