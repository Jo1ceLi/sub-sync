import { Button } from "@/registry/new-york/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";
import { JoinButton } from "../../join-btn";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const joinAction = async () => {
    "use server";
    const token = cookies().get("token");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `http://localhost:8080/api/client/join/orgs/${oid}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        redirect(`/client/orgs/${oid}`);
      }
    }
  };

  const getOrgById = async () => {
    const oid = params["id"];
    const token = cookies().get("token");
    if (oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${oid}`,
        {
          headers: { Authorization: "Bearer " + token!.value },
        }
      );
      return await res.json();
    }
  };

  const getOrgsByClientToken = async () => {
    const token = cookies().get("token");
    if (token) {
      const res = await fetch(`${process.env.BACKEND_HOST}/api/client/org`, {
        headers: { Authorization: "Bearer " + token.value },
      });
      const orgs = (await res.json()) as any[];
      const oid = params.id;
      if (orgs.some((o: any) => o.id === oid)) {
        redirect(`/client/orgs/${oid}`);
      }
    }
  };

  const org = await getOrgById();
  await getOrgsByClientToken();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          YOU ARE INVITED TO {org.name}&nbsp;
          {/* <code className="font-mono font-bold">app/page.tsx</code> */}
          <JoinButton join={joinAction} />
        </p>
        {/* <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div> */}
      </div>
    </main>
  );
}

// https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz
