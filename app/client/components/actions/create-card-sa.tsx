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

export const purchaseCourse = async ({
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
