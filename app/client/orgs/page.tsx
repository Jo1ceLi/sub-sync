import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import LogoutBtn from "@/components/logout-btn";
import { Title } from "@/app/client/orgs/[id]/title";
import { getAuth } from "@/app/api/[auth]/auth";
import { cookies } from "next/headers";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Org } from "@/app/merchant/orgs/org-form";
import { Suspense } from "react";

export const clientGetOrgs = async () => {
  const session = await getAuth("client");
  if (!session) return [];

  const resp = await fetch(`${process.env.BACKEND_HOST}/api/client/orgs`, {
    headers: {
      Authorization: "Bearer " + session.token,
      "Content-Type": "application/json",
    },
  });
  if (resp.ok) {
    return (await resp.json()) as Org[];
  }
  return [];
};

export default async function Orgs() {
  const session = await getAuth("client");

  const logoutaction = async () => {
    "use server";
    cookies().delete("ctoken");
  };

  const orgs = await clientGetOrgs();

  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white shadow shrink-0 px-6 dark:bg-gray-900/90 dark:border-gray-800/90">
        <Link className="lg:hidden" href="#">
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex-1">
          <Title />
        </div>
        <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src={session?.user.picture as string}
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSeparator />
              <LogoutBtn logoutaction={logoutaction} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <OrgCard orgs={orgs} userType="client" />
        </div>
      </main>
    </>
  );
}

export function OrgCard({
  orgs,
  userType,
}: {
  orgs: Org[];
  userType: "client" | "merchant";
}) {
  return (
    <Suspense fallback={"Loading..."}>
      {orgs.length === 0 && <Card className="min-h-[250px]">No orgs</Card>}
      {orgs.map((org) => (
        <Card
          key={org.id}
          className="min-h-[250px] hover:bg-slate-100 flex items-center"
        >
          <Link href={`/${userType}/orgs/${org.id}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{org.name}</CardTitle>
              <CardDescription className="text-xl">
                {org.description}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
    </Suspense>
  );
}
