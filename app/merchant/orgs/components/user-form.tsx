"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/registry/new-york/ui/button";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { updateUserProfile } from "./actions/update-user-profile";

export const formSchema = z.object({
  name: z.string(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export function EditUserProfileForm({
  user,
  onOpenChange,
}: {
  user:
    | { name: string; email: string; phone: string; picture: string }
    | undefined;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await updateUserProfile(values);
    if (res === true) {
      onOpenChange(false);
      toast.success("更新成功");
    } else {
      toast.error("更新失敗");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">姓名</FormLabel>
                <FormControl>
                  <Input placeholder="姓名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">手機號碼</FormLabel>
                <FormControl>
                  <Input placeholder="手機號碼" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="pl-1">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit">送出</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
