"use client";

import { useQRCode } from "next-qrcode";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function JoinOrgQRCode(props: { hostname: string }) {
  const { Canvas } = useQRCode();

  const pathname = usePathname();

  const joinURL = useMemo(() => {
    const orgId = pathname.split("/orgs/")[1].split("/")[0];
    return `/client/orgs/${orgId}/join`;
  }, [pathname]);

  return (
    <Canvas
      text={props.hostname + joinURL}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }}
    />
  );
}
