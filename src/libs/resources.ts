import "server-only";
import { ResourceService } from "@model/info";
import { configuration } from "@service/configuration-service";
import { logger } from "@config/logger";

export async function getResourceServices(): Promise<ResourceService[]> {
  return await configuration
    .getServices()
    .then((services) => services.map((svc) => ({ id: svc.service, description: svc.description, endpoints: Object.keys(svc.endpoints).length })))
    .catch((err) => {
      logger.error("Error collecting services: ", err.message);
      return [];
    });
}
