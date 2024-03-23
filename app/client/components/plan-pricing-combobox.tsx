"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card as CardType, Org } from "@/types";
import { Icons } from "@/components/icons";
import { z } from "zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  subscribePlanUsingExistingCard,
  subscribePlanUsingNewCard,
} from "./actions/create-card-sa";
import { useRouter } from "next/navigation";
import { CardPopover, NewPayment } from "./course-pricing-combobox";
import { GetPrime } from "./tappay-func";

export function PlanPricingCombobox({
  cards,
  org,
  planId,
}: {
  cards: CardType[] | undefined;
  org: Org;
  planId: string | undefined;
}) {
  const [openPricing, setOpenPricing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openCard, setOpenCard] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>();

  const existCardSchema = z.object({
    cardId: z.string({
      required_error: "請選擇付款方式",
    }),
  });

  const newCardSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    alias: z.string().optional(),
  });

  const schema = z.union([existCardSchema, newCardSchema]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof schema>) {
    if (planId && "cardId" in data) {
      //if purchase success redir to billing page
      setLoading(true);
      const status = await subscribePlanUsingExistingCard({
        planId,
        orgId: org.id,
        data,
      });
      if (status === 200) {
        toast.success("購買成功");
        router.push(`/client/orgs/${org.id}/billing`);
      } else {
        toast.error("購買失敗");
      }
    } else if (planId && "name" in data) {
      const callback = async (prime: string) => {
        const status = await subscribePlanUsingNewCard({
          orgId: org.id,
          planId,
          data: {
            alias: data.alias,
            cardholder: {
              name: data.name,
              phone_number: data.phone,
            },
            prime,
          },
        });
        if (status === 200) {
          toast.success("訂閱成功");
          router.push(`/client/orgs/${org.id}/billing`);
        } else {
          toast.error("訂閱失敗");
          router.push(`/client/orgs/${org.id}`);
        }
      };
      await GetPrime(setLoading, callback);
      //
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-y-3">
          <FormField
            control={form.control}
            name="cardId"
            render={({ field }) => (
              <FormItem>
                {cards && !newPayment && (
                  <CardPopover
                    open={openCard}
                    setOpen={setOpenCard}
                    setNewPayment={setNewPayment}
                    cards={cards}
                    value={selectedCard}
                    setValue={setSelectedCard}
                    form={form}
                  />
                )}
                {newPayment && (
                  <NewPayment
                    org={org}
                    setNewPayment={setNewPayment}
                    form={form}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="w-full" type="submit">
            訂閱
            <span className={cn("ml-2 hidden", loading && "block")}>
              <Icons.spinner className="animate-spin" />
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
