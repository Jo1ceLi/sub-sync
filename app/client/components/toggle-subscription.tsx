"use client";
import { TP } from "@/components/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/registry/new-york/ui/button";
import {
  cancelSubscription,
  resumeSubscription,
} from "@/app/client/components/actions/subscription";
import { toast } from "sonner";

export function CancelSubscriptionAlertDialog({
  dueDate,
  orgId,
  planId,
}: {
  dueDate: string;
  orgId: string;
  planId: string;
}) {
  const onClick = async () => {
    const status = await cancelSubscription(orgId, planId);
    if (status === 200) {
      toast.success("取消訂閱成功");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-red-500" variant={"outline"}>
          取消訂閱
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            您的權益將在{dueDate}後失效
            <p>您確定要取消訂閱嗎?</p>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <TP>您可以隨時恢復訂閱</TP>
            <span>不管您的決定如何 我們都希望能提供您更好的服務</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>返回</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>取消訂閱</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ReSubscribeButton({
  orgId,
  planId,
}: {
  orgId: string;
  planId: string;
}) {
  const onClick = async () => {
    const status = await resumeSubscription(orgId, planId);
    if (status === 200) {
      toast.success("恢復訂閱成功");
    }
  };
  return <Button onClick={onClick}>恢復訂閱</Button>;
}
