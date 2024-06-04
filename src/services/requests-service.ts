import env from "@config/env";
import { logger } from "@config/logger";
import { Pageable, QueryFilter } from "@model/pagination";
import { Request, RequestsPage } from "@model/request";
import nano, { MangoSelector } from "nano";

export class RequestService {
  constructor(private readonly db: nano.DocumentScope<Request>) {}

  private modelMapper = (
    dbo: Request & { _id: string; _rev: string }
  ): Request => {
    const { _id, _rev, ...rest } = dbo;
    return { id: _id, ...rest };
  };

  public info = async () => {
    const info = await this.db.info();
    if (info) {
      return info;
    }
    throw Error("No hay info");
  };

  public getPage = (
    filter: QueryFilter,
    page: Pageable
  ): Promise<RequestsPage> => {
    logger.info("Filter query", filter);
    const q: MangoSelector = {};

    Object.keys(filter).forEach((key) => {
      q[key] = { $eq: filter[key] };
    });

    return this.db
      .find({
        selector: q,
        // sort: [{ timestamp: "desc" }],
        skip: (page.page - 1) * page.size,
        limit: page.size,
      })
      .then((response) => {
        logger.info("getting response...");
        logger.info(`count: ${response.docs.length}`);

        return {
          content: response.docs.map(this.modelMapper),
          pageable: page,
          totalElements: response.docs.length,
          totalPages: 1,
        };
      });
  };

  public findOne = (id: string): Promise<Request> => {
    return this.db
      .get(id)
      .then(this.modelMapper)
      .catch((reason) => {
        logger.error(`Object ${id} was not found`);
        throw new Error("NotFound");
      });
  };
}

export const createService = (dbUrl: string, dbName: string) =>
  new RequestService(nano(dbUrl).use(dbName));
