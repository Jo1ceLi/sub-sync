import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "./icons";

export function Landingpage() {
  return (
    <>
      <div className=" py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 xl:gap-20">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
              有一個事業是一件很*的事情
              <p>但總覺得管理花費了您一堆時間嗎？</p>
            </h1>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              {"SubSync將讓您在管理訂閱從現在開始變得無比簡單"}
              <p>{"您的客戶將會體驗到史上最順暢的訂閱支付流程"}</p>
              {/* Manage all your subscriptions in one place. Get reminders before
                payments. Stay on top of your budget. */}
            </p>
            <div className="flex">
              <Link href="/merchant/login">
                <Button className="mr-10" variant={"destructive"}>
                  立即免費註冊
                </Button>
              </Link>
              <Button className="border-white" variant={"outline"}>
                {"瞭解更多 ->"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                {"解放您的時間！"}
                <p>{"我們來處理您的會員續約"}</p>
              </h2>
              <p className="text-gray-500 md:text-xl dark:text-gray-400">
                {"管理所有會籍，在... 「一個頁面」！"}
                <p>{"在會員即將到期前提醒您，留住每一個客戶！"}</p>
                {/* Manage all your subscriptions in one place. Get reminders before
                payments. Stay on top of your budget. */}
              </p>

              <ul className="grid gap-4 sm:grid-cols-2 md:gap-6 md:grid-cols-2">
                <li className="flex space-x-4">
                  <Icons.calendar className="w-5 h-5 flex-shrink-0 text-cool-gray-500 group-hover:text-cool-gray-900 dark:text-cool-gray-400 dark:group-hover:text-cool-gray-300" />
                  <div className="space-y-1.5">
                    <h3 className="text-base font-medium tracking-tighter group">
                      {"自動化續約"}
                      {/* Automatic payment reminders */}
                    </h3>
                    <p className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      {"把時間留給您的專業"}
                      <p>{"管理瑣碎的續約就交給我們！"}</p>
                      {/* Get notified before payments are due */}
                    </p>
                  </div>
                </li>
                <li className="flex space-x-4">
                  <Icons.listChecks className="w-5 h-5 flex-shrink-0 text-cool-gray-500 group-hover:text-cool-gray-900 dark:text-cool-gray-400 dark:group-hover:text-cool-gray-300" />
                  <div className="space-y-1.5">
                    <h3 className="text-base font-medium tracking-tighter group">
                      {"追蹤訂閱狀態"}
                      {/* Subscription tracking */}
                    </h3>
                    <p className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      {"輕鬆的查看所有會員訂閱"}
                      {/* Easily see all your active subscriptions */}
                    </p>
                  </div>
                </li>
                {/* <li className="flex space-x-4">
                  <CurrencyIcon className="w-5 h-5 flex-shrink-0 text-cool-gray-500 group-hover:text-cool-gray-900 dark:text-cool-gray-400 dark:group-hover:text-cool-gray-300" />
                  <div className="space-y-1.5">
                    <h3 className="text-base font-medium tracking-tighter group">
                      Budgeting tools
                    </h3>
                    <p className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      Manage your spending
                    </p>
                  </div>
                </li> */}
              </ul>
            </div>
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              height="338"
              src="/placeholder.svg"
              width="600"
            />
          </div>
        </div>
      </div>
      <section className="py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 xl:gap-20">
            <Image
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                {"讓您愛不釋手的功能"}
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {`從註冊的那一刻起，您會懷疑人生`}
                <p>{`同時也是您：「為什麼不早點告訴我這個酷東西！」`}</p>
                {/* {`From the moment you sign up, you'll wonder how you ever managed
                your subscriptions without us.`} */}
              </p>
              <dl className="grid gap-8 md:grid-cols-2 xl:gap-12">
                <div className="flex space-x-4">
                  <Icons.clock className="w-8 h-8 flex-shrink-0 text-cool-gray-500 dark:text-cool-gray-400" />
                  <div className="space-y-1.5">
                    <dt className="text-lg font-medium tracking-tighter">
                      Automatic payment reminders
                    </dt>
                    <dd className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      Get notified before payments are due
                    </dd>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Icons.listChecks className="w-8 h-8 flex-shrink-0 text-cool-gray-500 dark:text-cool-gray-400" />
                  <div className="space-y-1.5">
                    <dt className="text-lg font-medium tracking-tighter">
                      Subscription tracking
                    </dt>
                    <dd className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      Easily see all your active subscriptions
                    </dd>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Icons.creditCard className="w-8 h-8 flex-shrink-0 text-cool-gray-500 dark:text-cool-gray-400" />
                  <div className="space-y-1.5">
                    <dt className="text-lg font-medium tracking-tighter">
                      {"流暢的付款步驟"}
                      {/* Budgeting tools */}
                    </dt>
                    <dd className="text-sm text-cool-gray-500 dark:text-cool-gray-400">
                      {"連我阿嬤都能簡單上手的步驟"}
                      <p>{"讓客戶1分鐘內成為您的付費會員!"}</p>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-b py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/none">
                Trusted by thousands
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Our users love how we make managing subscriptions a breeze. Here
                are some of their stories.
              </p>
            </div>
            <div className="space-y-8 lg:space-y-0">
              <div className="grid items-start gap-4 md:grid-cols-2 md:items-center md:gap-8">
                <Image
                  alt="User"
                  className="mx-auto rounded-full overflow-hidden md:order-last md:ml-auto"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Alice Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {`"I've been using SubSync for a few months now and it's been a game-changer. I'm never late on a"`}
                  </p>
                </div>
              </div>
              <div className="grid items-start gap-4 md:grid-cols-2 md:items-center md:gap-8">
                <Image
                  alt="User"
                  className="mx-auto rounded-full overflow-hidden md:order-last md:ml-auto"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Bob Smith</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {`"This app is so easy to use. I love being able to see all my
                    subscriptions in one place. It's a game-changer!"`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container px-4 md:px-6">
        <div className="flex justify-center py-6 lg:py-12">
          <div className="w-full max-w-3xl">
            {/* <form className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Enter your email" required type="email" />
              <Button className="w-full" size="lg" type="submit">
                Sign Up
              </Button>
            </form> */}
            <p></p>
            <Link
              className="underline underline-offset-2"
              href="https://www.privacypolicies.com/live/0493ba7d-5827-4602-a2f9-ac77f81df26e"
            >
              Terms & Conditions
            </Link>
            {/* <p className="mt-2 text-xs text-center text-gray-500 md:text-sm dark:text-gray-400">
              Sign up to get notified when we launch.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
