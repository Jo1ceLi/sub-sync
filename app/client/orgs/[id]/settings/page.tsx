import { getAuth } from "@/app/api/[auth]/auth";
import { ClientSettingsForm } from "./components/client-form";

export default async function ClientSettings() {
  const session = await getAuth("client");
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:max-w-2xl">
        <ClientSettingsForm user={session?.user} />
      </div>
    </>
  );
}
