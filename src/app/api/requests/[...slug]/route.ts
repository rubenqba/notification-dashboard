import { logger } from "@config/logger";
import { parseFilters } from "@lib/filters";
import { parsePaginationQueries } from "@lib/pagination";
import { Pageable } from "@model/pagination";
import { createService } from "@service/requests-service";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
  slug: string[];
};

export async function GET(request: NextRequest, context: { params: Params }) {
  logger.debug("Request params", context.params);
  const [resource, id] = context.params.slug;

  const service = await createService();
  if (id) {
    return Response.json(await service.findOne(id));
  }

  const params = request.nextUrl.searchParams;
  const pagination: Pageable = parsePaginationQueries(params);
  const filter = parseFilters(params);

  const [total, results] = await Promise.all([service.countByPartition(resource, filter), service.getPage(resource, filter, pagination)]);

  logger.debug(`Recovered ${results.length} elements of ${total}`);
  return Response.json(results, {
    headers: { "x-total-count": "" + total },
  });
}
