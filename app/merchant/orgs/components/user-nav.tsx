import UserDropdownmenu from "./user-dropdownmenu";
import EditUserProfileDialogForm from "./edit-user-dialog-form";
import { getAuth } from "@/app/api/[auth]/auth";

export async function UserNav() {
  const session = await getAuth("user");

  return (
    <EditUserProfileDialogForm user={session?.user}>
      <UserDropdownmenu />
    </EditUserProfileDialogForm>
  );
}
