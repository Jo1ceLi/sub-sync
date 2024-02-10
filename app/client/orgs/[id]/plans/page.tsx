import PlanCard from "@/app/components/plan-card";
import { Button } from "@/registry/new-york/ui/button";
import SubBtn from "./sub-btn";

export default function OrgPlans() {
  return (
    <div className="container flex justify-evenly">
      <PlanCard>
        <SubBtn></SubBtn>
      </PlanCard>
    </div>
  );
}
