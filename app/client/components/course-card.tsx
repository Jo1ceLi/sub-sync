import {
  CardTitle,
  CardContent,
  CardHeader,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { cookies, headers } from "next/headers";
import { Course } from "@/types/index";
import { H2, H3, H4, TP } from "@/components/typography";
import { Button } from "@/registry/new-york/ui/button";
import Link from "next/link";

export default async function ClientCourseCard() {
  const url = headers().get("x-url");
  let orgId: string;
  if (url) {
    const splits = url.split("/orgs/");
    orgId = splits[1].substring(0, 36);
  }
  const getCourses = async () => {
    const token = cookies().get("ctoken");
    if (orgId && token) {
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
            courses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="flex items-center gap-4 p-2 rounded-t-lg">
                  <H2>{course.title}</H2>
                </CardHeader>
                <CardContent className="px-4 grid gap-2">
                  <div className="gap-4">
                    <H4 className="pl-3 mb-2">課程售價</H4>
                    <div className="flex flex-col items-center">
                      {course.pricing.map((pp, idx) => (
                        <div className="px-3 m-1" key={idx}>
                          ${pp.price} / {pp.session_count}堂
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <H4 className="pl-3">課程內容</H4>
                    <div className="flex flex-col items-center">
                      <TP>{course.description}</TP>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-1 justify-center">
                  <Button asChild className="w-full">
                    <Link
                      href={`/client/orgs/${orgId}/checkout/course/${course.id}`}
                    >
                      購買
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
