import env from "@config/env";
import { logger } from "@config/logger";
import { parsePaginationQueries } from "@lib/pagination";
import { DEFAULT_PAGEABLE, Pageable } from "@model/pagination";
import { createService } from "@service/requests-service";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
  slug: string[];
};

const service = createService(env.DB_URL, env.DB_NAME);
export async function GET(request: NextRequest, context: { params: Params }) {
  logger.info("Request params", context.params);
  const [resource, id] = context.params.slug;
  if (id) {
    return Response.json(await service.findOne(id));
  }

  const pageable: Pageable = parsePaginationQueries(
    request.nextUrl.searchParams
  );

  const [total, results] = await Promise.all([
    service.countByPartition(resource, {}),
    service.getPage(resource, {}, pageable),
  ]);

  logger.debug(`Recovered ${results.length} elements of ${total}`);
  return Response.json(results, {
    headers: { "x-total-count": "" + total },
  });
}
