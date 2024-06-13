import "server-only";
import {env} from "@config/env";
import { logger } from "@config/logger";
import { Configuration, Service } from "@model/service";
import nano from "nano";

export class ConfigurationService {
  constructor(private readonly db: nano.DocumentScope<Configuration>) {
    logger.debug("Configuration service is ready...")
  }

  public getServices = (): Promise<Service[]> => {
    return this.db
      .get("svc:list")
      .then((config) => {
        logger.debug("Configuration: ", config)
        return config.services
      })
      .catch((reason) => {
        logger.error(`Service list was not found`);
        throw new Error("NotFound");
      });
  };
}

export const createConfiguration = async () => new ConfigurationService(nano(env.DB_URL).use(env.DB_NAME));
