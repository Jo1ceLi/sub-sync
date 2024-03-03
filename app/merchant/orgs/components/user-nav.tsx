import UserDropdownmenu from "./user-dropdownmenu";
import EditUserProfileDialogForm from "./edit-user-dialog-form";
import { useAuth } from "@/app/api/[auth]/auth";

export async function UserNav() {
  const session = await useAuth("user");

  return (
    <EditUserProfileDialogForm user={session?.user}>
      <UserDropdownmenu />
    </EditUserProfileDialogForm>
  );
}
