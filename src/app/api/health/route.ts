import env from "@config/env";
import { createService } from "@service/requests-service";

export const dynamic = "force-dynamic"; // defaults to auto

const service = createService(env.DB_URL, env.DB_NAME);
export async function GET(request: Request) {
  return Response.json(await service.info());
}
