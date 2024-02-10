import { Button } from "@/registry/new-york/ui/button";
import { CreatePlanDialog } from "../components/create-plan-dialog";
import { postPlanAction } from "../plan-server-action";

export default async function OrgPage() {
  return (
    <>
      <div className="">
        <div className="grid grid-rows-5 h-dvh">
          <div id="top" className="container p-2 flex justify-between">
            <p>1</p>
            <CreatePlanDialog action={postPlanAction} />
          </div>
          <div id="middle" className="container row-span-3 bg-slate-100">
            <p>02</p>
          </div>
          <div id="bottom" className="">
            03
          </div>
        </div>
      </div>
    </>
  );
}
