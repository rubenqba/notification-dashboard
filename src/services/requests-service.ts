import { logger } from "@config/logger";
import { Partition } from "@model/info";
import { DEFAULT_PAGEABLE, Pageable, QueryFilter } from "@model/pagination";
import { Request } from "@model/request";
import nano, { MangoSelector, RequestError, Document } from "nano";

export class RequestService {
  private readonly VIEW_NAME = "dashboard_design";
  constructor(private readonly db: nano.DocumentScope<Request>) {
    this.createIndexAndViews();
  }

  private modelMapper = (dbo: Request & Document): Request => {
    const { _id, _rev, ...rest } = dbo;
    return { ...rest, id: _id };
  };

  private createIndexAndViews = async () => {
    // Documento de Diseño
    const globalDesign = {
      _id: `_design/${this.VIEW_NAME}`,
      options: {
        partitioned: false,
      },
      views: {
        partition_counts: {
          map: "function (doc) { emit(doc.service, 1); }",
          reduce: "_count",
        },
      },
    };

    await this.db
      .get(globalDesign._id)
      .then((view) => logger.warn("Design view was already created"))
      .catch((error: RequestError) => {
        if (error.statusCode !== 404) {
          throw error;
        } else {
          return this.db
            .insert(globalDesign)
            .then((view) =>
              logger.debug("Design document created/updated successfully.")
            );
        }
      });
  };

  public info = async () => {
    const info = await this.db.info();
    if (info) {
      return info;
    }
    throw Error("No hay info");
  };

  public partitions = (): Promise<Partition[]> => {
    return this.db
      .view<number>(this.VIEW_NAME, "partition_counts", { group: true })
      .then((result) =>
        result.rows.map((r) => ({ name: r.key, count: r.value }))
      );
  };

  public countByPartition = (
    partition: string,
    selector: MangoSelector = {}
  ) => {
    return this.db
      .partitionedFind(partition, {
        selector,
        fields: ["_id"],
      })
      .then((response) => response.docs.length)
      .catch((_) => 0);
  };

  public getPage = async (
    partition: string,
    filter: QueryFilter = {},
    page: Pageable = DEFAULT_PAGEABLE
  ): Promise<Request[]> => {
    logger.debug("Filter query", filter);
    const q: MangoSelector = {};

    Object.keys(filter).forEach((key) => {
      q[key] = { $eq: filter[key] };
    });

    return this.db
      .partitionedFind(partition, {
        selector: q,
        sort: page.sort.map((order) => ({
          [order.property]: order.direction,
        })),
        skip: page.offset,
        limit: page.limit,
        execution_stats: true,
      })
      .then((result) => result.docs.map(this.modelMapper));
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