import env from "@config/env";
import { logger } from "@config/logger";
import { Pageable, QueryFilter } from "@model/pagination";
import { Request, RequestsPage } from "@model/request";
import PouchDB from "pouchdb-browser";
import PouchDBFind from "pouchdb-find";

PouchDB.plugin(PouchDBFind);
console.log(`DB_URL: ${env.DB_URL}`);

export class RequestService {
  constructor(private readonly db = new PouchDB<Request>(`${env.DB_URL}`)) {}

  public info = async () => {
    const info = await this.db.info();
    if (info) {
      return info;
    }
    throw Error('No hay info')
  };

  public getPage = (
    filter: QueryFilter,
    page: Pageable
  ): Promise<RequestsPage> => {
    return this.db
      .find({
        selector: filter,
        // sort: [{ timestamp: "desc" }],
        skip: (page.page - 1) * page.size,
        limit: page.size,
      })
      .then((response) => {
        logger.info("getting response...");
        logger.info(`count: ${response.docs.length}`);

        const list: Request[] = response.docs.map((doc) => ({
          ...doc,
        }));
        return {
          content: list,
          pageable: page,
          totalElements: list.length,
          totalPages: 1,
        };
      });
  };

  public findOne = (id: string): Promise<Request> => {
    return this.db.get(id)
  }
}

export const requestService = new RequestService();
export const createService = (dbUrl: string) =>
  new RequestService(new PouchDB(dbUrl));
