"use client";

import { useState } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Card as CardType, Org, Pricing } from "@/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import { GetPrime, TappayInit } from "@/app/client/components/tappay-func";
import { Icons } from "@/components/icons";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  purchaseVoucherUsingExistingCard,
  purchaseVoucherUsingNewCard,
} from "@/app/client/components/actions/payment";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export function VoucherPricingCombobox({
  pricing,
  cards,
  org,
  voucherId,
}: {
  pricing: Pricing[];
  cards: CardType[] | undefined;
  org: Org;
  voucherId: string | undefined;
}) {
  const [openPricing, setOpenPricing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openCard, setOpenCard] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>();

  const existCardSchema = z.object({
    pricing: z.object(
      {
        price: z.coerce.number(),
        session_count: z.coerce.number(),
      },
      {
        required_error: "請選擇課程",
      }
    ),
    cardId: z.string({
      required_error: "請選擇付款方式",
    }),
  });

  const newCardSchema = z.object({
    pricing: z.object(
      {
        price: z.coerce.number(),
        session_count: z.coerce.number(),
      },
      {
        required_error: "請選擇課程",
      }
    ),
    name: z.string({
      required_error: "請輸入持卡人姓名",
    }),
    phone: z.string().optional(),
    alias: z.string().optional(),
    remember: z.boolean().default(false),
  });

  const schema = z.union([existCardSchema, newCardSchema]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  async function onSubmit(data: z.infer<typeof schema>) {
    setLoading(true);
    if (voucherId && "cardId" in data) {
      //if purchase success redir to billing page
      const status = await purchaseVoucherUsingExistingCard({
        voucherId: voucherId,
        orgId: org.id,
        data,
      });
      if (status === 200) {
        toast.success("購買成功");
        router.push(`/client/orgs/${org.id}/billing`);
      } else {
        toast.error("購買失敗");
      }
    } else if (voucherId && "remember" in data) {
      const callback = async (prime: string) => {
        const status = await purchaseVoucherUsingNewCard({
          voucherId: voucherId,
          orgId: org.id,
          data: {
            prime: prime,
            pricing: data.pricing,
            alias: data.alias,
            cardholder: {
              name: data.name,
              phone_number: data.phone,
            },
            remember: data.remember,
          },
        });
        if (status === 200) {
          toast.success("購買成功");
          router.push(`/client/orgs/${org.id}/billing`);
        } else {
          toast.error("購買失敗");
          router.push(`/client/orgs/${org.id}`);
        }
      };
      await GetPrime(setLoading, callback);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-y-3">
          <FormField
            control={form.control}
            name="pricing"
            render={({ field }) => (
              <FormItem>
                <PricingPopover
                  open={openPricing}
                  setOpen={setOpenPricing}
                  pricing={pricing}
                  field={field.value}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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

          {newPayment && (
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row w-full items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>記住這張卡片，下次購買時可以直接使用</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          )}

          <Button disabled={loading} className="w-full" type="submit">
            購買
            <span className={cn("ml-2 hidden", loading && "block")}>
              <Icons.spinner className="animate-spin" />
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

function PricingPopover({
  open,
  setOpen,
  pricing,
  field,
  form,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  pricing: Pricing[];
  field: {
    price: number;
    session_count: number;
  };
  form: any;
}) {
  const formatPriceString = (price: Pricing) =>
    `$${price.price} / ${price.session_count}堂`;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field ? formatPriceString(field) : "選擇課程..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜尋課程..." className="h-9" />
          <CommandEmpty>找不到課程</CommandEmpty>
          <CommandGroup>
            {pricing.map((p, idx) => (
              <CommandItem
                key={idx}
                value={formatPriceString(p)}
                onSelect={() => {
                  form.setValue("pricing", p);
                  setOpen(false);
                }}
              >
                {formatPriceString(p)}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    field === p ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function CardPopover({
  open,
  setOpen,
  setNewPayment,
  value,
  setValue,
  cards,
  form,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: CardType | undefined;
  setValue: (value: CardType) => void;
  setNewPayment: (value: boolean) => void;
  cards: CardType[] | undefined;
  form: any;
}) {
  const formatCardString = (card: CardType) =>
    `${card.alias === "" ? card.network : card.alias} ${card.last_four}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? formatCardString(value) : "選擇付款方式..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜尋卡片..." className="h-9" />
          <CommandEmpty>找不到卡片</CommandEmpty>
          <CommandGroup>
            {cards &&
              cards.map((card, idx) => (
                <CommandItem
                  key={idx}
                  value={formatCardString(card)}
                  onSelect={() => {
                    form.setValue("cardId", card.id);
                    setValue(card);
                    setOpen(false);
                  }}
                >
                  {formatCardString(card)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === card ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            <CommandItem
              onSelect={() => {
                setNewPayment(true);
                setOpen(false);
              }}
            >
              新增付款方式
              <PlusCircledIcon className="ml-auto h-4 w-4" />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function NewPayment({
  org,
  setNewPayment,
  form,
}: {
  org: Org;
  setNewPayment: (value: boolean) => void;
  form: any;
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [alias, setAlias] = useState("");

  return (
    <Card className="">
      <CardHeader className="flex flex-row-reverse p-4">
        <Button
          className="p-2"
          onClick={() => setNewPayment(false)}
          variant={"ghost"}
          size={"icon"}
        >
          {/* 使用現有卡片 */}
          <CrossCircledIcon className="h-6 w-6" />
        </Button>
      </CardHeader>
      <CardContent className="">
        <Script
          src={"https://js.tappaysdk.com/sdk/tpdirect/v5.17.1"}
          onReady={() => TappayInit(org)}
        />
        <div className="grid gap-2">
          <Label>持卡人姓名</Label>
          <Input
            required
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="全名"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              form.setValue("name", e.target.value);
            }}
          />

          <Label>電話</Label>
          <Input
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="電話"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              form.setValue("phone", e.target.value);
            }}
          />

          <Label>信用卡別名</Label>
          <Input
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="幫信用卡取個名字吧"
            onChange={(e) => {
              setAlias(e.target.value);
              form.setValue("alias", e.target.value);
            }}
          />

          <Label htmlFor="number">信用卡卡號</Label>
          <div
            className="pl-2 border-2 border-black rounded-lg max-h-8 tpfield"
            id="card-number"
          ></div>

          <Label htmlFor="month">信用卡效期</Label>
          <div
            className="pl-2 border-2 border-black rounded-lg max-h-8 tpfield"
            id="card-expiration-date"
          ></div>

          <Label htmlFor="cvc">CCV</Label>
          <div
            className="pl-2 border-2 border-black rounded-lg max-h-8 tpfield"
            id="card-ccv"
          ></div>
        </div>
      </CardContent>
    </Card>
  );
}
