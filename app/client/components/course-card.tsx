import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import { cookies, headers } from "next/headers";
import { Course } from "@/types/index";
import { H2, H3, H4, TP } from "@/components/typography";

export default async function ClientCourseCard() {
  const getCourses = async () => {
    const token = cookies().get("ctoken");
    const url = headers().get("x-url");
    if (url && token) {
      const splits = url.split("/orgs/");
      const orgId = splits[1].substring(0, 36);
      const res = await fetch(
        `${process.env.BACKEND_HOST}/api/client/orgs/${orgId}/courses`,
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

  const courses = (await getCourses()) as Course[];
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between text-2xl">
          課程
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses &&
            courses.length > 0 &&
            courses.map((p) => (
              <Card key={p.id}>
                <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                  <H2>{p.title}</H2>
                </CardHeader>
                <CardContent className="px-4 grid gap-2">
                  <div className="gap-4">
                    <H4 className="pl-3 mb-2">課程售價</H4>
                    <div className="flex flex-col items-center">
                      {p.pricing.map((pp, idx) => (
                        <div className="px-3 m-1" key={idx}>
                          ${pp.price} / {pp.session_count}堂
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <H4 className="pl-3">課程內容</H4>
                    <div className="flex flex-col items-center">
                      <TP>{p.description}</TP>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
