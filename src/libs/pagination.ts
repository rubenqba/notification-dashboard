import { logger } from "@config/logger";
import { Pageable } from "@model/pagination";

export const parsePaginationQueries = (queries: URLSearchParams) => {
  const start = queries.has("_start")
    ? parseInt(queries.get("_start") as string, 10)
    : 0;
  const limit = queries.has("_end")
    ? Math.abs(parseInt(queries.get("_end") as string, 10) - start)
    : 10;

  const pageable: Pageable = {
    offset: start,
    limit,
    sort: queries.has("_sort")
      ? [
          {
            property: queries.get("_sort") as string,
            direction:
              queries.get("_order")?.toLocaleLowerCase() === "desc"
                ? "desc"
                : "asc",
          },
        ]
      : [],
  };
  logger.debug("Page request: ", pageable);
  return pageable;
};
