import { Org } from "@/types";

export function TappayInit(org: Org) {
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
}

export async function GetPrime(
  setLoading: (v: boolean) => void,
  callback: (prime: string) => Promise<void>
) {
  const tappayStatus = TPDirect.card.getTappayFieldsStatus();
  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false) {
    alert("請確認信用卡資訊");
    // setLoading(false);
    return;
  }

  // Get prime
  TPDirect.card.getPrime(async (result: any) => {
    if (result.status !== 0) {
      alert("get prime error " + result.msg);
      setLoading(false);
      return;
    }
    await callback(result.card.prime);
    setLoading(false);
    // send prime to your server, to pay with Pay by Prime API .
    // Pay By Prime Docs: https://docs.tappaysdk.com/tutorial/zh/back.html#pay-by-prime-api
  });
}
