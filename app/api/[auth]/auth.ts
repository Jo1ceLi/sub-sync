import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
  user: {
    name: string;
    email: string;
    phone: string;
    picture: string;
  };
  expires: string;
  token: string;
};

export const useAuth = async (
  type: "user" | "client"
): Promise<Session | undefined> => {
  if (type === "user") {
    const token = cookies().get("utoken");
    if (token) {
      const resp = await fetch(`${process.env.BACKEND_HOST}/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      if (resp.ok) {
        const session: Session = {
          ...(await resp.json()),
          token: token.value,
        };
        return session;
      }
      return redirect("/merchant/login");
    }
  } else if (type === "client") {
    const token = cookies().get("ctoken");
    if (token) {
      const resp = await fetch(`${process.env.BACKEND_HOST}/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      if (resp.ok) {
        const session: Session = {
          ...(await resp.json()),
          token: token.value,
        };
        return session;
      }
      return redirect("/client/login");
    }
  }
};
