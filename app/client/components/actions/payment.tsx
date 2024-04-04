"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type PaymentWithNewCard = {
  prime: string;
  cardholder: {
    name: string | undefined;
    phone_number: string | undefined;
  };
  alias: string | undefined;
  remember: boolean;
};

export const purchaseCourseUsingExistingCard = async ({
  orgId,
  courseId,
  data,
}: {
  orgId: string;
  courseId: string;
  data: {
    cardId: string;
    pricing: {
      price: number;
      session_count: number;
    };
  };
}) => {
  "use server";
  const token = cookies().get("ctoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/vouchers/${courseId}/payment/existing-card`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      }
    );
    if (res.ok) {
      return res.status;
    }
  }
};

export const purchaseCourseUsingNewCard = async ({
  orgId,
  courseId,
  data,
}: {
  orgId: string;
  courseId: string;
  data: PaymentWithNewCard & {
    pricing: {
      price: number;
      session_count: number;
    };
  };
}) => {
  "use server";
  const token = cookies().get("ctoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/vouchers/${courseId}/payment/new-card`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.value,
        },
      }
    );
    if (res.ok) {
      revalidatePath(`/client/orgs/${orgId}/billing`, "page");
      return res.status;
    }
  }
};

export const subscribePlanUsingExistingCard = async ({
  orgId,
  planId,
  data,
}: {
  orgId: string;
  planId: string;
  data: {
    cardId: string;
  };
}) => {
  "use server";
  const token = cookies().get("ctoken");
  const res = await fetch(
    `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${planId}/subscribe/existing-card`,
    {
      method: "POST",
      body: JSON.stringify({
        cardId: data.cardId,
      }),
      headers: {
        Authorization: "Bearer " + token!.value,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    revalidatePath(`/client/orgs/${orgId}`, "page");
    revalidatePath(`/client/orgs/${orgId}/subscriptions`, "page");
    return res.status;
  }
  return res.status;
};

export const subscribePlanUsingNewCard = async ({
  orgId,
  planId,
  data,
}: {
  orgId: string;
  planId: string;
  data: PaymentWithNewCard;
}) => {
  "use server";
  const token = cookies().get("ctoken");
  const res = await fetch(
    `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/plans/${planId}/subscribe/new-card`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: "Bearer " + token!.value,
        "Content-Type": "application/json",
      },
    }
  );
  if (res.ok) {
    revalidatePath(`/client/orgs/${orgId}`, "page");
    revalidatePath(`/client/orgs/${orgId}/subscriptions`, "page");
    return res.status;
  }
  return res.status;
};
