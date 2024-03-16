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
import CreateCard from "./create-card-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Script from "next/script";
import { GetPrime, TappayInit } from "./tappay-func";
import { Icons } from "@/components/icons";

export function CoursePricingCombobox({
  pricing,
  cards,
  org,
}: {
  pricing: Pricing[];
  cards: CardType[] | undefined;
  org: Org;
}) {
  const [openPricing, setOpenPricing] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<Pricing>();

  const [openCard, setOpenCard] = useState(false);
  const [newPayment, setNewPayment] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType>();

  return (
    <div className="flex flex-col items-center gap-y-3">
      <PricingPopover
        open={openPricing}
        setOpen={setOpenPricing}
        value={selectedPricing}
        setValue={setSelectedPricing}
        pricing={pricing}
      />
      {cards && !newPayment && cards.length > 0 && (
        <CardPopover
          open={openCard}
          setOpen={setOpenCard}
          value={selectedCard}
          setValue={setSelectedCard}
          setNewPayment={setNewPayment}
          cards={cards}
        />
      )}
      {newPayment && <NewPayment org={org} setNewPayment={setNewPayment} />}
      {/* // <CreateCard createcardaction={() => {}} org={org} user={undefined} /> */}
    </div>
  );
}

function PricingPopover({
  open,
  setOpen,
  value,
  setValue,
  pricing,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: Pricing | undefined;
  setValue: (value: Pricing) => void;
  pricing: Pricing[];
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
          {value ? formatPriceString(value) : "選擇課程..."}
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
                  setValue(p);
                  setOpen(false);
                }}
              >
                {formatPriceString(p)}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === p ? "opacity-100" : "opacity-0"
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

function CardPopover({
  open,
  setOpen,
  value,
  setValue,
  setNewPayment,
  cards,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  value: CardType | undefined;
  setValue: (value: CardType) => void;
  setNewPayment: (value: boolean) => void;
  cards: CardType[] | undefined;
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
          {value ? formatCardString(value) : "選擇卡片..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜尋卡片..." className="h-9" />
          <CommandEmpty>找不到課程</CommandEmpty>
          <CommandGroup>
            {cards &&
              cards.map((card, idx) => (
                <CommandItem
                  key={idx}
                  value={formatCardString(card)}
                  onSelect={() => {
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

function NewPayment({
  org,
  setNewPayment,
}: {
  org: Org;
  setNewPayment: (value: boolean) => void;
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
          <Label>姓名</Label>
          <Input
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="姓名"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Label>電話</Label>
          <Input
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="電話"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Label>信用卡別名</Label>
          <Input
            className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
            placeholder="幫信用卡取個名字吧"
            onChange={(e) => setAlias(e.target.value)}
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
      <CardFooter>
        <Button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            GetPrime(setLoading, () => new Promise(() => undefined));
          }}
          className="w-full"
        >
          新增
          <span className={cn("ml-2 hidden", loading && "block")}>
            <Icons.spinner className="animate-spin" />
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
