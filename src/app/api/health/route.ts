import { getDBInfo, getResourceServices } from "@lib/resources";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  return Response.json({
    info: await getDBInfo(),
    services: await getResourceServices(),
  });
}
