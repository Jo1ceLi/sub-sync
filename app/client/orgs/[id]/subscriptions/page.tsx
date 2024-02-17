import PlanCard from "@/app/components/plan-card";
import RecentSubscriptions from "@/app/merchant/components/recent-subscriptions";
import SubBtn from "../plans/sub-btn";
import { Card } from "@/components/ui/card";

export default async function OrgID({ params }: { params: any }) {
  return (
    <>
      <Card className="flex flex-1 m-5 p-5 justify-evenly">
        <PlanCard>
          <SubBtn></SubBtn>
        </PlanCard>
      </Card>
      <Card className="flex flex-col flex-1 m-5">
        <RecentSubscriptions />
      </Card>
    </>
  );
}
