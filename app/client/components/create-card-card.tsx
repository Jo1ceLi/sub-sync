"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { Label } from "@radix-ui/react-label";
import Script from "next/script";
import { FormEvent } from "react";

export default function CreateCard({
  createcardaction,
}: {
  createcardaction: (prime: string) => Promise<any>;
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
      127916,
      "app_2PmavdqZ17zccOzag9Mgo1ZWDtRqEFYyt0QFQRnufZcF5TlT1HNC4prlBiyG",
      "sandbox"
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
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        "input.expiration-date": {
          // 'font-size': '16px'
        },
        // Styling card-number field
        "input.card-number": {
          // 'font-size': '16px'
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
    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }
    // Get prime
    TPDirect.card.getPrime(async (result: any) => {
      if (result.status !== 0) {
        alert("get prime error " + result.msg);
        return;
      }
      // alert("get prime 成功，prime: " + result.card.prime);
      await createcardaction(result.card.prime);

      // send prime to your server, to pay with Pay by Prime API .
      // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
    });
  };
  return (
    <>
      <Script
        src={"https://js.tappaysdk.com/sdk/tpdirect/v5.17.1"}
        onReady={() => tappayInit()}
      />
      <Card>
        <CardHeader>
          <CardTitle>添加信用卡至{}</CardTitle>
          <CardDescription>
            Add a new payment method to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-1">
            <Label htmlFor="number">Card number</Label>

            <div
              className="pl-2 border-2 border-black rounded-lg max-h-8 tpfield"
              id="card-number"
            ></div>

            <Label htmlFor="month">Expires</Label>
            <div
              className="pl-2 border-2 border-black rounded-lg max-h-8	tpfield"
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
          <Button onClick={getPrime} className="w-full">
            Continue
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
