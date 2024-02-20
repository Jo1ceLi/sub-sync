"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function LogoutBtn({
  logoutaction,
}: {
  logoutaction: () => void;
}) {
  return (
    <DropdownMenuItem>
      <button
        onClick={(e) => {
          e.preventDefault();
          logoutaction();
        }}
      >
        Logout
      </button>
    </DropdownMenuItem>
  );
}
