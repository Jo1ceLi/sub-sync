import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useAuth } from "@/app/api/[auth]/auth";
import { Icons } from "@/components/icons";
import LogoutBtn from "@/components/logout-btn";
import { cookies } from "next/headers";
import { MobileNav } from "@/components/mobile-nav";
import Sidebar from "@/app/client/components/sidebar";

export default async function ClientPageLayout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUrl = `/client/orgs/${params.id}`;
  const session = await useAuth("client");

  const logoutaction = async () => {
    "use server";
    cookies().delete("ctoken");
  };

  return (
    <>
      <div className="grid min-h-screen w-full overflow-hidden bg-gray-100/40 md:grid-cols-[280px_1fr] dark:bg-gray-800/40">
        <Sidebar currentUrl={currentUrl} />
        <div className="flex flex-col">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-white shadow shrink-0 px-6 dark:bg-gray-900/90 dark:border-gray-800/90">
            <Link className="lg:hidden" href="#">
              <MobileNav currentUrl={currentUrl} />
              {/* <Icons.package2 className="w-6 h-6" /> */}
              <span className="sr-only">Home</span>
            </Link>
            <div className="flex-1">
              <h1 className="font-semibold text-lg">{"TTTTTT"}</h1>
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
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <LogoutBtn logoutaction={logoutaction} />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </div>
      </div>
    </>
  );
}
