import { Card } from "@/types";
import { Icons } from "./icons";
import { DeleteCardButton } from "@/app/client/components/delete-card-btn";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export function CreditCard({ card, params }: { card: Card; params: any }) {
  const deleteCardAction = async (id: string) => {
    "use server";
    const token = cookies().get("ctoken");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}/cards/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        revalidatePath("/client/orgs/" + oid);
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-[#091e49] to-[#070319] rounded-xl p-6 w-[440px] h-[280px] text-white shadow-xl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <div className="text-white h-3 w-6"></div>
          <span className="font-semibold text-lg mt-1">{card.alias}</span>
        </div>
        <div className="text-white h-8 w-auto">{card.network}</div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Icons.creditCard className="text-white h-12 w-16" />
        <DeleteCardButton id={card.id} deletecard={deleteCardAction} text="" />
      </div>
      <div className="mt-6 text-2xl font-medium space-x-3">
        <span>****</span>
        <span>****</span>
        <span>****</span>
        <span>{card.last_four}</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm font-medium">{"YOUR_NAME"}</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-medium block">VALID THRU</span>
          <span className="text-sm font-medium">{card.expiry}</span>
        </div>
      </div>
      <div className="text-right mt-2 text-xs font-medium">{card.funding}</div>
    </div>
  );
}
