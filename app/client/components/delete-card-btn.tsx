"use client";
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

export function DeleteCardButton({
  id,
  text,
  deletecard,
}: {
  id: string;
  text: string;
  deletecard: (id: string) => Promise<void>;
}) {
  const onClick = async () => {
    await deletecard(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-slate-900" variant={"outline"}>
          刪除卡片
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your card
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>刪除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
