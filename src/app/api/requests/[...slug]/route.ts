import env from "@config/env";
import { logger } from "@config/logger";
import { DEFAULT_PAGEABLE } from "@model/pagination";
import { createService } from "@service/requests-service";

export const dynamic = "force-dynamic"; // defaults to auto

type Params = {
  slug: string[];
};

const service = createService(env.DB_URL, env.DB_NAME);
export async function GET(request: Request, context: { params: Params }) {
  logger.info("Request params", context.params);
  const [resource, id] = context.params.slug;
  if (id) {
    return Response.json(await service.findOne(id));
  }

  return await service
    .getPage({ service: resource }, DEFAULT_PAGEABLE)
    .then((page) =>
      Response.json(page.content, {
        headers: { "x-total-count": "" + page.totalElements },
      })
    );
}
