import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Customer } from "@/types";

export function MerchantCRM({ customers }: { customers: Customer[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
        <CardDescription>
          Manage your customer subscriptions and view their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div className="font-medium">Alice Chen</div>
                </div>
              </TableCell>
              <TableCell>alice@example.com</TableCell>
              <TableCell>
                <Badge className="bg-green-500" variant="outline">
                  Active
                </Badge>
              </TableCell>
              <TableCell>2023-04-12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div className="font-medium">Bob Johnson</div>
                </div>
              </TableCell>
              <TableCell>bob@example.com</TableCell>
              <TableCell>
                <Badge className="bg-red-500" variant="outline">
                  Expired
                </Badge>
              </TableCell>
              <TableCell>2022-11-30</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div className="font-medium">Eva Lee</div>
                </div>
              </TableCell>
              <TableCell>eva@example.com</TableCell>
              <TableCell>
                <Badge className="bg-yellow-500" variant="outline">
                  Pending
                </Badge>
              </TableCell>
              <TableCell>2023-09-20</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div className="font-medium">Max Smith</div>
                </div>
              </TableCell>
              <TableCell>max@example.com</TableCell>
              <TableCell>
                <Badge className="bg-green-500" variant="outline">
                  Active
                </Badge>
              </TableCell>
              <TableCell>2024-12-01</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-2">
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
                  <div className="font-medium">Sophia Adams</div>
                </div>
              </TableCell>
              <TableCell>sophia@example.com</TableCell>
              <TableCell>
                <Badge className="bg-green-500" variant="outline">
                  Active
                </Badge>
              </TableCell>
              <TableCell>2023-10-15</TableCell>
            </TableRow>
            {customers.map((c) => {
              return (
                <>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          alt="Avatar"
                          className="rounded-full"
                          height="32"
                          src={c.picture}
                          style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                          }}
                          width="32"
                        />
                        <div className="font-medium">{c.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>
                      <Badge className="bg-yellow-500" variant="outline">
                        {c.subscription_status ?? "EMPTY"}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.subscription_renewal_date}</TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
