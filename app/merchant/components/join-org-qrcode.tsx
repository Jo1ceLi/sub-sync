"use client";

import { useQRCode } from "next-qrcode";
import { usePathname } from "next/navigation";

export default function JoinOrgQRCode(props: { hostname: string }) {
  const { Canvas } = useQRCode();

  const params = usePathname();
  console.log(props.hostname + params);
  return (
    <Canvas
      text={props.hostname + params}
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
