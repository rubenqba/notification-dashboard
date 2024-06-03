import { DEFAULT_PAGEABLE } from "@model/pagination";
import { createService } from "@service/requests-service";

export const dynamic = "force-dynamic"; // defaults to auto

const service = createService("http://admin:password123@host.docker.internal:5984/requests");
export async function GET(request: Request) {
  // const response = await service.getPage({ service: "base" }, DEFAULT_PAGEABLE);
  return Response.json({version: "latest"});
}
