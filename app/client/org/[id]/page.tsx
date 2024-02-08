export default function OrgID({
  params,
  searchParams,
}: {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <>HELLO FROM ORG {params.id}</>;
  //TODO: BIND CARD PAGE
}
