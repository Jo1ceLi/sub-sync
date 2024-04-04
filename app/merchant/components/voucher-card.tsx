import {
  CardTitle,
  CardContent,
  CardHeader,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { cookies, headers } from "next/headers";
import { Voucher } from "@/types/index";
import { CreatePlanDialog } from "@/app/merchant/orgs/components/create-plan-dialog";
import { postVoucherAction } from "@/app/merchant/orgs/plan-server-action";
import { H2, H3, H4, TP } from "@/components/typography";
import { CreateVoucherForm } from "@/app/merchant/components/create-voucher-form";

export default async function VoucherCard() {
  const getVouchers = async () => {
    const token = cookies().get("utoken") ?? cookies().get("ctoken");
    const url = headers().get("x-url");
    if (url && token) {
      const splits = url.split("/orgs/");
      const orgId = splits[1].substring(0, 36);
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/orgs/${orgId}/vouchers`,
        {
          headers: {
            Authorization: "Bearer " + token!.value,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    }
  };

  const vouchers = (await getVouchers()) as Voucher[];
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <H3>課程</H3>
          <div>
            <CreatePlanDialog text={"新增課程"}>
              <CreateVoucherForm action={postVoucherAction} />
            </CreatePlanDialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vouchers &&
            vouchers.length > 0 &&
            vouchers.map((v) => (
              <>
                <Card key={v.id}>
                  <CardHeader className="flex items-center gap-4 p-4 rounded-t-lg">
                    <H2>{v.title}</H2>
                  </CardHeader>
                  <CardContent className="px-4 grid gap-2">
                    <div className="gap-4">
                      <TP className="mb-2">課程售價</TP>
                      <div className="flex flex-wrap justify-evenly  md:justify-between  bg-slate-50">
                        {v.pricing.map((pp, idx) => (
                          <div className="px-2 m-2" key={idx}>
                            <H4>
                              ${pp.price} /{pp.session_count}堂
                            </H4>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-1.5">
                      <TP>課程內容</TP>
                      <ul className="pl-4 list-disc list-outside">
                        {v.description}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* <EditPlanDialog action={updatePlanAction} plan={p} /> */}
                  </CardFooter>
                </Card>
              </>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
