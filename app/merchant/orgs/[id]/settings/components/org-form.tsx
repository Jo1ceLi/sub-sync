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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Org, formSchema } from "../../../org-form";
import { Separator } from "@/components/ui/separator";

export function OrgForm({
  org,
  action,
}: {
  org?: Org | null;
  action: (...args: any) => Promise<void>;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: org?.name,
      description: org?.description,
      app_id: org?.app_id,
      app_key: org?.app_key,
      partner_key: org?.partner_key,
      non_3D_mid: org?.non_3D_mid,
      mid_with_3D: org?.mid_with_3D,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (org) {
      await action(org.id, values);
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
              <FormLabel>公司名稱</FormLabel>
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
              <FormLabel>公司簡介</FormLabel>
              <FormControl>
                <Input placeholder="OrgDesc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {org === null ? (
          <></>
        ) : (
          <div>
            <Separator className="my-5" />

            <div className="mb-5 space-y-1">
              <h4 className="text-sm font-medium leading-none">
                TapPay金流設定
              </h4>
              <p className="text-sm text-muted-foreground">
                請至 TapPay 商家後台取得相關金流設定資訊
              </p>
            </div>
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
          </div>
        )}
        <Button type="submit">儲存</Button>
      </form>
    </Form>
  );
}
