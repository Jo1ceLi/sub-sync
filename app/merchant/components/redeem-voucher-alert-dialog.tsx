"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { redeemVoucher } from "@/app/merchant/components/actions/redeem-voucher";
import { toast } from "sonner";

export function RedeemVoucherAlertDialog({
  clientId,
  orgId,
  voucherId,
}: {
  clientId: string;
  orgId: string;
  voucherId: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">兌換</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確定兌換?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const status = await redeemVoucher({
                clientId,
                orgId,
                voucherId: voucherId,
              });
              if (status === 200) {
                toast.success("兌換成功");
              }
            }}
          >
            兌換
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
