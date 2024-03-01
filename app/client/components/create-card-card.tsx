"use client";

import { Org } from "@/app/merchant/orgs/org-form";
import { Icons } from "@/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@radix-ui/react-label";
import Script from "next/script";
import { FormEvent, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CreateCard({
  org,
  createcardaction,
}: {
  org: Org;
  createcardaction: (prime: string, alias: string) => Promise<any>;
}) {
  const tappayInit = () => {
    const fields = {
      number: {
        // css selector
        element: "#card-number",
        placeholder: "**** **** **** ****",
      },
      expirationDate: {
        // DOM object
        element: document.getElementById("card-expiration-date"),
        placeholder: "MM / YY",
      },
      ccv: {
        element: "#card-ccv",
        placeholder: "ccv",
      },
    };
    TPDirect.setupSDK(
      org.app_id,
      org.app_key,
      process.env.NEXT_PUBLIC_TAPPAY_ENV
    );
    TPDirect.card.setup({
      fields: fields,
      styles: {
        // Style all elements
        input: {
          color: "gray",
        },
        // Styling ccv field
        "input.ccv": {
          "font-size": "16px",
        },
        // Styling expiration-date field
        "input.expiration-date": {
          "font-size": "16px",
        },
        // Styling card-number field
        "input.card-number": {
          "font-size": "16px",
        },
        // style focus state
        ":focus": {
          // 'color': 'black'
        },
        // style valid state
        ".valid": {
          color: "green",
        },
        // style invalid state
        ".invalid": {
          color: "red",
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        "@media screen and (max-width: 400px)": {
          input: {
            color: "orange",
          },
        },
      },
      // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
      isMaskCreditCardNumber: true,
      maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11,
      },
    });
  };
  const getPrime = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("請確認信用卡資訊");
      setLoading(false);
      return;
    }
    // Get prime
    TPDirect.card.getPrime(async (result: any) => {
      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        setLoading(false);
        return;
      }
      // alert("get prime 成功，prime: " + result.card.prime);
      await createcardaction(result.card.prime, alias);
      setLoading(false);
      // send prime to your server, to pay with Pay by Prime API .
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    });
  };

  const [loading, setLoading] = useState(false);
  const [alias, setAlias] = useState("");
  return (
    <>
      <Script
        src={"https://js.tappaysdk.com/sdk/tpdirect/v5.17.1"}
        onReady={() => tappayInit()}
      />
      <Card>
        <CardHeader>
          <CardTitle>新增付款方式</CardTitle>
          <CardDescription>請輸入信用卡資訊，以便進行付款</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-1">
            <Label>信用卡別名</Label>
            <Input
              className="text-base border-2 border-black rounded-lg max-h-8 focus-visible:ring-3"
              placeholder="Alias"
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
          <Button disabled={loading} onClick={getPrime} className="w-full">
            新增
            <span className={twMerge("ml-2 hidden", loading && "block")}>
              <Icons.spinner className="animate-spin" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
