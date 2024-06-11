import "server-only";
import { ResourceService } from "@model/info";
import { createConfiguration } from "@service/configuration-service";
import { logger } from "@config/logger";
import { createService } from "@service/requests-service";

export async function getResourceServices(): Promise<ResourceService[]> {
  const configuration = createConfiguration();
  return await configuration
    .getServices()
    .then((services) => services.map((svc) => ({ id: svc.service, description: svc.description, endpoints: Object.keys(svc.endpoints).length })))
    .catch((err) => {
      logger.error("Error collecting services: ", err.message);
      return [];
    });
}

export async function getDBInfo() {
  return await createService().then((service) => service.info());
}
