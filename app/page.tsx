import { Landingpage } from "@/components/landingpage";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="sticky bg-white top-0 flex p-6 justify-between">
        <Image
          className="rounded-xl"
          alt="Sub-Sync"
          src={"/icon.png"}
          width={36}
          height={36}
        />

        <Link href="/merchant/login">
          <Button className="rounded-lg" variant={"default"}>
            免費試用
          </Button>
        </Link>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-4  lg:p-24">
        <Landingpage />
      </main>
    </>
  );
}
