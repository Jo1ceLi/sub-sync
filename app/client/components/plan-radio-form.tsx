"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card as CardType, Plan } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreditCardPure from "@/components/credit-card-pure";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Icons } from "@/components/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const FormSchema = z.object({
  planId: z.string(),
  cardId: z.string(),
});

export function PlanRadioGroupForm({
  plans,
  cards,
  subscribeAction,
}: {
  plans: Plan[];
  cards: CardType[] | undefined;
  subscribeAction: (values: z.infer<typeof FormSchema>) => Promise<number>;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const status = await subscribeAction(data);

    if (status === 200) {
      // TODO
      // alert("訂閱成功");
    }
    setLoading(false);
  }

  const path = usePathname();
  const billingHref = path.split("subscriptions")[0] + "billing";
  const [loading, setLoading] = useState(false);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // className="m-5 p-5 flex flex-1 justify-evenly "
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className="m-2 p-5">
          <CardContent>
            <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>選擇方案</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {plans.map((p) => (
                        <FormItem
                          key={p.id}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={p.id} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            <Card
                              key={p.id}
                              className="bg-white w-[270px] h-[200px]"
                            >
                              <CardHeader className="">
                                <CardTitle>{p.name}</CardTitle>
                              </CardHeader>
                              <CardContent className=" h-[200px]">
                                <>
                                  <h1 className="text-3xl mb-2">
                                    ${p.amount}
                                    <span className="text-sm">
                                      /{p.interval}天
                                    </span>
                                  </h1>
                                </>
                                {p.description.split("- ").map((d, idx) => {
                                  if (idx === 0) {
                                    return null;
                                  } else {
                                    return (
                                      <p key={idx} className="text-neutral-600">
                                        - {d}
                                      </p>
                                    );
                                  }
                                })}
                              </CardContent>
                            </Card>
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </div>
        <div className="m-2 p-5">
          <CardContent>
            <FormField
              control={form.control}
              name="cardId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>付款方式</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {cards && cards.length > 0 ? (
                        cards.map((c) => (
                          <FormItem
                            key={c.id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={c.id} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              <CreditCardPure card={c} />
                            </FormLabel>
                          </FormItem>
                        ))
                      ) : (
                        <Button asChild variant={"outline"}>
                          <Link href={billingHref}>請先新增卡片</Link>
                        </Button>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </div>
        {/* TODO: BILLING */}
        {cards && cards?.length > 0 && (
          <div className="flex">
            <Button disabled={loading} type="submit">
              訂閱
              <span className={twMerge("ml-2 hidden", loading && "block")}>
                <Icons.spinner className="animate-spin" />
              </span>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
