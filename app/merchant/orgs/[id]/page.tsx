import { MerchantSubPage } from "@/components/merchant-sub-page";

export default async function OrgPlanPage() {
  return (
    <>
      {/* <div className="">
        <div className="grid grid-rows-5 h-dvh">
          <div id="top" className="container p-2 flex justify-between">
            <p>1</p>
            <CreatePlanDialog action={postPlanAction} />
          </div>
          <div
            id="middle"
            className="container items-center grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-1 gap-4 row-span-3 bg-slate-100"
          >
            <PlanCard>
              <EditDeleteBtn />
            </PlanCard>
          </div>
          <div id="bottom" className="">
            03
          </div>
        </div>
      </div> */}
      <MerchantSubPage />
    </>
  );
}
