"use client";

import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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
import { Pricing } from "@/types";

export function CoursePricingCombobox({ pricing }: { pricing: Pricing[] }) {
  const formatPriceString = (price: Pricing) =>
    `$${price.price} / ${price.session_count}堂`;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Pricing>();

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
