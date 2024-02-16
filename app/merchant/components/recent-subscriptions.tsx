import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default async function RecentSubscriptions() {
  return (
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
                <TableCell className="hidden md:table-cell">Starter</TableCell>
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
                <TableCell className="hidden md:table-cell">Starter</TableCell>
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
                <TableCell className="hidden md:table-cell">Starter</TableCell>
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
  );
}
