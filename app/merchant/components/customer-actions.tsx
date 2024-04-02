"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editCustomer } from "./actions/edit-customer";
import { toast } from "sonner";

export function EditCustomerDialog({
  orgId,
  cid,
  customerInfo,
  children,
}: {
  orgId: string;
  cid: string;
  customerInfo: { name: string; note: string; email: string; phone: string };
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().optional(),
    note: z.string().optional(),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customerInfo.name,
      note: customerInfo.note,
      email: customerInfo.email,
      phone: customerInfo.phone,
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const status = await editCustomer(orgId, cid, data);
    if (status === 200) {
      setOpen(false);
      toast.success("顧客資料已更新");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編輯顧客</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="姓名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>電話</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="電話" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      required={false}
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>備註</FormLabel>
                  <FormControl>
                    <Input required={false} placeholder="備註" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <Button type="submit">儲存</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CustomerActions({
  orgId,
  cid: cid,
}: {
  orgId: string;
  cid: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>動作</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/merchant/orgs/${orgId}/customers/${cid}`}>
            查看顧客資料
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem>編輯顧客資料</DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
