"use client";

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
import { Plan } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type Org = {
  id: string;
  name: string;
  description: string;
  app_id: string;
  app_key: string;
  partner_key: string;
  non_3D_mid: string;
  mid_with_3D: string;
};

export const formSchema = z.object({
  name: z.string().max(20),
  description: z.string(),
  amount: z.coerce.number(),
  interval: z.coerce.number(),
});

export function PlanForm({
  action,
  setOpen,
  plan,
}: {
  action: (...args: any) => Promise<void>;
  setOpen: (open: boolean) => void;
  plan?: Plan;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plan?.name || "",
      description: plan?.description || "",
      amount: plan?.amount || 199,
      interval: plan?.interval || 30,
    },
  });

  const pathname = usePathname();
  const orgId = pathname.split("/orgs/")[1].split("/")[0];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (plan?.id) {
      await action(orgId, plan.id, values);
      setOpen(false);
    } else {
      await action(orgId, values);
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>方案名稱</FormLabel>
              <FormControl>
                <Input placeholder="Plan Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>方案說明</FormLabel>
              <FormControl>
                <Input placeholder="Plan Desc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>金額</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>週期</FormLabel>
              <div className="flex items-center">
                <FormControl>
                  <Input type="number" placeholder="Interval" {...field} />
                </FormControl>
                <p className="ml-2">天</p>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">送出</Button>
      </form>
    </Form>
  );
}
