import { logger } from "@config/logger";
import { QueryFilter } from "@model/pagination";
import { RequestFilter } from "@model/request";

const example: RequestFilter = {
  q: "",
  method: "GET",
  ts_gte: "",
  ts_lte: "",
};

const convertType = (key: keyof RequestFilter, value: string) => {
  switch (key) {
    case "ts_gte":
    case "ts_lte":
      return parseInt(value, 10);
    default:
      return value;
  }
};

export const parseFilters = (queries: URLSearchParams): QueryFilter => {
  const filters: QueryFilter = {};

  for (const key of Object.keys(example) as (keyof RequestFilter)[]) {
    if (queries.has(key)) {
      const value = queries.get(key);
      if (value) {
        filters[key] = value; //convertType(key, value);
      }
    }
  }

  logger.debug("Requested filters: ", filters);
  return filters;
};
