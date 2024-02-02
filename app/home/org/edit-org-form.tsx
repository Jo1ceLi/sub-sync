"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Org } from "./edit-org-dialog";

const formSchema = z.object({
  name: z.string().max(20),
  description: z.string().max(20),
  app_id: z.string().min(5).max(5),
  app_key: z.string().min(64).max(64),
  partner_key: z.string().min(64).max(64),
  non_3D_mid: z.string(),
  mid_with_3D: z.string(),
});

export function OrgForm(props: { org: Org }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.org.name,
      description: props.org.description,
      app_id: props.org.app_id,
      app_key: props.org.app_key,
      partner_key: props.org.partner_key,
      non_3D_mid: props.org.non_3D_mid,
      mid_with_3D: props.org.mid_with_3D,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="OrgName" {...field} />
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
              <FormLabel>Desc</FormLabel>
              <FormControl>
                <Input placeholder="OrgDesc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="app_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AppId</FormLabel>
              <FormControl>
                <Input placeholder="AppId" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="app_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AppKey</FormLabel>
              <FormControl>
                <Input placeholder="AppKey" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="partner_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PartnerKey</FormLabel>
              <FormControl>
                <Input placeholder="PartnerKey" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="non_3D_mid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>非3D驗證MerchantID</FormLabel>
              <FormControl>
                <Input placeholder="非3D驗證MerchantID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mid_with_3D"
          render={({ field }) => (
            <FormItem>
              <FormLabel>3D驗證MerchantID</FormLabel>
              <FormControl>
                <Input placeholder="3D驗證MerchantID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
