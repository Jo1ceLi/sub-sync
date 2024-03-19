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
import { subscribePlan } from "./actions/create-card-sa";
import { useRouter } from "next/navigation";
import { CardPopover, NewPayment } from "./course-pricing-combobox";

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

  const FormSchema = z.object({
    cardId: z.string({
      required_error: "請選擇付款方式",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data=", data);
    if (planId) {
      //if purchase success redir to billing page
      setLoading(true);
      const status = await subscribePlan({
        planId,
        orgId: org.id,
        data,
      });
      // const status = 200; //TODO:
      if (status === 200) {
        toast.success("購買成功");
        router.push(`/client/orgs/${org.id}/billing`);
      } else {
        toast.error("購買失敗");
      }
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
                  <NewPayment org={org} setNewPayment={setNewPayment} />
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
