import PlanCard from "@/app/components/plan-card";
import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import SubBtn from "../plans/sub-btn";

export default async function OrgID({ params }: { params: any }) {
  return (
    <>
      <div className="flex gap-5 p-5 justify-between">
        <PlanCard>
          <SubBtn></SubBtn>
        </PlanCard>
      </div>
      <RecentSubscriptions />
    </>
  );
}
