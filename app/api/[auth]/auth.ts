import { cookies } from "next/headers";

export type Session = {
  user: {
    name: string;
    email: string;
    picture: string;
  };
  expires: string;
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
      return (await resp.json()) as Session;
    }
  } else if (type === "client") {
    const token = cookies().get("ctoken");
    if (token) {
      const resp = await fetch(`${process.env.BACKEND_HOST}/api/auth/me`, {
        headers: {
          Authorization: "Bearer " + token.value,
        },
      });
      return (await resp.json()) as Session;
    }
  }
  return undefined;
};