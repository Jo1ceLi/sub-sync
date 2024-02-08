export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const response = await fetch(
    `${process.env.BACKEND_HOST}/api/org/${params.id}`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: request.headers,
    }
  );
  const json = await response.json();
  console.log("json", json);
  return new Response();
}
