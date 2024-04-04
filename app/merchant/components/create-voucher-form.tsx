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
import { usePathname } from "next/navigation";
import { set, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const createVoucherFormSchema = z.object({
  title: z.string().max(20),
  description: z.string(),
  pricing: z.array(
    z.object({
      price: z.coerce.number(),
      session_count: z.coerce.number(),
    })
  ),
});

export function CreateVoucherForm({
  action,
  setOpen,
}: {
  action: (...args: any) => Promise<void>;
  setOpen?: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof createVoucherFormSchema>>({
    resolver: zodResolver(createVoucherFormSchema),
    defaultValues: {
      title: "",
      description: "",
      pricing: [
        {
          price: 5000,
          session_count: 3,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "pricing",
  });

  const pathname = usePathname();
  const orgId = pathname.split("/orgs/")[1].split("/")[0];

  const handleSubmit = async (
    values: z.infer<typeof createVoucherFormSchema>
  ) => {
    await action(orgId, values);
    setOpen!(false);
  };

  const handleAddPricing = () => {
    setPricingInputCount((prev) => prev + 1);
  };

  const handleDeletePricing = () => {
    setPricingInputCount((prev) => prev - 1);
  };

  const [pricingInputCount, setPricingInputCount] = useState(1);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>課程標題</FormLabel>
              <FormControl>
                <Input placeholder="課程標題" {...field} />
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
              <FormLabel>課程內容</FormLabel>
              <FormControl>
                <Input placeholder="課程內容" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-y-2">
          {Array.from({ length: pricingInputCount }).map((_, index) => (
            <div className="flex" key={index}>
              <FormField
                control={form.control}
                name={`pricing.${index}.price`}
                render={({ field }) => (
                  <FormItem className="mr-2">
                    {index === 0 && <FormLabel>金額</FormLabel>}
                    <FormControl>
                      <Input type="number" placeholder="金額" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`pricing.${index}.session_count`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>堂數</FormLabel>}
                    <div className="flex items-center">
                      <FormControl>
                        <Input type="number" placeholder="堂數" {...field} />
                      </FormControl>
                      {index === 0 ? (
                        <p className="mx-2">堂</p>
                      ) : (
                        <Button
                          className="w-6 ml-1 mr-1"
                          onClick={handleDeletePricing}
                          type="button"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          <TrashIcon className="w-6 h-6" />
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-row-reverse">
          <Button
            className="w-6 ml-1 mr-1"
            onClick={handleAddPricing}
            type="button"
            size={"icon"}
            variant={"ghost"}
          >
            <PlusCircledIcon className="w-6 h-6" />
          </Button>
        </div>

        <Button type="submit">送出</Button>
      </form>
    </Form>
  );
}
