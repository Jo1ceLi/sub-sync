import CourseCard from "@/app/merchant/components/course-card";
import PlansCard from "@/app/merchant/components/plans-card";
import { MerchantSubPage } from "@/components/merchant-sub-page";

export default async function PlanPage() {
  return (
    <>
      <PlansCard />
      <CourseCard />
      {/* <MerchantSubPage /> */}
    </>
  );
}
