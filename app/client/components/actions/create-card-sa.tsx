"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// export const createcardaction = async (
//   apiInfo: {
//     orgId: string;
//     currentUrl: string;
//   },
//   paymentInfo: {
//     prime: string;
//     name: string | undefined;
//     phone_number: string | undefined;
//     email: string | undefined;
//     alias: string;
//   }
// ) => {
//   "use server";
//   const token = cookies().get("ctoken");
//   if (token && apiInfo.orgId) {
//     const res = await fetch(
//       `${process.env.BACKEND_HOST}/api/client/orgs/${apiInfo.orgId}/cards`,
//       {
//         method: "POST",
//         body: JSON.stringify({
//           alias: paymentInfo.alias,
//           prime: paymentInfo.prime,
//           result_url: {
//             frontend_redirect_url: apiInfo.currentUrl,
//             go_back_url: apiInfo.currentUrl,
//           },
//           cardholder: {
//             phone_number: paymentInfo.phone_number,
//             name: paymentInfo.name,
//             email: paymentInfo.email,
//           },
//         }),
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token.value,
//         },
//       }
//     );
//     if (res.ok) {
//       const body = await res.json();
//       redirect(body.url);
//     }
//   }
// };

export const purchaseCourseUsingExistedCard = async ({
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
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/courses/${courseId}/payment/existing-card`,
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
  data: {
    prime: string;
    pricing: {
      price: number;
      session_count: number;
    };
    cardholder: {
      name: string | undefined;
      phone_number: string | undefined;
      alias: string | undefined;
    };
  };
}) => {
  "use server";
  const token = cookies().get("ctoken");
  if (token) {
    const res = await fetch(
      `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/courses/${courseId}/payment/new-card`,
      {
        method: "POST",
        body: JSON.stringify({ ...data, remember: false }),
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

export const subscribePlan = async ({
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
