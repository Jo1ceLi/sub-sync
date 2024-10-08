import { H2 } from "@/components/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/registry/new-york/ui/button";
import { VoucherCardInfo } from "@/types";
import { CheckIcon, PauseIcon, Cross2Icon } from "@radix-ui/react-icons";
import { RedeemVoucherAlertDialog } from "./redeem-voucher-alert-dialog";

export default function CustomerVouchers({
  vouchers,
  params,
}: {
  vouchers: VoucherCardInfo[];
  params: any;
}) {
  // console.log("p=", params);
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          票券
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vouchers && vouchers.length > 0 ? (
            vouchers.map((v) => {
              return (
                <Card key={v.id}>
                  <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                    <H2 className="font-semibold">{v.title}</H2>
                  </CardHeader>
                  <CardContent className="p-4 grid gap-2">
                    {/* <div className="flex gap-4 align-middle"> */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          剩餘數量: <span className="">{v.session_sum}</span>
                        </h3>
                      </div>
                      <RedeemVoucherAlertDialog
                        voucherId={v.id}
                        clientId={params.cid}
                        orgId={params.id}
                      />
                    </div>
                    {/* </div> */}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="p-4">
              <div className="text-center">
                <h2 className="text-2xl font-semibold">尚無任何票券</h2>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
