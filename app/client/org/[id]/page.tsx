import { cookies } from "next/headers";
import CreateCard from "../../components/create-card-card";
import { redirect } from "next/navigation";

export default function OrgID({ params }: { params: any }) {
  const createcardaction = async (prime: string) => {
    "use server";
    const token = cookies().get("token");
    const oid = params["id"];
    if (token && oid) {
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/org/${oid}/card`,
        {
          method: "POST",
          body: JSON.stringify({
            prime: prime,
            result_url: {
              frontend_redirect_url: "https://google.com.tw",
              go_back_url: "https://google.com.tw",
            },
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (res.ok) {
        const body = await res.json();
        redirect(body.url);
      }
    }
  };
  return (
    <>
      <div className="container mx-auto">
        HELLO FROM ORG {params.id}
        <div className="grid lg:grid-cols-3 gap-4">
          <CreateCard createcardaction={createcardaction} />
          <div className="relative  bg-slate-700">
            <div className="bg-yellow-700	absolute left-0 top-0 h-16 w-16 ...">
              01
            </div>
          </div>
          <div className="relative  bg-slate-700">
            <div className="bg-yellow-700	absolute left-0 top-0 h-16 w-16 ...">
              02
            </div>
          </div>
        </div>
      </div>
    </>
  );
  //TODO: BIND CARD PAGE
}
