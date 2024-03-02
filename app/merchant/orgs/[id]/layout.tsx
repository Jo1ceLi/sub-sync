import { Metadata } from "next";
import Image from "next/image";

import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "../components/main-nav";
import { UserNav } from "../components/user-nav";
import TeamSwitcher from "../components/team-switcher";
import Link from "next/link";
import { MobileNav } from "../../components/mobile-nav";
import { useAuth } from "@/app/api/[auth]/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const currentUrl = `/merchant/orgs/${params.id}`;
  const session = await useAuth("user");
  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <Link className="md:hidden flex h-16 items-center pl-4" href="#">
            <MobileNav currentUrl={currentUrl} />
            <span className="sr-only">Home</span>
          </Link>
          <div className="hidden md:flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav user={session?.user} />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  );
}
