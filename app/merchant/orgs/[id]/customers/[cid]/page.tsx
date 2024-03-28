import CustomerCourses from "@/app/merchant/components/customer-courses";
import CustomerSubscriptions from "@/app/merchant/components/customer-subscriptions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerDetail } from "@/types";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function CustomerByID({
  params,
  searchParams,
}: {
  params: { id: string; cid: string };
  searchParams: any;
}) {
  const getCustomer = async () => {
    const token = cookies().get("utoken");
    if (token) {
      const resp = await fetch(
        `${process.env.BACKEND_HOST}/api/orgs/${params.id}/customers/${params.cid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token.value,
          },
        }
      );
      if (resp.ok) {
        return await resp.json();
      }
    }
  };

  const customerDetail = (await getCustomer()) as CustomerDetail;
  const type = searchParams["type"] || "course";

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">客戶資訊</CardTitle>
          <CardDescription className="flex items-center ">
            <div className="text-lg text-black">
              <p>姓名: {customerDetail.info.name}</p>
            </div>
            <div className="rounded-full">
              <Image
                width={36}
                height={36}
                src={customerDetail.info.picture}
                alt="Client-Pic"
              />
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="">
            <div className="grid gap-1">
              <p>
                Email: <span>{customerDetail.info.email}</span>
              </p>
              <p>
                電話:{" "}
                <a
                  className="text-blue-500 hover:underline"
                  href={`tel:${customerDetail.info.phone}`}
                >
                  {customerDetail.info.phone}
                </a>
              </p>
              <p>
                加入日期:{" "}
                <span>
                  {new Date(customerDetail.info.joined_at).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue={type}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="course">課程</TabsTrigger>
          <TabsTrigger value="subscription">訂閱方案</TabsTrigger>
        </TabsList>
        <TabsContent value="subscription">
          <CustomerSubscriptions plans={customerDetail.subscriptions} />
        </TabsContent>
        <TabsContent value="course">
          <CustomerCourses courses={customerDetail.courses} params={params} />
        </TabsContent>
      </Tabs>
    </>
  );
}
