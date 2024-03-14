import { Card } from "@/types";
import { Icons } from "./icons";
import { twMerge } from "tailwind-merge";

export default function CreditCardPure({
  card,
  className: cn,
}: {
  card: Card;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "bg-gradient-to-r from-[#272c36] to-[#070319] rounded-xl p-6  text-white shadow-xl w-[270px] h-[170px]",
        cn
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          {/* <div className="text-white h-1 w-3"></div> */}
          <span className="font-semibold text-sm ">{card.alias}</span>
        </div>
        <div className="text-white h-8 w-auto">{card.network}</div>
      </div>
      <div className="flex justify-between items-center h-2">
        {/* <Icons.creditCard className="text-white h-6 w-8" /> */}
        {/* <DeleteCardButton id={card.id} deletecard={deleteCardAction} text="" /> */}
      </div>
      <div className="mt-3 text-md font-medium space-x-3">
        <span>****</span>
        <span>****</span>
        <span>****</span>
        <span>{card.last_four}</span>
      </div>
      <div className="flex justify-between items-center mt-5">
        <div>
          {/* <span className="text-xs font-medium">{"YOUR_NAME"}</span> */}
        </div>
        <div className="text-right">
          <span className="text-xs font-medium">{`${String(
            card.expiry
          ).substring(0, 4)}/${String(card.expiry).substring(4)}`}</span>
        </div>
      </div>
      {/* <div className="text-right mt-1 text-xs font-medium">{card.funding}</div> */}
    </div>
  );
}
