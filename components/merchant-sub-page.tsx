/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/73T9wUxWemk
 */
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import Image from "next/image";

export function MerchantSubPage() {
  return (
    // <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
    //   <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
    //     <div className="flex flex-col gap-2">
    //       <div className="flex h-[60px] items-center px-6">
    //         <Link className="flex items-center gap-2 font-semibold" href="#">
    //           <Icons.package2 className="h-6 w-6" />
    //           <span className="">Acme Inc</span>
    //         </Link>
    //       </div>
    //       <div className="flex-1">
    //         <nav className="grid items-start px-4 text-sm font-medium">
    //           <Link
    //             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    //             href="#"
    //           >
    //             <Icons.home className="h-4 w-4" />
    //             Home
    //           </Link>
    //           <Link
    //             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    //             href="#"
    //           >
    //             <Icons.users className="h-4 w-4" />
    //             Customers
    //           </Link>
    //           <Link
    //             className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
    //             href="#"
    //           >
    //             <Icons.trendingup className="h-4 w-4" />
    //             Subscriptions
    //             <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    //               12
    //             </Badge>
    //           </Link>
    //           <Link
    //             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
    //             href="#"
    //           >
    //             <Icons.creditCard className="h-4 w-4" />
    //             Billing
    //           </Link>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="flex flex-col">
    <>
      {/* <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <Link className="lg:hidden" href="#">
          <Icons.package2 className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="flex-1">
          <h1 className="font-semibold text-lg">Subscription Plans</h1>
        </div>
        <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Icons.search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-white"
                placeholder="Search plans..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="ghost">
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Subscription Plans</CardTitle>
            <CardContent className="text-sm">
              Manage your subscription plans and pricing.
            </CardContent>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
                  <h2 className="font-semibold">Starter</h2>
                  <Button variant="outline">Edit</Button>
                </CardHeader>
                <CardContent className="p-4 grid gap-2">
                  <div className="flex items-center gap-4">
                    <Icons.trendingup className="w-6 h-6" />
                    <div className="grid gap-1.5">
                      <h3 className="font-semibold">Growth</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upgrade to access more features and increase your
                        productivity.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="pl-4 list-disc list-outside">
                      <li>Unlimited email tracking</li>
                      <li>10 email templates</li>
                      <li>Basic reporting</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
                  <h2 className="font-semibold">Pro</h2>
                  <Button variant="outline">Edit</Button>
                </CardHeader>
                <CardContent className="p-4 grid gap-2">
                  <div className="flex items-center gap-4">
                    <Icons.trendingup className="w-6 h-6" />
                    <div className="grid gap-1.5">
                      <h3 className="font-semibold">Growth</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upgrade to access more features and increase your
                        productivity.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="pl-4 list-disc list-outside">
                      <li>Unlimited email tracking</li>
                      <li>10 email templates</li>
                      <li>Basic reporting</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
                  <h2 className="font-semibold">Enterprise</h2>
                  <Button variant="outline">Edit</Button>
                </CardHeader>
                <CardContent className="p-4 grid gap-2">
                  <div className="flex items-center gap-4">
                    <Icons.trendingup className="w-6 h-6" />
                    <div className="grid gap-1.5">
                      <h3 className="font-semibold">Growth</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Upgrade to access more features and increase your
                        productivity.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <h3 className="font-semibold">Features</h3>
                    <ul className="pl-4 list-disc list-outside">
                      <li>Unlimited email tracking</li>
                      <li>10 email templates</li>
                      <li>Basic reporting</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
            <h2 className="font-semibold">Recent Subscriptions</h2>
            <Button variant="outline">Export</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="border-t last:border-b">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead className="min-w-[150px]">Customer</TableHead>
                    <TableHead className="hidden md:table-cell">Plan</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Start Date
                    </TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#3210</TableCell>
                    <TableCell>Olivia Martin</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Starter
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      February 20, 2022
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3209</TableCell>
                    <TableCell>Ava Johnson</TableCell>
                    <TableCell className="hidden md:table-cell">Pro</TableCell>
                    <TableCell className="hidden md:table-cell">
                      January 5, 2022
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3204</TableCell>
                    <TableCell>Michael Johnson</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Enterprise
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      August 3, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3203</TableCell>
                    <TableCell>Lisa Anderson</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Starter
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      July 15, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3202</TableCell>
                    <TableCell>Samantha Green</TableCell>
                    <TableCell className="hidden md:table-cell">Pro</TableCell>
                    <TableCell className="hidden md:table-cell">
                      June 5, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3201</TableCell>
                    <TableCell>Adam Barlow</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Starter
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      May 20, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3207</TableCell>
                    <TableCell>Sophia Anderson</TableCell>
                    <TableCell className="hidden md:table-cell">Pro</TableCell>
                    <TableCell className="hidden md:table-cell">
                      November 2, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#3206</TableCell>
                    <TableCell>Daniel Smith</TableCell>
                    <TableCell className="hidden md:table-cell">
                      Enterprise
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      October 7, 2021
                    </TableCell>
                    <TableCell className="text-right">Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </>

    //   </div>
    // </div>
  );
}
