import { cookies } from "next/headers";
import { OrgDialog } from "./org-dialog";
import { patchOrgAction, postOrgAction } from "./org-server-action";
import { DeleteOrgBtn } from "./delete-org-btn";
import Link from "next/link";

async function getOrgsData() {
  const token = cookies().get("token");
  const res = await fetch(`${process.env.BACKEND_HOST}/api/orgs`, {
    headers: { Authorization: "Bearer " + token!.value },
  });
  const data = await res.json();
  return data;
}

export default async function Org() {
  const orgs: any[] = await getOrgsData();
  console.log("orgs=", orgs);
  return (
    <>
      <body className="bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-semibold">Welcome back!</h1>

            <OrgDialog org={null} action={postOrgAction} />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Filter Orgs..."
              className="border-2 border-gray-200 rounded py-2 px-4 w-full"
            />
          </div>
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              {orgs ? (
                orgs.map((org) => (
                  <tbody
                    key={org.id}
                    className="bg-white divide-y divide-gray-200"
                  >
                    <td key={org.id} className="px-6 py-4 whitespace-nowrap">
                      <Link
                        className="bg-slate-800 text-white border-2 border-slate-800 rounded-lg	p-2"
                        href={`/merchant/orgs/${org.id}`}
                      >
                        {org.name}
                      </Link>
                    </td>
                    <td
                      key={org.id}
                      className="px-6 py-4 text-right whitespace-nowrap"
                    >
                      {org.description}
                    </td>
                    <td
                      key={org.id}
                      className="px-6 py-4 text-right whitespace-nowrap"
                    >
                      <OrgDialog org={org} action={patchOrgAction} />
                      {orgs.length <= 1 ? <></> : <DeleteOrgBtn id={org.id} />}
                      {/* <OrgDialog org={org} action={patchOrgAction} /> */}
                    </td>
                  </tbody>
                ))
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {" "}
                Previous{" "}
              </a>
              <a
                href="#"
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                {" "}
                Next{" "}
              </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing
                  <span className="font-medium">1</span>
                  to
                  <span className="font-medium">10</span>
                  of
                  <span className="font-medium">100</span>
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span>Previous</span>
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {" "}
                    1{" "}
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {" "}
                    2{" "}
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span>Next</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
